from flask import Blueprint, jsonify
from dementia_assistant import get_chat_history

chat_history_bp = Blueprint('chat_history', __name__)

@chat_history_bp.route('/api/users/<int:user_id>/chat/history', methods=['GET'])
def chat_history_route(user_id):
    result = get_chat_history(user_id)
    if isinstance(result, tuple):  # error response
        return jsonify(result[0]), result[1]

    return jsonify(result), 200
