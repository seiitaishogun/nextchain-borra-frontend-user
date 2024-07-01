import styled from 'styled-components';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MyCoin from '@/components/Payments/MyCoin';
import TabMenu from '@/components/Payments/TabMenu';
import AuthCheck from '@/components/Auth/AuthCheck';
import Table from '@/components/Common/Table';
import Pagination from '@/components/Common/List/Pagination';
import HistoryLayout from '@/components/Common/Layout/History';
import Advertise from '@/components/Common/Advertise';
import { fetchPayments } from '@/api/account';
import { PAYMENT_AD } from '@/constants/adsense';

const Layout = styled.div`
  padding: 0 16px 20px;
`;

const List = styled.div`
  margin-top: 32px;
`;

function Payment() {
  const router = useRouter();
  const [page, setPage] = useState<number>(
    router?.query?.id ? Number(router.query.id) : 1
  );
  const { data } = useQuery(
    ['accountsPayments', page],
    () => fetchPayments({ page }),
    {
      initialData: {
        data: {
          last_page: 1,
          list: [],
          total: 0,
        },
      },
      enabled: router.isReady,
      select: res => ({
        ...res.data,
        list: res.data.list.filter((item: any) => !!item),
      }),
    }
  );

  const { list, last_page } = data;

  return (
    <AuthCheck>
      <Layout>
        <MyCoin />
        <TabMenu />

        <List>
          <Table columns={COLUMNS} rows={list} />
          <Pagination page={page} setPage={setPage} totalPage={last_page} />
        </List>

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

Payment.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="나의코인">{page}</HistoryLayout>;
};

export default Payment;

const COLUMNS = [
  {
    id: 'created_at',
    label: '날짜',
    maxWidth: 90,
  },
  {
    id: 'method',
    label: '분류',
    maxWidth: 68,
  },
  {
    id: 'title',
    label: '충전',
    maxWidth: 80,
  },
  {
    id: 'price',
    label: '결제',
    maxWidth: 90,
  },
];
