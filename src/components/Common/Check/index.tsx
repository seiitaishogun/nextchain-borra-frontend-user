import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Popup from '@/components/Common/Popup';

const Layout = styled.div`
  width: ${props => props.theme.deviceSize};
  height: auto;
  padding: 40px 8px;
  box-sizing: border-box;
  background: #ffffff;
  text-align: center;
  color: ${props => props.theme.colors.primary};
  word-break: keep-all;
`;

function Check() {
  return (
    <Popup isOpen>
      <Layout>
        <Typography variant="h5" id="modal-modal-description">
          서비스 점검 중입니다.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          점검 시간 동안 서비스 이용이 제한되는 점 양해부탁드립니다.
          <br />
          <br />
          점검 시간 : 2023년 5월 11일(목) 03:00 ~ 04:00
          <br />
          점검 이유 : DB 점검 작업
        </Typography>
      </Layout>
    </Popup>
  );
}

export default Check;
