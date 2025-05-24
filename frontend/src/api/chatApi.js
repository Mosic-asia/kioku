// src/api/chatApi.js


export const getInitialChat = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/users/${userId}/chat/start`);
  console.log(res)

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`챗봇 시작 요청 실패: ${res.status} ${errorText}`);
  }
  return res.json();
};

export const postUserMessage = async (userId, text) => {
    const res = await fetch(`http://localhost:5000/api/users/${userId}/chat/continue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, user_response: text }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`챗봇 응답 요청 실패: ${res.status} ${errorText}`);
  }
  return res.json();
};

export const endChatSession = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/users/${userId}/chat/end`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`챗봇 종료 요청 실패: ${res.status} ${errorText}`);
  }
  return res.json();
};
