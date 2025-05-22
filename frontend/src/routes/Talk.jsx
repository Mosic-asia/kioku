import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import InputBox from "../components/InputBox";
import VoiceBar from "../components/VoiceBar";
import ErrorBanner from "../components/ErrorBanner";
import CloudImage from "../assets/cloud.png";
import styles from "../styles/Chat.module.css";
import "../styles/ChatAnimation.css";

import { postMemoryQuiz } from "../api/memoryQuizApi";

const USER_ID = 1; // 실제 로그인 사용자에 맞게 변경

const Talk = () => {
  const [messages, setMessages] = useState([]);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [error, setError] = useState(null);
  const chatAreaRef = useRef(null);

  // 첫 진입 시 퀴즈 시작
  useEffect(() => {
    handleQuizStep();
    // eslint-disable-next-line
  }, []);

  // Memory Quiz API 명세에 맞게 퀴즈 진행
  const handleQuizStep = async (user_response = null) => {
    try {
      const data = await postMemoryQuiz(USER_ID, user_response, "memory quiz ongoing");
      const newMessages = [];

      // 사용자의 답변 표시
      if (user_response) {
        newMessages.push({ sender: "user", text: user_response });
      }

      // 피드백(정답/오답) 표시
      if (data.ai_feedback) {
        newMessages.push({ sender: "other", text: data.ai_feedback });
      }

      // 정답 공개
      if (data.show_answer && data.question) {
        newMessages.push({
          sender: "other",
          text: data.question, // 명세상 정답 및 안내가 question에 포함됨
        });
      } else if (data.question) {
        // 다음 질문 또는 힌트
        newMessages.push({ sender: "other", text: data.question });
      }

      setMessages((prev) => [...prev, ...newMessages]);
    } catch (err) {
      setError(err.message);
    }
  };

  // 답변 전송
  const handleSend = async (text) => {
    await handleQuizStep(text);
  };

  const handleMicClick = () => setIsVoiceRecording(true);
  const handleStopRecording = () => setIsVoiceRecording(false);

  // 스크롤 항상 아래로
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatContentWrapper}>
        <div className={styles.topFade} />
        <div className={styles.chatArea} ref={chatAreaRef}>
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg} />
          ))}
        </div>
        <div className={styles.cloudAvatarContainer}>
          <div className={styles.cloudAvatarWrapper}>
            <img
              src={CloudImage}
              alt="Cloud Avatar"
              className={`
                ${styles.cloudAvatar}
                cloud-float
                ${isVoiceRecording ? styles.expandedAvatar : ""}
              `}
            />
          </div>
        </div>
      </div>

      <ErrorBanner message={error} onClose={() => setError(null)} />

      {!isVoiceRecording && (
        <div className={styles.inputBoxContainer}>
          <InputBox
            onSend={handleSend}
            onMicClick={handleMicClick}
            isVoiceRecording={isVoiceRecording}
          />
        </div>
      )}

      {isVoiceRecording && <VoiceBar onStopRecording={handleStopRecording} />}
    </div>
  );
};

export default Talk;
