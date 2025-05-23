from flask import Blueprint, request, jsonify
from quiz_assistant import check_response_similarity

quiz_answer_bp = Blueprint('quiz_answer', __name__)

@quiz_answer_bp.route('/api/memory-quiz/answer-validate', methods=['POST'])
def check_user_response():
    data = request.get_json() or {}
    user_id = data.get("user_id")
    user_response = data.get("user_response", "").strip()
    reminder_msg = data.get("reminder_msg", "").strip()

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    if not user_response:
        return jsonify({"error": "user_response is required"}), 400
    if not reminder_msg:
        return jsonify({"error": "reminder_msg is required"}), 400

    match_result = check_response_similarity(user_response, reminder_msg)
    return jsonify({
        "user_id": user_id,
        "match": match_result
    }), 200
