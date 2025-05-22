import React, { useEffect, useState } from "react";
import styles from "../styles/EmergencyContact.module.css";
import { FaPhoneAlt } from "react-icons/fa";

const USER_ID = 1; // 실제 로그인 유저의 ID로 교체

const EmergencyContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${USER_ID}/emergency_contacts`)
      .then(res => res.json())
      .then(data => setContacts(data || []))
      .catch(() => setContacts([]));
  }, []);

  // 대표 연락처(가장 첫 번째)와 추가 연락처 분리
  const mainContact = contacts[0];
  const subContacts = contacts.slice(1);

  return (
    <div className={styles.container}>
      <div className={styles.title}>緊急連絡先</div>
      <div className={styles.iconBox}>
        <FaPhoneAlt className={styles.phoneIcon} />
      </div>
      {mainContact && (
        <div className={styles.mainContact}>
          <div className={styles.contactName}>{mainContact.name}（{mainContact.relation || "代表"}）</div>
          <div className={styles.contactNumber}>{mainContact.contact}</div>
          {mainContact.email && (
            <div className={styles.contactEmail}>{mainContact.email}</div>
          )}
        </div>
      )}
      <div className={styles.subContacts}>
        {subContacts.map(c => (
          <div key={c.id} className={styles.subContact}>
            <div className={styles.contactName}>{c.name}（{c.relation || "追加"}）</div>
            <div className={styles.contactNumber}>{c.contact}</div>
            {c.email && (
              <div className={styles.contactEmail}>{c.email}</div>
            )}
          </div>
        ))}
      </div>
      <button
        className={styles.editButton}
        onClick={() => window.location.href = "/emergency-contact/edit"}
      >
        修正
      </button>
    </div>
  );
};

export default EmergencyContact;
