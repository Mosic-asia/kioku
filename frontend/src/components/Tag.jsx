import React from 'react';
import '../styles/DiaryCard.css'; // 같은 CSS에서 태그도 관리

function Tag({ text }) {
    return <span className="tag">#{text}</span>;
}

export default Tag;
