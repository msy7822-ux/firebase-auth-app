import { FormEvent, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { signup } from "../libs/firebase/utils";
import { errMessageToJa } from "../utils/errMessageToJa";
import { AuthenticationForm } from "../components/AuthenticationForm";
import { ErrorMessages } from "../components/ErrorMessages";
import { useAuthenticationFormData } from "../hooks/useAuthenticationFormDate";

const SignupPage: NextPage = () => {
  const router = useRouter();
  const [isFailed, setIsFailed] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const { email, setEmail, password, setPassword } = useAuthenticationFormData();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await signup(email, password).then(() => {
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
      <ErrorMessages isFailed={isFailed} errorMessage={errMessage} />

      <AuthenticationForm
        onSubmit={onSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        btnText='サインアップ'
      />

      <Link href='/login'>
        <a>ログインページはこちら</a>
      </Link>
    </div>
  );
};

export default SignupPage;
