import styled from 'styled-components';
import React from 'react';
import Charge from '@/components/Payments/Charge';
import MyCoin from '@/components/Payments/MyCoin';
import TabMenu from '@/components/Payments/TabMenu';
import AuthCheck from '@/components/Auth/AuthCheck';
import HistoryLayout from '@/components/Common/Layout/History';
import Advertise from '@/components/Common/Advertise';
import { PAYMENT_AD } from '@/constants/adsense';

const Layout = styled.div`
  margin: 0 16px 20px;
`;

function PaymentCharge() {
  return (
    <AuthCheck>
      <Layout>
        <MyCoin />
        <TabMenu />
        <Charge />

        <Advertise
          style={{
            marginTop: 40,
          }}
          {...PAYMENT_AD}
        />
      </Layout>
    </AuthCheck>
  );
}

PaymentCharge.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="코인 충전">{page}</HistoryLayout>;
};

export default PaymentCharge;
