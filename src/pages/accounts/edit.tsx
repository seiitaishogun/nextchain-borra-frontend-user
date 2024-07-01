import React from 'react';
import styled from 'styled-components';
import MyInfo from '@/components/Accounts/MyInfo';
import AuthCheck from '@/components/Auth/AuthCheck';
import HistoryLayout from '@/components/Common/Layout/History';

const Layout = styled.div`
  padding: 40px 16px 0;
`;

function AccountsEdit() {
  return (
    <AuthCheck>
      <Layout>
        <MyInfo isRegister={false} />
      </Layout>
    </AuthCheck>
  );
}

AccountsEdit.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="마이페이지">{page}</HistoryLayout>;
};

export default AccountsEdit;
