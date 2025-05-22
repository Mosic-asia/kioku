import React, { useState } from "react";
import styles from "../styles/Auth.module.css";
import CloudImage from "../assets/cloud.png";

const SignUp = () => {
  const [form, setForm] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
    birthday: "",
    home_address: "",
    contact: "",
    blood_group: "",
    weight: "",
    height: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setError("Sign up failed. Please check your input.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("A server error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.signUpContainer}>
      
      <img src={CloudImage} alt="logo" className={styles.logo} />
      <form className={styles.form} onSubmit={handleSignUp}>
        <input name="id" placeholder="ID" value={form.id} onChange={handleChange} required />
        <input name="email" placeholder="EMAIL" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="PW" value={form.password} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="birthday" placeholder="Birthday (YYYY-MM-DD)" value={form.birthday} onChange={handleChange} required />
        <input name="home_address" placeholder="Home address" value={form.home_address} onChange={handleChange} required />
        <input name="contact" placeholder="Contact number" value={form.contact} onChange={handleChange} required />
        <select name="blood_group" value={form.blood_group} onChange={handleChange} required>
          <option value="">Blood type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <input name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} required />
        <input name="height" placeholder="Height (cm)" value={form.height} onChange={handleChange} required />
        <button className={styles.button} type="submit">Sign up</button>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>Sign up completed!</div>}
      </form>
      <div className={styles.linkBox}>
        <span>Do you have Account?</span>
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default SignUp;
