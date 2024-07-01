import React, { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import AdminLayout from '@/components/Admin/Layout';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Search from '@/components/Admin/Users/Search';
import ExcelDownload from '@/components/Admin/Common/ExcelDownload';
import { PageLayout, Util } from '@/styles/Admin/PageLayout.styled';
import { fetchUsers, fetchUsersExcelDownload } from '@/api/admin/users';
import { searchFiltersState, searchRequestSelector } from '@/store/admin/users';
import { UsersList } from '@/types/admin/users/list';
import useListData from '@/hooks/admin/useListData';

function User() {
  const searchFilters = useRecoilValue(searchRequestSelector);
  const setSearchFilters = useSetRecoilState(searchFiltersState);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    ['adminUsers', { page, ...searchFilters }],
    () =>
      fetchUsers({
        page: Number(page),
        ...searchFilters,
      })
  );
  const {
    list,
    counts: { total_count, search_count },
    paginate,
  } = useListData<UsersList>(data?.data);

  useEffect(
    () => () => {
      resetSearchFilters();
    },
    []
  );

  return (
    <PageLayout>
      <h1>회원조회</h1>
      <Search />

      <Util>
        <span>
          검색결과 총 {search_count}명 (전체 {total_count}명)
        </span>

        <ExcelDownload
          text="유저 목록 다운로드"
          downloadFunction={() => fetchUsersExcelDownload({ ...searchFilters })}
        />
      </Util>

      <Table<UsersList>
        columns={columns}
        rows={list}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        setSearchSort={setSearchFilters}
        totalPage={paginate}
      />
    </PageLayout>
  );
}

export default User;

User.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

const columns: Array<TableColumns<UsersList>> = [
  {
    id: 'name',
    label: '회원명',
    maxWidth: 80,
    isSort: true,
  },
  {
    id: 'email',
    label: '이메일',
    maxWidth: 250,
    isSort: true,
    format: row => (
      <Link href={`/admin/users/${row.id}`} legacyBehavior>
        {row.email}
      </Link>
    ),
  },
  {
    id: 'coin',
    label: '보유코인',
    maxWidth: 100,
    isSort: true,
  },
  {
    id: 'total_payment',
    label: '결제금액',
    maxWidth: 100,
    isSort: true,
  },
  {
    id: 'payment_at',
    label: '마지막 결제일',
    maxWidth: 150,
  },
  {
    id: 'last_accessed_at',
    label: '최종 접속일',
    maxWidth: 150,
  },
  {
    id: 'status',
    label: '상태',
    maxWidth: 50,
  },
];
