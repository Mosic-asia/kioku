from flask import Blueprint, jsonify
from llm import call_llm

test_llm_bp = Blueprint('test_llm', __name__)

@test_llm_bp.route('/test-llm', methods=['GET'])
def test_llm():
    prompt = "Hello! How are you today?"
    result = call_llm(prompt)

    if "error" in result:
        return jsonify({"error": result["error"]}), 500
    else:
        return jsonify({
            "prompt": prompt,
            "response": result["response"]
        })
