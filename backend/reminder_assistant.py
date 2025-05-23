# reminder_store.py

import uuid
from datetime import datetime

# In-memory store: user_id -> list of reminders
user_reminders = {}


def add_reminder(user_id, text):
    reminder = {
        "id": str(uuid.uuid4()),
        "text": text,
        "timestamp": datetime.now().isoformat()
    }
    if user_id not in user_reminders:
        user_reminders[user_id] = []
    user_reminders[user_id].append(reminder)
    return reminder


def get_reminders(user_id):
    return user_reminders.get(user_id, [])


def find_reminder_by_id(user_id, reminder_id):
    for reminder in user_reminders.get(user_id, []):
        if reminder["id"] == reminder_id:
            return reminder
    return None


def delete_reminder_by_id(user_id, reminder_id):
    if user_id not in user_reminders:
        return False
    original = len(user_reminders[user_id])
    user_reminders[user_id] = [
        r for r in user_reminders[user_id] if r["id"] != reminder_id
    ]
    return len(user_reminders[user_id]) < original


def clear_reminders(user_id):
    user_reminders[user_id] = []
    return True
