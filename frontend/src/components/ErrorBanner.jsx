// src/components/ErrorBanner.jsx

import React from "react";
import styles from "../styles/ErrorBanner.module.css";

const ErrorBanner = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className={styles.errorBanner}>
      <span>{message}</span>
      <button onClick={onClose}>✖</button>
    </div>
  );
};

export default ErrorBanner;
