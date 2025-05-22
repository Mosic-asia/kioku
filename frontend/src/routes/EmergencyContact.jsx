import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EmergencyContact.module.css";
import { FaPhoneAlt } from "react-icons/fa";

const USER_ID = 1;

const EmergencyContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) return <div className={styles.container}>Loading...</div>;

  const mainContact = contacts[0];
  const subContacts = contacts.slice(1);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.brand}>Project 名前</span>
        <span className={styles.menu}>メニュー</span>
      </header>
      <div className={styles.title}>緊急連絡先</div>
      <div className={styles.iconBox}>
        <FaPhoneAlt className={styles.phoneIcon} />
      </div>
      {mainContact && (
        <div className={styles.mainContact}>{mainContact.contact}</div>
      )}
      <div className={styles.subContacts}>
        {subContacts.map(c => (
          <div key={c.id} className={styles.subContact}>{c.contact}</div>
        ))}
      </div>
      <button
        className={styles.editButton}
        onClick={() => navigate("/emergency-contact/edit")}
      >
        修正
      </button>
    </div>
  );
};

export default EmergencyContact;
