import React from 'react';
import styles from '../styles/ChatBubble.module.css';

const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  const bubbleClass = isUser ? styles.userBubble : styles.otherBubble;
  const containerClass = `${styles.chatBubbleContainer} ${isUser ? styles.justifyEnd : styles.justifyStart}`;

  return (
    <div className={containerClass}>
      <div className={`${styles.bubble} ${bubbleClass}`}>
        {message.text && <p>{message.text}</p>}
        {message.image && <img src={message.image} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
      </div>
    </div>
  );
};

export default ChatBubble;
