from datetime import datetime
from llm import call_llm
import json
import logging
from reminder_assistant import add_reminder

logging.basicConfig(level=logging.INFO)


user_sessions = {}

def start_chat(user_id):
    """Start a new chat session with a friendly LLM-generated greeting."""

    prompt = (
    "高齢の認知症の方に対して、やさしく丁寧に質問してください。\n"
    "たとえば「こんにちは。今日はどんな気分ですか？」のような、安心できる一文にしてください。\n"
    "日本語で、一文だけ返してください。"
    )


    logging.info(prompt)
    response = call_llm(prompt)
    ai_response = response.get("response", "こんにちは、お元気ですか？").strip().split("\n")[0]

    user_sessions[user_id] = {
        "chat_history": [{"role": "ai", "message": ai_response}]
    }

    return {
        "timestamp": datetime.now().isoformat(),
        "ai_response": ai_response
    }


def check_for_reminder_llm(text: str) -> str:
    """
    Calls LLM to check if the input contains a reminder.
    Returns "yes" or "no".
    """
    prompt = f"""
    あなたは、次の文に「リマインダーが必要な予定・習慣・依頼」が含まれているかを判定するAIです。
    返答は必ず "yes" または "no" のどちらかだけを出力してください。他の説明は不要です。

    文：
    {text}

    答え（"yes" または "no" のみ）：
    """.strip()

    logging.info(prompt)
    response = call_llm(prompt)
    answer = response.get("response", "").strip().split("\n")[0].lower()

    return "yes" if "yes" in answer else "no"


def recheck_response_with_llm(response_text):
    prompt = (
    "以下の文を確認して、日本語として不自然な表現や誤字があれば軽く修正してください。\n"
    "意味や雰囲気は変えず、日本語だけで丁寧な一文にしてください。\n"
    "英語やローマ字は使わないでください。\n"
    "修正した文だけを返してください。それ以外は何も返さないでください。\n\n"
    f"文：{response_text}\n\n"
    "修正後の文："
)

    logging.info(prompt)
    response = call_llm(prompt)
    logging.info(response)
    return response.get("response", "").strip().split("\n")[0]


def continue_chat(user_id, user_response):

    if user_id not in user_sessions:
        return {"error": "No active chat session. Please start the chat first."}, 400

    session = user_sessions[user_id]
    session["chat_history"].append({"role": "user", "message": user_response})
    prompt = (
        "あなたは高齢の利用者を支援する、やさしく親切な日本語のAIアシスタントです。\n"
        "以下の会話履歴と今回の発言を踏まえて、利用者が安心できるような丁寧で自然な一文で返答してください。\n"
        "返答は短く、わかりやすく、親しみやすい雰囲気を大切にしてください。\n"
        "共感や励ましを含めても構いませんが、AIであることを忘れず、自分自身を人間のように表現しないでください（例：「私が覚えておきます」「一緒に頑張りましょう」などは使わない）。\n"
        "質問が自然に出る場合のみ、やさしい質問を1つしても構いません。\n\n"
        "【会話履歴（最新6件）】\n"
    )

    for turn in session["chat_history"][-6:]:
        role_label = "利用者" if turn["role"] == "user" else "アシスタント"
        prompt += f"{role_label}：{turn['message']}\n"

    prompt += f"\n【今回の発言】\n利用者：「{user_response}」\n\n"


    response = call_llm(prompt)
    logging.info(response)
    ai_response = response.get("response", "").strip().split("\n")[0]
    for prefix in ("アシスタント：", "アシスタント:", "assistant:", "Assistant:"):
        if ai_response.startswith(prefix):
            ai_response = ai_response[len(prefix):].strip()
    
    # ai_response = recheck_response_with_llm(ai_response)

    session["chat_history"].append({"role": "ai", "message": ai_response})

    reminder = check_for_reminder_llm(user_response)

    if reminder == "yes":
        add_reminder(user_id, user_response)


    return {
        "timestamp": datetime.now().isoformat(),
        "user_response": user_response,
        "ai_response": ai_response,
        "reminder": reminder  
    }

def clean_summary_output(text: str):
    """Clean 'タイトル:' and '要約:' labels from model output."""
    lines = text.splitlines()
    lines = [line.strip() for line in lines if line.strip()]

    if lines:
        if lines[0].startswith("タイトル:"):
            lines[0] = lines[0].replace("タイトル:", "").strip()
        elif lines[0].startswith("タイトル："):
            lines[0] = lines[0].replace("タイトル：", "").strip()

    summary_lines = []
    for line in lines[1:]:
        if line.startswith("要約:"):
            line = line.replace("要約:", "", 1).strip()
        elif line.startswith("要約："):
            line = line.replace("要約：", "", 1).strip()
        summary_lines.append(line)

    title = lines[0] if lines else "今日の記録"
    summary = "\n".join(summary_lines).strip() if summary_lines else (
        "今日は十分にお話しする時間がありませんでした。明日はゆっくりお話ししましょうね。"
    )

    return title, summary


def summarize_chat(user_id):
    if user_id not in user_sessions:
        return {"error": "No active chat session."}, 400

    history = user_sessions[user_id]["chat_history"]

    prompt = (
    "以下は、高齢者とAIアシスタントの会話履歴です。\n"
    "この会話に基づいて、1行目に短い日本語のタイトルを、2行目以降に5〜6行の自然な日記形式の文章を書いてください。\n"
    "日記には、利用者が実際に発言した内容だけを使い、事実だけを記述してください。\n"
    "創作や推測は含めないでください。\n"
    "文章はやさしく丁寧に、過去形で書いてください。\n"
    "出力には「タイトル」や「要約」などのラベルや記号は付けず、文章のみを書いてください。\n\n"
    "会話履歴：\n"
    )


    for turn in history:
        role = "アシスタント" if turn["role"] == "ai" else "利用者"
        prompt += f"{role}: {turn['message']}\n"

    prompt += "\n出力（1行目がタイトル、それ以降が本文。ラベルは書かないでください）:"

    logging.info("\n\n--- PROMPT SENT TO LLM ---\n")
    logging.info(prompt)
    logging.info("\n--- END PROMPT ---\n\n")


    response = call_llm(prompt)
    logging.info(response)
    full_text = response.get("response", "").strip()
    title, summary = clean_summary_output(full_text)

    return {
        "title": title,
        "summary": summary
    }

def get_chat_history(user_id):
    """
    Returns the current chat session history for a user.
    """
    if user_id not in user_sessions:
        return {"error": "No active chat session."}, 400

    return {
        "user_id": user_id,
        "chat_history": user_sessions[user_id]["chat_history"]
    }


def end_chat(user_id):
    """
    Ends the chat session for the user by clearing chat history.
    """
    if user_id in user_sessions:
        del user_sessions[user_id]
    return {"message": "Chat session ended."}

