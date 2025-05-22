from flask import Blueprint, jsonify
from dementia_assistant import start_chat

chat_start_bp = Blueprint('chat_start', __name__)

@chat_start_bp.route('/api/users/<int:user_id>/chat/start', methods=['GET'])
def start_chat_route(user_id):
    return jsonify(start_chat(user_id))
