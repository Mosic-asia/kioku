import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import InputBox from "../components/InputBox";
import VoiceBar from "../components/VoiceBar";
import ErrorBanner from "../components/ErrorBanner";
import CloudImage from "../assets/cloud.png";
import styles from "../styles/Chat.module.css";
import "../styles/ChatAnimation.css";

import { getInitialChat, postUserMessage, endChatSession } from "../api/chatApi";

const USER_ID = 1; // 실제 로그인 사용자에 맞게 변경

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [error, setError] = useState(null);
  const chatAreaRef = useRef(null);

  // 1. 대화 시작 (API 1)
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const data = await getInitialChat(USER_ID);
        setMessages([
          {
            sender: "other",
            text: data.ai_response,
            timestamp: data.timestamp,
          },
        ]);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchInitial();

    // 4. 언마운트 시 대화 종료 (API 4)
    return () => {
      endChatSession(USER_ID).catch(() => {});
    };
  }, []);

  // 2. 대화 계속 (API 2)
  const handleSend = async (text) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text, timestamp: new Date().toISOString() },
    ]);
    try {
      const data = await postUserMessage(USER_ID, text);

      // detected_reminder가 있다면 별도 처리 (예: 알림 표시)
      if (data.detected_reminder) {
        // 예시: 리마인더를 메시지로 추가
        setMessages((prev) => [
          ...prev,
          {
            sender: "other",
            text: `리마인더 감지됨: ${data.detected_reminder.reminder} (${data.detected_reminder.time || ""})`,
            timestamp: data.timestamp,
          },
        ]);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "other",
          text: data.ai_response,
          timestamp: data.timestamp,
        },
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMicClick = () => setIsVoiceRecording(true);
  const handleStopRecording = () => setIsVoiceRecording(false);

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
              className={`${styles.cloudAvatar} cloud-float ${isVoiceRecording ? styles.expandedAvatar : ""}`}
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

export default Chat;
