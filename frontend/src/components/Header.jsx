// src/components/Header.jsx
import React from 'react';
import styles from '../styles/Header.module.css';
import HomeIcon from '../assets/home.svg'; // 홈 아이콘 경로 확인 및 수정
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>暖かい日記</div>
      <Link to="/menu">
          <img src={HomeIcon} alt="Home" className={styles.homeIcon} />
        </Link>
    </header>
  );
};

export default Header;