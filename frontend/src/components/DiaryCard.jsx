import React from 'react';
import '../styles/DiaryCard.css';

function DiaryCard({ title, backgroundColor, onClick }) {
    return (
        <div
            className="diary-card"
            onClick={onClick}
            style={{ backgroundColor: backgroundColor || '#ffffff', color: '#000000', cursor: 'pointer' }}
        >
            <h3>{title}</h3>
        </div>
    );
}

export default DiaryCard;
