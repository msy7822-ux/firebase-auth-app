import { FC } from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
}

export const Title: FC<Props> = ({ text }) => {
  return (
    <TitleStyle>{text}</TitleStyle>
  );
};

const TitleStyle = styled.h2`
  font-size: 25px;
  color: #384459;
  margin-top: 0;
  margin-bottom: 20px;
`;
