import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface Props {
  onClick: () => void;
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #8886ff;

  button {
    width: 100%;
    height: 100%;

    img {
      margin: 0 auto;
    }
  }
`;

function AccountsButton({ onClick }: Props) {
  return (
    <Layout>
      <button type="button" onClick={onClick}>
        <Image
          src="/layout/aside/edit.png"
          alt="수정"
          width={20}
          height={20}
          priority
        />
      </button>
    </Layout>
  );
}

export default AccountsButton;
