// src/api/memoryQuizApi.js

export const postMemoryQuiz = async (userId, user_response = null, support_msg = null) => {
  const payload = {
    user_id: userId,
    user_response,
    support_msg,
  };

  const res = await fetch(`/api/users/${userId}/memory-quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("기억 퀴즈 API 호출 실패: " + errorText);
  }

  return res.json();
};
