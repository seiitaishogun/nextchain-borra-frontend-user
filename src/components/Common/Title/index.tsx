import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface Props {
  className?: string;
  title: string;
  linkConfig?: {
    href?: string;
    text?: string;
    onClick?: () => void;
  };
  size?: number;
}

const Layout = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 24px;

  a,
  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: -0.18px;
    cursor: pointer;
  }
`;

const HeadTitle = styled.h2<{
  size: number;
}>`
  font-size: ${props => props.size}px;
  font-weight: bold;
  letter-spacing: -0.26px;
`;

function Title({ className, title, linkConfig, size }: Props) {
  return (
    <Layout className={className}>
      <HeadTitle size={size || 20}>{title}</HeadTitle>

      {linkConfig && linkConfig?.href && (
        <Link href={linkConfig.href} legacyBehavior>
          {linkConfig.text || '모두 보기'}
        </Link>
      )}
      {linkConfig && linkConfig?.onClick && (
        <button type="button" onClick={linkConfig.onClick}>
          {linkConfig.text}
        </button>
      )}
    </Layout>
  );
}

Title.defaultProps = {
  size: 20,
};

export default Title;
export type { Props as TitleProps };
