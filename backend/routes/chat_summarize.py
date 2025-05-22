from flask import Blueprint, jsonify
from dementia_assistant import summarize_chat

chat_summarize_bp = Blueprint('chat_summarize', __name__)

@chat_summarize_bp.route('/api/users/<int:user_id>/chat/summarize', methods=['GET'])
def summarize_chat_route(user_id):
    result = summarize_chat(user_id)

    if "error" in result:
        return jsonify(result), 400

    return jsonify({
        "title": result["title"],
        "summary": result["summary"]
    })