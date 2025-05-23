import uuid
from llm import call_llm
import logging


def generate_quiz_question_from_reminder(reminder_msg):
    """
    Uses the LLM to generate a quiz question from the given reminder message.
    Returns a dictionary with question_id and question text.
    """
    prompt = (
    "次のリマインダーの内容をもとに、本人の記憶をテストするような「質問」を一文で作成してください。\n"
    "質問には答えやヒントを含めないでください。純粋なクイズ形式の自然な問いかけにしてください。\n"
    "たとえば、「朝食後に薬を飲む」という内容であれば、「いつ薬を飲みますか？」のように聞いてください。\n"
    "出力形式：\n質問: xxx\n\n"
    f"リマインダー: {reminder_msg}"
    )


    response = call_llm(prompt)
    output = response.get("response", "").strip()

    question = ""
    for line in output.splitlines():
        if line.startswith("質問:"):
            question = line.replace("質問:", "").strip()
            break

    if not question:
        return None

    return {
        "question_id": str(uuid.uuid4()),
        "question": question
    }


def generate_hint_from_reminder(reminder_msg):
    """
    Generate a hint-guided version of the quiz question based on the reminder message.
    The output is a gentle rephrasing of the original question using the hint.
    """
    prompt = (
        "次のリマインダーの内容をもとに、記憶をやさしく促すような「ヒント付きの質問」を1文で作成してください。\n"
        "ヒントを文の前半に含めて、自然な形で質問に導いてください。\n"
        "例：『夕食の後に思い出してください。何時に電話をかけていますか？』のように。\n"
        "出力形式：\n質問: xxx\n\n"
        f"リマインダー: {reminder_msg}"
    )

    response = call_llm(prompt)
    output = response.get("response", "").strip()

    hinted_question = ""
    for line in output.splitlines():
        if line.startswith("質問:"):
            hinted_question = line.replace("質問:", "").strip()
            break

    return {"hinted_question": hinted_question} if hinted_question else None


def check_response_similarity(user_response, reminder_msg):
    """
    Uses LLM to determine if user_response closely matches reminder_msg.
    Returns 'yes' if similar in meaning, else 'no'.
    """
    prompt = (
        "次の2つの文が「同じ行動（何をするか）」と「同じタイミング（いつするか）」を表しているかを判断してください。\n"
        "命令文・習慣表現などの文体の違いは無視してください。\n"
        "同じ行動を同じ時間にしている内容なら yes、違う行動や時間なら no とだけ返してください。\n\n"
        f"文1: {reminder_msg}\n"
        f"文2: {user_response}\n\n"
        "答え（yes または no のみ）:"
    )
    response = call_llm(prompt)
    result = response.get("response", "").strip().lower()
    logging.info("Result :")
    logging.info(response)

    return "yes" if result.startswith("yes") else "no"
