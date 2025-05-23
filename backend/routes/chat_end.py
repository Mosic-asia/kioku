from flask import Blueprint, jsonify
from dementia_assistant import end_chat

chat_end_bp = Blueprint('chat_end', __name__)

@chat_end_bp.route('/api/users/<int:user_id>/chat/end', methods=['POST'])
def end_chat_route(user_id):
    return jsonify(end_chat(user_id)), 200
