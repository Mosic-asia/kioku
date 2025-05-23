from flask import Blueprint, request, jsonify
from quiz_assistant import generate_quiz_question_from_reminder

quiz_question_bp = Blueprint('quiz_question', __name__)

@quiz_question_bp.route('/api/memory-quiz/generate-question', methods=['POST'])
def generate_quiz_question_route():
    data = request.get_json() or {}
    user_id = data.get("user_id")
    reminder_msg = data.get("reminder_msg", "").strip()

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    if not reminder_msg:
        return jsonify({"error": "reminder_msg is required"}), 400

    result = generate_quiz_question_from_reminder(reminder_msg)
    if not result:
        return jsonify({"error": "Failed to generate question"}), 500

    return jsonify({
        "user_id": user_id,
        **result
    }), 200
