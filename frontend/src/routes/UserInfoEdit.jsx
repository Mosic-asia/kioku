import React, { useEffect, useState } from "react";
import styles from "../styles/UserInfo.module.css";
import DefaultProfile from "../assets/user.png";

const USER_ID = 1;

const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const UserInfoEdit = () => {
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/users/${USER_ID}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(`/api/users/${USER_ID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        setError("Failed to update profile.");
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/my-info";
      }, 1000);
    } catch {
      setError("Server error. Please try again.");
    }
  };

  if (!user) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>Project 名前</span>
        <span className={styles.menu}>メニュー</span>
      </header>
      <form className={styles.profileSection} onSubmit={handleSubmit}>
        <img
          src={DefaultProfile}
          alt="프로필"
          className={styles.profileImage}
        />
        <div className={styles.infoEditList}>
          <input
            className={styles.input}
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="名前"
            required
          />
          <input
            className={styles.input}
            name="home_address"
            value={user.home_address}
            onChange={handleChange}
            placeholder="自宅の住所"
            required
          />
          <input
            className={styles.input}
            name="disease"
            value={user.disease || ""}
            onChange={handleChange}
            placeholder="持病"
          />
          <input
            className={styles.input}
            name="contact"
            value={user.contact}
            onChange={handleChange}
            placeholder="連絡先"
            required
          />
          <select
            className={styles.input}
            name="blood_group"
            value={user.blood_group || ""}
            onChange={handleChange}
          >
            <option value="">血液型</option>
            {bloodTypes.map(bt => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
          <input
            className={styles.input}
            name="weight"
            value={user.weight || ""}
            onChange={handleChange}
            placeholder="体重"
            type="number"
          />
          <input
            className={styles.input}
            name="height"
            value={user.height || ""}
            onChange={handleChange}
            placeholder="身長"
            type="number"
          />
          <input
            className={styles.input}
            name="birthday"
            value={user.birthday}
            onChange={handleChange}
            placeholder="生年月日 (YYYY-MM-DD)"
            required
          />
        </div>
        <button className={styles.saveButton} type="submit">
          修正を完了
        </button>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>保存しました</div>}
      </form>
    </div>
  );
};

export default UserInfoEdit;
