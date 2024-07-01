import React from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

interface Props {
  name: string;
  size?: 'medium' | 'large';
  backUrl?: string;
}

const Layout = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
  width: ${props => props.theme.deviceSize};
  height: 50px;
  padding: 0 40px 0 8px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const BackButton = styled.div`
  width: 32px;
  height: 32px;

  button {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    background: url('${process.env
        .APP_IMAGE_URL}/layout/header/arrow_left.svg')
      no-repeat center center;
    background-size: 9px;
    cursor: pointer;
    text-indent: -9999px;
  }
`;

const TitleBox = styled.div<{ size?: 'medium' | 'large' }>`
  h1 {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.21px;

    ${props =>
      props.size === 'large' &&
      css`
        font-size: 17px;
      `}
  }
`;

function HistoryHeader({ name, size, backUrl }: Props) {
  const router = useRouter();

  const handleHistoryBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <Layout>
      <BackButton>
        <button type="button" onClick={handleHistoryBack}>
          뒤로가기
        </button>
      </BackButton>

      <TitleBox size={size}>
        <h1>{name}</h1>
      </TitleBox>

      <div />
    </Layout>
  );
}

export default HistoryHeader;
