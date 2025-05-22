import React, { useEffect, useState } from "react";
import styles from "../styles/UserInfo.module.css";
import DefaultProfile from "../assets/user.png";

const USER_ID = 1; // 실제 로그인 유저 ID로 대체

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${USER_ID}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>Project 名前</span>
        <span className={styles.menu}>メニュー</span>
      </header>
      <div className={styles.profileSection}>
        <img
          src={DefaultProfile}
          alt="프로필"
          className={styles.profileImage}
        />
        <div className={styles.infoMain}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.birth}>{user.birthday}</div>
        </div>
      </div>
      <div className={styles.infoList}>
        <div>
          <span className={styles.label}>血液型</span>
          <span>{user.blood_group || "-"}</span>
        </div>
        <div>
          <span className={styles.label}>持病</span>
          <span>{user.disease || "-"}</span>
        </div>
        <div>
          <span className={styles.label}>身長</span>
          <span>{user.height ? `${user.height}cm` : "-"}</span>
        </div>
        <div>
          <span className={styles.label}>住所</span>
          <span>{user.home_address}</span>
        </div>
        <div>
          <span className={styles.label}>緊急連絡先</span>
          <span>{user.contact}</span>
        </div>
        {/* 필요시 추가 연락처/병원 등도 여기에 */}
      </div>
      <button
        className={styles.editButton}
        onClick={() => window.location.href = "/my-info/edit"}
      >
        情報を修正
      </button>
    </div>
  );
};

export default UserInfo;
