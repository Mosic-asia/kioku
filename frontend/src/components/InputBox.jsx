// src/components/InputBox.jsx
import React, { useState, useRef } from "react";
import MicIcon from "../assets/microphone.png";
import AddImageIcon from "../assets/plus.svg";
import SendIcon from "../assets/arrow-up.svg";
import styles from "../styles/InputBox.module.css";

const InputBox = ({ onSend, onMicClick, isVoiceRecording, onImageUpload }) => {
  const [text, setText] = useState("");
  const imageInputRef = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleSendClick = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleMicClick = () => {
    onMicClick();
  };

  const handleAddImageClick = () => {
    imageInputRef.current.click(); // 숨겨진 input[type="file"] 클릭
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && onImageUpload) {
      onImageUpload(file); // 부모 컴포넌트로 이미지 파일 전달
      // 필요하다면 미리보기 처리 등을 추가할 수 있습니다.
    }
    // 파일 선택 후 input 값 초기화 (같은 파일 다시 선택 가능하도록)
    event.target.value = '';
  };

  return (
    <div className={styles.inputBox}>
      <div className={styles.iconButton} onClick={handleMicClick}>
        <img src={MicIcon} alt="mic" className={styles.icon} />
      </div>
      <button type="button" className={styles.addImageButton} onClick={handleAddImageClick}>
        <img src={AddImageIcon} alt="add image" className={styles.addImageIcon} />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        style={{ display: 'none' }} // 숨겨진 파일 input
        onChange={handleImageChange}
      />
      <input
        type="text"
        className={styles.inputField}
        placeholder="話を始めましょう！"
        value={text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        disabled={isVoiceRecording}
      />
      <button onClick={handleSendClick} className={styles.sendButton} disabled={isVoiceRecording && !text.trim()}>
        <img src={SendIcon} alt="send" className={styles.sendIcon} />
      </button>
    </div>
  );
};

export default InputBox;