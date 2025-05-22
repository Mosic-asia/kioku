import React, { useState } from "react";
import styles from "../styles/Auth.module.css";
import CloudImage from "../assets/cloud.png";

const Login = ({ onLogin }) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password: pw }),
      });
      if (!res.ok) {
        setError("Login failed. Please check your ID and password.");
        return;
      }
      const data = await res.json();
      if (onLogin) onLogin(data);
    } catch {
      setError("A server error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <img src={CloudImage} alt="logo" className={styles.logo} />
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={e => setId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="PW"
          value={pw}
          onChange={e => setPw(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">Login</button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
      <div className={styles.linkBox}>
        <span>Don't you have an account?</span>
        <a href="/sign-up">Sign up</a>
      </div>
      <div className={styles.linkBox}>
        <a href="/forgot-password">Forgot your Password?</a>
      </div>
    </div>
  );
};

export default Login;
