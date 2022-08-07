import { FC, FormEvent, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

type Props =  {
  onSubmit: (event: FormEvent) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  btnText: string;
}

export const AuthenticationForm: FC<Props> = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  btnText,
}): JSX.Element => {
  return (
    <Form onSubmit={onSubmit}>
      <EmailWrapper>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput
          id="email"
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
      </EmailWrapper>

      <PasswordWrapper>
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormInput
          id="password"
          type="password"
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
      </PasswordWrapper>

      <SubmitBtn type="submit">{btnText}</SubmitBtn>
    </Form>
  );
}

const Form = styled.form`
  color:#384459;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: bold;
`;

const FormInput = styled.input`
  border: 1px solid #384459;
  width: 100%;
  padding: 12px;
  border-radius: 5px;
`;

const EmailWrapper = styled.div``;

const PasswordWrapper = styled.div`
  margin-top: 10px;
`;

const SubmitBtn = styled.button`
  margin-top: 15px;
  border: 0;
  background-color: #384459;
  color: white;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  font-weight: bold;
`;
