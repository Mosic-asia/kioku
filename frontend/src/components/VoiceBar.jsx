// src/components/VoiceBar.jsx
import React, { useEffect, useRef } from 'react';
import styles from '../styles/VoiceBar.module.css';

const VoiceBar = ({ onStopRecording }) => {
  const bar1Ref = useRef(null);
  const bar2Ref = useRef(null);
  const bar3Ref = useRef(null);

  useEffect(() => {
    const animateBars = () => {
      const randomHeight1 = Math.floor(Math.random() * 40) + 20; // 20px ~ 60px
      const randomHeight2 = Math.floor(Math.random() * 40) + 20;
      const randomHeight3 = Math.floor(Math.random() * 40) + 20;
      const randomDelay1 = Math.random() * 0.5;
      const randomDelay2 = Math.random() * 0.5 + 0.2;
      const randomDelay3 = Math.random() * 0.5 + 0.4;

      if (bar1Ref.current) {
        bar1Ref.current.style.height = `${randomHeight1}px`;
        bar1Ref.current.style.animationDelay = `${randomDelay1}s`;
      }
      if (bar2Ref.current) {
        bar2Ref.current.style.height = `${randomHeight2}px`;
        bar2Ref.current.style.animationDelay = `${randomDelay2}s`;
      }
      if (bar3Ref.current) {
        bar3Ref.current.style.height = `${randomHeight3}px`;
        bar3Ref.current.style.animationDelay = `${randomDelay3}s`;
      }
    };

    const intervalId = setInterval(animateBars, 500); // 0.5초마다 애니메이션 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  return (
    <div className={styles.voiceBar} onClick={onStopRecording}> {/* 클릭 시 녹음 종료 함수 호출 */}
      <div className={`${styles.bar} ${styles.bar1}`} ref={bar1Ref}></div>
      <div className={`${styles.bar} ${styles.bar2}`} ref={bar2Ref}></div>
      <div className={`${styles.bar} ${styles.bar3}`} ref={bar3Ref}></div>
    </div>
  );
};

export default VoiceBar;