import React from 'react';
import styled from 'styled-components';
import Popup from '@/components/Common/Popup';

interface Props {
  isOpen: boolean;
  title?: string;
  description: string | React.ReactNode;
  confirmText?: string;
  container?: HTMLElement | null | (() => HTMLElement | null);
  handleConfirm: () => void | undefined;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  max-width: ${props => props.theme.deviceSize};
  height: auto;
  border-radius: 16px;
  background: #ffffff;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px 18px;
  text-align: center;

  h4 {
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 19px;
    color: #000000;
    line-height: 23px;
  }

  p {
    font-weight: 500;
    font-size: 14px;
    color: #6d6d6d;
    line-height: 19px;
    white-space: pre-wrap;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  button {
    width: 100%;
    height: 51px;
    margin: 0;
    padding: 0;
    border: 0;
    background: #ffffff;
    font-size: 16px;
    font-weight: 600;
    color: #8986ff;
    text-align: center;
    cursor: pointer;
  }
`;

function Message({
  isOpen,
  title,
  description,
  confirmText,
  container,
  handleConfirm,
}: Props) {
  return (
    <Popup isOpen={isOpen} container={container}>
      <Layout>
        <MessageBox>
          {title && <h4>{title}</h4>}
          {typeof description === 'string' ? <p>{description}</p> : description}
        </MessageBox>
        <ButtonBox>
          <button type="button" onClick={handleConfirm}>
            {confirmText || '확인'}
          </button>
        </ButtonBox>
      </Layout>
    </Popup>
  );
}

export default Message;
export type { Props as MessageProps };
