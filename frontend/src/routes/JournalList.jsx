import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryCard from '../components/DiaryCard';
import '../styles/JournalList.css';

const USER_ID = 1; // 실제 로그인된 유저 ID로 대체

const pastelColors = ['#ECF6EA', '#FEF7C3', '#E5E1F1'];

function JournalList() {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${USER_ID}/journals`)
      .then(res => res.json())
      .then(data => {
        setJournals(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="journal-list-page">Loading...</div>;

  return (
    <div className="journal-list-page">
      <div className="diary-list-box">
        {journals.map((journal, index) => (
          <DiaryCard
            key={journal.id}
            date={journal.start_datetime ? journal.start_datetime.slice(0, 10).replace(/-/g, '年').replace(/年(\d{2})$/, '年$1月') + '日' : ''}
            title={journal.title}
            backgroundColor={pastelColors[index % pastelColors.length]}
            onClick={() =>
              navigate(`/journal-detail/${journal.id}`, {
                state: {
                  journalId: journal.id,
                  backgroundColor: pastelColors[index % pastelColors.length],
                },
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default JournalList;
