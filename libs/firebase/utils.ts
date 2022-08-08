import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { getFirebaseAuth } from "./config";

const provider = new GoogleAuthProvider();

export const googleLogin = async () => {
  const auth = getFirebaseAuth();
  const result = await signInWithPopup(auth, provider)
  const id = await result.user.getIdToken();
  await fetch("/api/session", { method: "POST", body: JSON.stringify({ id }) });
}

export const signup = async (email: string, password: string) => {
  const auth = getFirebaseAuth();
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const id = await result.user.getIdToken();
  await fetch("/api/session", { method: "POST", body: JSON.stringify({ id }) });
}

export const login = async (email: string, password: string)=> {
  const auth = getFirebaseAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  const id = await result.user.getIdToken();
  await fetch("/api/session", { method: "POST", body: JSON.stringify({ id }) });
};

export const logout = async () => {
  await fetch("/api/sessionLogout", { method: "POST" });
};