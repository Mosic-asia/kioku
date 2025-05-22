import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Login from "./routes/Login";
import Register from "./routes/SignUp";
import Chat from "./routes/Chat";
import Menu from "./routes/Menu";
import Reminder from "./routes/Reminder";
import JournalList from "./routes/JournalList";
import JournalDetail from "./routes/JournalDetail";
import Header from "./components/Header";
import Talk from "./routes/Talk";
import Setting from "./routes/Setting";
import SignUp from "./routes/SignUp";
import EmergencyContact from "./routes/EmergencyContact";
import EmergencyContactEdit from "./routes/EmergencyContactEdit";
import UserInfo from "./routes/UserInfo";
import UserInfoEdit from "./routes/UserInfoEdit";



function App() {
  // App.js 또는 index.js에 추가
React.useEffect(() => {
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);
  return () => window.removeEventListener('resize', setVh);
}, []);


  return (
    <BrowserRouter>
      <Header /> {/* <Routes> 컴포넌트 바깥으로 이동 */}
      <div className="container"> {/* 헤더 아래 콘텐츠 영역 (선택 사항) */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/emergency-contact" element={<EmergencyContact />} />
          <Route path="/emergency-contact/edit" element={<EmergencyContactEdit />} />
          <Route path="/journal-list" element={<JournalList />} />
          <Route path="/journal-detail/:journalId" element={<JournalDetail />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/my-info" element={<UserInfo />} />
          <Route path="/my-info/edit" element={<UserInfoEdit />} />
          <Route path="/talk" element={<Talk />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;