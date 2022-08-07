import { FormEvent, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

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
    <Wrapper>
      <Title>ログイン画面</Title>
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
        <PageLink>新規登録はこちら</PageLink>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 600px;
  padding: 15px;
  border-radius: 5px;
  background-color: white;
  margin: 40px auto;
`;

const Title = styled.h2`
  font-size: 25px;
  color: #384459;
  margin-top: 0;
  margin-bottom: 20px;
`;

const PageLink = styled.a`
  display: block;
  margin-top: 40px;
  color: #384459;
  cursor: pointer;

  &:hover {
    opacity: 0.3;
  }
`;

export default LoginPage;