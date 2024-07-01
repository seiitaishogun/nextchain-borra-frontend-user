import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import Link from 'next/link';
import AdminLayout from '@/components/Admin/Layout';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Search from '@/components/Admin/Payments/Search';
import ExcelDownload from '@/components/Admin/Common/ExcelDownload';
import { PageLayout, Util } from '@/styles/Admin/PageLayout.styled';
import { fetchExcelDownload, fetchPaymentsWeb } from '@/api/admin/payments';
import { searchFiltersState, searchRequest } from '@/store/admin/payments';
import useListData from '@/hooks/admin/useListData';
import { PaymentsList } from '@/types/admin/payments/list';

function PaymentsWeb() {
  const searchFilters = useRecoilValue(searchRequest);
  const setSearchFilters = useSetRecoilState(searchFiltersState);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    ['adminPaymentsWeb', { page, ...searchFilters }],
    () => fetchPaymentsWeb({ page: Number(page), ...searchFilters })
  );
  const {
    list,
    counts: { total_sum, search_count },
    paginate,
  } = useListData<PaymentsList>(data?.data);

  useEffect(
    () => () => {
      resetSearchFilters();
    },
    []
  );

  return (
    <PageLayout>
      <h1>웹 코인 적립 내역</h1>
      <Search setPage={setPage} />
      <Util>
        <span>
          충전 총액: {total_sum}원 (총 {search_count}건)
        </span>
        <ExcelDownload
          text="코인 적립 내역 목록 다운로드"
          downloadFunction={() => fetchExcelDownload({ ...searchFilters })}
        />
      </Util>
      <Table<PaymentsList>
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

export default PaymentsWeb;

PaymentsWeb.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

const columns: Array<TableColumns<PaymentsList>> = [
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
    maxWidth: 100,
  },
  {
    id: 'type',
    label: '분류',
    maxWidth: 150,
  },
  {
    id: 'increased',
    label: '금액',
    maxWidth: 150,
    isSort: true,
  },
  {
    id: 'memo',
    label: '지급사유',
    maxWidth: 150,
  },
  {
    id: 'device',
    label: '가입기종',
    maxWidth: 150,
  },
  {
    id: 'referrer_path',
    label: '유입경로',
    maxWidth: 150,
  },
  {
    id: 'created_at',
    label: '충전일시',
    maxWidth: 150,
  },
];
