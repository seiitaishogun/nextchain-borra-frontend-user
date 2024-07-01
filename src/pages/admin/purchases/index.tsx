import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import Link from 'next/link';
import AdminLayout from '@/components/Admin/Layout';
import Search from '@/components/Admin/Purchases/Search';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import ExcelDownload from '@/components/Admin/Common/ExcelDownload';
import { PageLayout, Util } from '@/styles/Admin/PageLayout.styled';
import { fetchExcelDownload, fetchPurchases } from '@/api/admin/purchases';
import { searchFiltersState, searchRequest } from '@/store/admin/purchases';
import useListData from '@/hooks/admin/useListData';
import { PurchasesList } from '@/types/admin/purchases/list';

function Purchases() {
  const searchFilters = useRecoilValue(searchRequest);
  const setSearchFilters = useSetRecoilState(searchFiltersState);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ['adminPurchases', { page, ...searchFilters }],
    () =>
      fetchPurchases({
        page: Number(page),
        ...searchFilters,
      })
  );

  const {
    list,
    counts: { total_sum, search_count },
    paginate,
  } = useListData<PurchasesList>(data?.data);

  useEffect(
    () => () => {
      resetSearchFilters();
    },
    []
  );

  return (
    <PageLayout>
      <h1>코인 사용 내역</h1>
      <Search />
      <Util>
        <span>
          사용 총액: {total_sum}원 (총 {search_count}건)
        </span>
        <ExcelDownload
          text="코인 사용 내역 목록 다운로드"
          downloadFunction={() => fetchExcelDownload({ ...searchFilters })}
        />
      </Util>
      <Table
        columns={columns}
        rows={list}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        totalPage={paginate}
        setSearchSort={setSearchFilters}
        isPagination
      />
    </PageLayout>
  );
}

export default Purchases;

Purchases.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

const columns: Array<TableColumns<PurchasesList>> = [
  {
    id: 'email',
    label: '이메일',
    maxWidth: 200,
    format: ({ user_id, email }) => (
      <Link href={`/admin/users/${user_id}`} legacyBehavior>
        {email}
      </Link>
    ),
  },
  {
    id: 'name',
    label: '회원명',
    maxWidth: 150,
  },
  {
    id: 'gender',
    label: '성별',
    maxWidth: 60,
  },
  {
    id: 'type',
    label: '분류',
    maxWidth: 150,
  },
  {
    id: 'content_name',
    label: '콘텐츠명',
    maxWidth: 150,
  },
  {
    id: 'payment',
    label: '결제방식',
    maxWidth: 150,
  },
  {
    id: 'decreased',
    label: '금액',
    isSort: true,
    maxWidth: 150,
  },
  {
    id: 'device',
    label: '접속경로',
    maxWidth: 150,
  },
  {
    id: 'referrer_path',
    label: '최초유입경로',
    maxWidth: 150,
  },
  {
    id: 'created_at',
    label: '사용일시',
    maxWidth: 150,
  },
];
