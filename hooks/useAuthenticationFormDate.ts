import { useState } from 'react';

// 認証フォームに必要なデータを返します
export const useAuthenticationFormData = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return {
    email: email,
    setEmail: setEmail,
    password: password,
    setPassword: setPassword,
  }
}