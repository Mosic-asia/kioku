import React from 'react';
import styles from '../styles/Menu.module.css';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className={styles.menuContainer}>
            {/* 긴급연락처 버튼 */}
            <Link to="/emergency-contact" className={styles.emergencyLink}>
                <button className={styles.emergencyContactButton}>
                    緊急連絡先
                </button>
            </Link>
            {/* 메뉴 그리드 */}
            <div className={styles.menuGrid}>
                <Link to="/journal-list" className={styles.menuLink}>
                    <div className={styles.menuItem}>
                        <span className={styles.itemText}>日記</span>
                    </div>
                </Link>
                <Link to="/chat" className={styles.menuLink}>
                    <div className={styles.menuItem}>
                        <span className={styles.itemText}>日記を書く</span>
                    </div>
                </Link>
                <Link to="/talk" className={styles.menuLink}>
                    <div className={styles.menuItem}>
                        <span className={styles.itemText}>トーク</span>
                    </div>
                </Link>
                <Link to="#" className={styles.menuLink}>
                    <div className={styles.menuItem}>
                        <span className={styles.itemText}>予定</span>
                    </div>
                </Link>
                <Link to="/my-info" className={styles.menuLink}>
                    <div className={styles.menuItem}>
                        <span className={styles.itemText}>マイカルて</span>
                    </div>
                </Link>
                <Link to="#" className={styles.menuLink}>
                    <div className={styles.menuItem}>
                        <span className={styles.itemText}>設定</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Menu;
