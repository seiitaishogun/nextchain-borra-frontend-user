import styled from 'styled-components';
import React from 'react';
import MyInfo from '@/components/Accounts/MyInfo';
import AuthCheck from '@/components/Auth/AuthCheck';
import HistoryLayout from '@/components/Common/Layout/History';
import { naverAdTrackContainerKey } from '@/lib/naverAd';

const Layout = styled.div`
  padding-top: 20px;
  margin: 0 16px;
`;

function Register() {
  return (
    <AuthCheck>
      <Layout>
        <MyInfo isRegister />
        <div id={naverAdTrackContainerKey} />
      </Layout>
    </AuthCheck>
  );
}

Register.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <HistoryLayout name="내 정보" isNavigation={false}>
      {page}
    </HistoryLayout>
  );
};

export default Register;
