import { ReactNode, FC } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
}

export const Container: FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      {children}
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
