import React, { useEffect, useState } from "react";
import styles from "../styles/EmergencyContact.module.css";

const USER_ID = 1;

const emptyContact = { id: null, name: "", relation: "", contact: "", email: "" };

const EmergencyContactEdit = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 기존 연락처 불러오기
  useEffect(() => {
    fetch(`/api/users/${USER_ID}/emergency_contacts`)
      .then(res => res.json())
      .then(data => setContacts(data || []))
      .catch(() => setContacts([]));
  }, []);

  // 입력값 변경
  const handleChange = (idx, field, value) => {
    setContacts(prev =>
      prev.map((c, i) => (i === idx ? { ...c, [field]: value } : c))
    );
  };

  // 연락처 추가
  const handleAdd = () => {
    setContacts(prev => [...prev, { ...emptyContact }]);
  };

  // 연락처 삭제
  const handleDelete = async (idx) => {
    const contact = contacts[idx];
    if (contact.id) {
      await fetch(`/api/users/${USER_ID}/emergency_contacts/${contact.id}`, {
        method: "DELETE"
      });
    }
    setContacts(prev => prev.filter((_, i) => i !== idx));
  };

  // 저장(수정/추가)
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      // 1. 기존 연락처 수정 (PATCH)
      for (const c of contacts) {
        if (c.id) {
          await fetch(`/api/users/${USER_ID}/emergency_contacts/${c.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: c.name,
              relation: c.relation,
              contact: c.contact,
              email: c.email
            }),
          });
        }
      }
      // 2. 새 연락처 추가 (POST)
      for (const c of contacts.filter(c => !c.id && c.name && c.contact)) {
        await fetch(`/api/users/${USER_ID}/emergency_contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: USER_ID,
            name: c.name,
            relation: c.relation,
            contact: c.contact,
            email: c.email
          }),
        });
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/emergency-contact";
      }, 1000);
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>緊急連絡先</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {contacts.map((c, idx) => (
          <div key={c.id || idx} className={styles.inputGroup}>
            <input
              className={styles.input}
              placeholder="名前 (必須)"
              value={c.name}
              onChange={e => handleChange(idx, "name", e.target.value)}
              required
            />
            <input
              className={styles.input}
              placeholder="続柄 (例: 家族, 医師)"
              value={c.relation}
              onChange={e => handleChange(idx, "relation", e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="電話番号 (必須, +81...)"
              value={c.contact}
              onChange={e => handleChange(idx, "contact", e.target.value)}
              required
            />
            <input
              className={styles.input}
              placeholder="メールアドレス (任意)"
              value={c.email}
              onChange={e => handleChange(idx, "email", e.target.value)}
            />
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => handleDelete(idx)}
              disabled={contacts.length === 1}
            >
              削除
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAdd}
        >
          追加
        </button>
        <button className={styles.saveButton} type="submit">
          修正を完了
        </button>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>保存しました</div>}
      </form>
    </div>
  );
};

export default EmergencyContactEdit;
