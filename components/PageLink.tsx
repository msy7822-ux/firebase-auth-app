import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

type Props = {
  href: string;
  linkText: string;
}

export const PageLink: FC<Props> = ({ href, linkText }) => {
  return (
    <Link href={href}>
      <LinkStyle>{linkText}</LinkStyle>
    </Link>
  );
};

const LinkStyle = styled.a`
  display: block;
  margin-top: 40px;
  color: #384459;
  cursor: pointer;

  &:hover {
    opacity: 0.3;
  }
`;

