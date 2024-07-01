import React, { ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import AdminLayout from '@/components/Admin/Layout';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchAdvertisesList } from '@/api/admin/advertises';
import useListData from '@/hooks/admin/useListData';
import { AdvertisesData } from '@/types/admin/advertises';

function Ad() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(['adminAdvertises', { page }], () =>
    fetchAdvertisesList({
      page: Number(page),
    })
  );

  const { list, paginate } = useListData<AdvertisesData>(data?.data);

  return (
    <PageLayout>
      <h1>광고 제휴 조회</h1>

      <Table<AdvertisesData>
        columns={columns}
        rows={list}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        totalPage={paginate}
      />
    </PageLayout>
  );
}

Ad.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Ad;

const columns: Array<TableColumns<AdvertisesData>> = [
  {
    id: 'id',
    label: '콘텐츠명',
    maxWidth: 120,
    format: ({ id, content }) => (
      <Link href={`/admin/advertises/${id}`} legacyBehavior>
        {content?.name || ''}
      </Link>
    ),
  },
  {
    id: 'type',
    label: '제휴사',
    maxWidth: 50,
  },
  {
    id: 'code',
    label: '제휴사 코드',
    maxWidth: 100,
  },
  {
    id: 'count',
    label: '구매수',
    maxWidth: 50,
  },
  {
    id: 'created_at',
    label: '생성일',
    maxWidth: 100,
  },
];
