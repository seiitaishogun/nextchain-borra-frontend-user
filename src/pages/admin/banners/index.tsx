import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import AdminLayout from '@/components/Admin/Layout';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Search from '@/components/Admin/Banner/Search';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import useListData from '@/hooks/admin/useListData';
import { fetchBannerList } from '@/api/admin/main/banner';
import { BannerData } from '@/types/admin/banner';
import { searchFiltersState, searchRequest } from '@/store/admin/banner';

function Banner() {
  const searchFilters = useRecoilValue(searchRequest);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    ['adminBanner', { page, ...searchFilters }],
    () =>
      fetchBannerList({
        page: Number(page),
        ...searchFilters,
      })
  );

  const { list, paginate } = useListData<BannerData>(data?.data);

  useEffect(
    () => () => {
      resetSearchFilters();
    },
    []
  );

  return (
    <PageLayout>
      <h1>배너 관리 조회</h1>

      <Search setPage={setPage} />

      <Table<BannerData>
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

Banner.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Banner;

// FIXME: API 연동 후 작업
const columns: Array<TableColumns<BannerData>> = [
  {
    id: 'id',
    label: '배너명',
    maxWidth: 80,
    format: ({ id, name }) => <Link href={`/admin/banners/${id}`}>{name}</Link>,
  },
  {
    id: 'is_open',
    label: '노출상태',
    maxWidth: 40,
    format: ({ is_open }) => (is_open ? '노출' : '비노출'),
  },
  {
    id: 'link',
    label: '링크',
    maxWidth: 140,
  },
  {
    id: 'started_at',
    label: '시작일',
    maxWidth: 100,
  },
  {
    id: 'ended_at',
    label: '종료일',
    maxWidth: 100,
  },
];
