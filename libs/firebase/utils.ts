import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "./config";

export const login = async (email: string, password: string) => {
  // FirebaseAuthを取得する
  const auth = getFirebaseAuth();

  // メールアドレスとパスワードでログインする
  const result = await signInWithEmailAndPassword(auth, email, password);

  // セッションIDを作成するためのIDを作成する
  const id = await result.user.getIdToken();

  // Cookieにセッションを付与するようにAPIを投げる
  await fetch("/api/session", { method: "POST", body: JSON.stringify({ id }) });
};

export const logout = async () => {
  // セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウトさせる
  await fetch("/api/sessionLogout", { method: "POST" });
};