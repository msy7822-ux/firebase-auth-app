import { FormEvent, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { login } from "../libs/firebase/utils";  // 上記で実装したファイル
import { errMessageToJa } from "../utils/errMessageToJa";
import { AuthenticationForm } from "../components/AuthenticationForm";
import { ErrorMessages } from "../components/ErrorMessages";
import { useAuthenticationFormData } from "../hooks/useAuthenticationFormDate";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [isFailed, setIsFailed] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const { email, setEmail, password, setPassword } = useAuthenticationFormData();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await login(email, password).then(() => {
      setIsFailed(false);
      router.push("/dashboard");
    }).catch(err => {
      console.log(err);
      setIsFailed(true);
      setErrMessage(errMessageToJa(err.code) ?? '')
    });
  };

  return (
    <div>
      <h1>ログイン画面</h1>
      <ErrorMessages isFailed={isFailed} errorMessage={errMessage} />

      <AuthenticationForm
        onSubmit={onSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        btnText='ログイン'
      />

      <Link href='/signup'>
        <a>新規登録はこちら</a>
      </Link>
    </div>
  );
};

export default LoginPage;