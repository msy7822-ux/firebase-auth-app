import type { FormEvent } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../libs/firebase/utils";  // 上記で実装したファイル

import { errMessageToJa } from "../utils/errMessageToJa";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFailed, setIsFailed] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await login(email, password).then(res => {
      setIsFailed(false);
      router.push("/dashboard");
    }).catch(err => {
      console.log(err);
      console.log(err.code);
      setErrMessage(errMessageToJa(err.code) ?? '')
      setIsFailed(true);
    });
  };

  return (
    <div>
      <h1>ログイン画面</h1>

      {isFailed && (
        <>
          <p>
            <p>エラーメッセージ</p>
            <p>{errMessage}</p>
          </p>
          <Link href='/signup'>
            <a>新規登録を行う</a>
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

        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginPage;