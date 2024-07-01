import React, { ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import AdminLayout from '@/components/Admin/Layout';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import { PageLayout, Util } from '@/styles/Admin/PageLayout.styled';
import useListData from '@/hooks/admin/useListData';
import { CouponList } from '@/types/admin/coupon';
import { fetchCoupons } from '@/api/admin/coupons';
import { numberWithCommas } from '@/utils/number';
import { coinWithCommas } from '@/utils/coin';

function Coupons() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(['adminCoupons', { page }], () =>
    fetchCoupons({
      page: Number(page),
    })
  );

  const {
    list,
    counts: { total_count },
    paginate,
  } = useListData<CouponList>(data?.data);

  return (
    <PageLayout>
      <h1>쿠폰 조회</h1>
      <Util>
        <span>전체 {total_count}개</span>
      </Util>

      <Table<CouponList>
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

Coupons.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Coupons;

const columns: Array<TableColumns<CouponList>> = [
  {
    id: 'name',
    label: '쿠폰 제목',
    maxWidth: 150,
    isSort: true,
    format: row => <Link href={`/admin/coupons/${row.id}`}>{row.name}</Link>,
  },
  {
    id: 'price',
    label: '금액(원)',
    maxWidth: 100,
    isSort: true,
    format: ({ price }) => (
      <>
        {numberWithCommas(price)}원 / {coinWithCommas(price)}코인
      </>
    ),
  },
  {
    id: 'used_count',
    label: '누적 사용 횟수',
  },
  {
    id: 'created_at',
    label: '등록일',
    maxWidth: 150,
  },
];
