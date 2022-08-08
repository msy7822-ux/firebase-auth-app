import { FormEvent, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { signup } from "../libs/firebase/utils";
import { errMessageToJa } from "../utils/errMessageToJa";
import { AuthenticationForm } from "../components/AuthenticationForm";
import { ErrorMessages } from "../components/ErrorMessages";
import { useAuthenticationFormData } from "../hooks/useAuthenticationFormDate";
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { googleLogin } from "../libs/firebase/utils";
import { Title } from "../components/Title";
import { PageLink } from "../components/PageLink";
import { Container } from "../components/Container";

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

  const onClickGoogleAuthBtn = async () => {
    await googleLogin()
      .then(() => {
        setIsFailed(false);
        router.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        setIsFailed(true);
        setErrMessage(errMessageToJa(err.code) ?? '')
      });
  }

  return (
    <Container>
      <Title text='新規登録画面' />
      <ErrorMessages isFailed={isFailed} errorMessage={errMessage} />
      <GoogleAuthButton onClick={onClickGoogleAuthBtn} />
      <AuthenticationForm
        onSubmit={onSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        btnText='サインアップ'
      />
      <PageLink href='/login' linkText="ログインページはこちら"/>
    </Container>
  );
};

export default SignupPage;
