import requests, time, json, logging

OLLAMA_URL   = "http://host.docker.internal:11434/api/generate"
OLLAMA_MODEL = "qwen2.5:7b-instruct"

def call_llm(prompt, max_retries: int = 2, timeout: int = 60):
    """Call Ollama and return {'response': str} or {'error': str}."""
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False,
    }

    for attempt in range(max_retries + 1):
        try:
            r = requests.post(
                OLLAMA_URL, json=payload, timeout=timeout
            )
            r.raise_for_status()
            text = r.json().get("response", "").strip()

            if text:
                return {"response": text}  
            logging.warning("Empty LLM response, retrying …")

        except Exception as exc:
            logging.warning("LLM error on attempt %s: %s", attempt + 1, exc)

        time.sleep(0.5)

    return {"error": "LLM failed after retry"}
