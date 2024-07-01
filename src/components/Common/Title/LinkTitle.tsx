import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
  className?: string;
  title: string;
  href: string;
}

const Layout = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 24px;

  a,
  button {
    display: block;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 16px;
    color: #8986ff;
    letter-spacing: -0.18px;
    cursor: pointer;
  }

  svg {
    width: 20px;
    height: 20px;
    color: #999999;
  }
`;

const HeadTitle = styled.h2<{
  size: number;
}>`
  font-size: ${props => props.size}px;
  font-weight: bold;
  letter-spacing: -0.26px;
`;

function LinkTitle({ className, title, href }: Props) {
  return (
    <Layout className={className}>
      <HeadTitle size={20}>{title}</HeadTitle>
      <Link href={href}>
        <ArrowForwardIosIcon />
      </Link>
    </Layout>
  );
}

export default LinkTitle;
