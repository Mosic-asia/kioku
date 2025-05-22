from flask import Blueprint, request, jsonify
from dementia_assistant import continue_chat

chat_continue_bp = Blueprint('chat_continue', __name__)

@chat_continue_bp.route('/api/users/<int:user_id>/chat/continue', methods=['POST'])
def continue_chat_route(user_id):
    data = request.get_json()
    user_response = data.get("user_response", "").strip()

    if not user_response:
        return jsonify({"error": "user_response is required"}), 400

    return jsonify(continue_chat(user_id, user_response))
