from flask import Flask
from routes.test_llm import test_llm_bp
from routes.chat_start import chat_start_bp
from routes.chat_continue import chat_continue_bp
from routes.chat_summarize import chat_summarize_bp
from routes.chat_end import chat_end_bp
from routes.chat_history import chat_history_bp
from routes.reminders import reminders_bp
from routes.quiz_question import quiz_question_bp
from routes.quiz_hint import quiz_hint_bp
from routes.quiz_answer import quiz_answer_bp
from flask_cors import CORS

from routes.chat_end import chat_end_bp
from routes.chat_history import chat_history_bp
from routes.reminders import reminders_bp
from routes.quiz_question import quiz_question_bp
from routes.quiz_hint import quiz_hint_bp
from routes.quiz_answer import quiz_answer_bp


app = Flask(__name__)
CORS(app)

app.register_blueprint(test_llm_bp)
app.register_blueprint(chat_start_bp)
app.register_blueprint(chat_continue_bp)
app.register_blueprint(chat_summarize_bp)
app.register_blueprint(chat_end_bp)
app.register_blueprint(chat_history_bp)
app.register_blueprint(reminders_bp)
app.register_blueprint(quiz_question_bp)
app.register_blueprint(quiz_hint_bp)
app.register_blueprint(quiz_answer_bp)





if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)