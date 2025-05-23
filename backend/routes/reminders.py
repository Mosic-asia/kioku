# reminders.py

from flask import Blueprint, jsonify
from reminder_assistant import get_reminders,delete_reminder_by_id, clear_reminders

reminders_bp = Blueprint('reminders', __name__)

# Get reminders of a specific user
@reminders_bp.route('/api/users/<int:user_id>/reminders', methods=['GET'])
def get_reminders_route(user_id):
    reminders = get_reminders(user_id)
    return jsonify({"user_id": user_id, "reminders": reminders}), 200


# Delete a specific reminder
@reminders_bp.route('/api/users/<int:user_id>/reminders/<reminder_id>', methods=['DELETE'])
def delete_reminder_route(user_id, reminder_id):
    success = delete_reminder_by_id(user_id, reminder_id)
    if success:
        return jsonify({"message": "Reminder deleted.", "reminder_id": reminder_id}), 200
    else:
        return jsonify({"error": "Reminder not found."}), 404

# Clear all reminders
@reminders_bp.route('/api/users/<int:user_id>/reminders/clear', methods=['POST'])
def clear_reminders_route(user_id):
    clear_reminders(user_id)
    return jsonify({"message": "All reminders cleared.", "user_id": user_id}), 200