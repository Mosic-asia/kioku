import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../styles/JournalDetail.css';

const USER_ID = 1; // 실제 로그인된 유저 ID로 대체

function JournalDetail() {
  const { journalId } = useParams();
  const { state } = useLocation();
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${USER_ID}/journals/${journalId}`)
      .then(res => res.json())
      .then(data => {
        setJournal(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [journalId]);

  if (loading) return <div className="journal-detail-page">Loading...</div>;
  if (!journal) return <div className="journal-detail-page">No data found.</div>;

  return (
    <div className="journal-detail-page">
      <h2 className="journal-detail-title">{journal.title}</h2>
      <div
        className="journal-content-box"
        style={{
          backgroundColor: state?.backgroundColor || '#ECF6EA',
          color: '#000000',
          padding: '20px',
          borderRadius: '12px',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.6',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        {journal.summary}
        {/* 상세 메시지들을 모두 보여주고 싶다면 아래도 추가 */}
        {/* journal.messages?.map((msg, idx) => (
          <div key={idx} style={{ marginTop: 8 }}>
            <div>{msg.text}</div>
            {msg.reply_text && <div style={{ color: '#888', fontSize: 14 }}>{msg.reply_text}</div>}
          </div>
        )) */}
      </div>
    </div>
  );
}

export default JournalDetail;
