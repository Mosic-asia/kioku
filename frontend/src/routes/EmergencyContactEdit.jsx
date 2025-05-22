import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EmergencyContact.module.css";

const USER_ID = 1;

const EmergencyContactEdit = () => {
  const [contacts, setContacts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 불러오기
  useEffect(() => {
    fetch(`/api/users/${USER_ID}/emergency_contacts`)
      .then(res => res.json())
      .then(data => {
        setContacts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setContacts([]);
        setLoading(false);
      });
  }, []);

  // 입력값 변경
  const handleChange = (idx, value) => {
    setContacts(prev =>
      prev.map((c, i) => (i === idx ? { ...c, contact: value } : c))
    );
  };

  // 저장
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // PATCH 각 연락처별로
      await Promise.all(
        contacts.map(c =>
          fetch(`/api/users/${USER_ID}/emergency_contacts/${c.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: c.name,
              relation: c.relation,
              contact: c.contact,
              email: c.email,
            }),
          })
        )
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/emergency-contact");
      }, 1200);
    } catch {
      alert("저장에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.brand}>Project 名前</span>
        <span className={styles.menu}>メニュー</span>
      </header>
      <div className={styles.title}>緊急連絡先</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {contacts.map((c, idx) => (
          <input
            key={c.id}
            className={styles.editInput}
            value={c.contact}
            onChange={e => handleChange(idx, e.target.value)}
            placeholder={c.name}
            required
          />
        ))}
        <button className={styles.saveButton} type="submit">
          修正を完了
        </button>
        {success && <div className={styles.success}>保存しました</div>}
      </form>
    </div>
  );
};

export default EmergencyContactEdit;
