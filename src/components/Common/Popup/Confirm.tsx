import React from 'react';
import styled from 'styled-components';
import Popup from '@/components/Common/Popup';

interface Props {
  isOpen: boolean;
  title?: string;
  description: string | React.ReactNode;
  cancelText?: string;
  handleCancel: () => void;
  confirmText?: string;
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
    width: 50%;
    height: 51px;
    margin: 0;
    padding: 0;
    border: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    background: #ffffff;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }

  button:first-child {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.5);
  }

  button:last-child {
    border-right: 0;
    font-weight: 600;
    color: #8986ff;
  }
`;

function Confirm({
  isOpen,
  title,
  description,
  cancelText,
  handleCancel,
  confirmText,
  handleConfirm,
}: Props) {
  return (
    <Popup isOpen={isOpen}>
      <Layout>
        <MessageBox>
          {title && <h4>{title}</h4>}
          {typeof description === 'string' ? <p>{description}</p> : description}
        </MessageBox>
        <ButtonBox>
          <button type="button" onClick={handleCancel}>
            {cancelText || '취소'}
          </button>
          <button type="button" onClick={handleConfirm}>
            {confirmText || '확인'}
          </button>
        </ButtonBox>
      </Layout>
    </Popup>
  );
}

export default Confirm;
