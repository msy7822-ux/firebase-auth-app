import { FC, MouseEventHandler } from "react";
import styled from 'styled-components';

type Props = {
  onClick: MouseEventHandler;
}

export const GoogleAuthButton: FC<Props> = ({ onClick }) => {
  return (
    <ButtonWrapper>
      <GoogleButton onClick={onClick}>
        Googleでログインする
      </GoogleButton>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  margin-bottom: 25px;
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 0;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  background-color: #eb3b00;
`;
