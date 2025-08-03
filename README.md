🧠 Dementia Care Assistant Chatbot
A Compassionate AI Companion for Cognitive Support

📌 About This Project
This project was developed during an AI-based hackathon and later forked from our organization's main repository. It is a conversational assistant designed to support elderly users with dementia, providing them with memory assistance, gentle engagement, and daily interaction in Japanese.

The application leverages LLMs (Large Language Models) via Ollama, integrated into a modular Flask API architecture. The focus is on improving the quality of life for dementia patients through empathetic and personalized communication.

🎯 Key Features
💬 Conversational Flow
Starts a friendly AI conversation with dementia users in natural Japanese.

Maintains chat history per user to enable personalized and context-aware dialogue.

Summarizes conversation into a daily journal entry (title and content) in a soft, diary-like format.

⏰ Reminder Detection & Memory Support
Uses LLM to detect if the user message contains a reminder-worthy event.

Automatically adds detected reminders.

Converts reminders into memory-reinforcing quiz questions to help reinforce retention.

❓ Quiz-Based Memory Reinforcement
Generates natural questions and hints from previously set reminders.

Checks user responses for semantic similarity to reinforce correct memory recall gently.

🧱 Tech Stack
Backend: Flask

LLM: Ollama (Qwen2.5 7B Instruct)

Routing: Modular Flask blueprints (chat_start, chat_continue, chat_summarize, quiz_question, etc.)

Reminders: In-memory user reminder store

CORS: Enabled via flask-cors


🤝 Acknowledgment
This project was created as a collaborative effort during an AI Hackathon to explore real-world use cases of LLMs in healthcare.
