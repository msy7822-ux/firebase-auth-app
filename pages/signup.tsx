import type { FormEvent } from "react";

import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { signup } from "../libs/firebase/utils";
import Link from "next/link";

import { errMessageToJa } from "../utils/errMessageToJa";

const SignupPage: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFailed, setIsFailed] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault(); // デフォルトの<form />の挙動を無効にする
    await signup(email, password).then(res => {
      setIsFailed(false);
      router.push("/dashboard"); // ダッシュボードページへ遷移させる
    }).catch(err => {
      console.log(err);
      setIsFailed(true);
      setErrMessage(errMessageToJa(err.code) ?? '');
    });
  };

  return (
    <div>
      <h1>新規登録画面</h1>

      {isFailed && (
        <>
          <p>
            <p>エラーメッセージ</p>
            <p>{errMessage}</p>
          </p>
          <Link href='/login'>
            <a>ログインページ</a>
          </Link>
        </>
      )}
      <br />
      <br />
      <br />

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>

          <input
            id="email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>

          <input
            id="password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <button type="submit">signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
