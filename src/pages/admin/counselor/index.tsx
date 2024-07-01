import React, { ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Table from '@/components/Admin/Common/Table';
import AdminLayout from '@/components/Admin/Layout';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import useListData from '@/hooks/admin/useListData';
import { fetchCounselorList } from '@/api/admin/counselor';
import { CounselorListResponse } from '@/types/admin/counselor';
import { CounselorListDataT } from '@/types/admin/counselor/list';
import { columns } from '@/constants/admin/counselor/list';

function AdminCounselor() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    ['adminCounselors', { page }],
    () =>
      fetchCounselorList({
        page: Number(page),
      }),
    {
      initialData: {} as CounselorListResponse,
      select: res => res.data,
    }
  );
  const { list, paginate } = useListData<CounselorListDataT>(data);

  return (
    <PageLayout>
      <h1>상담사 조회</h1>

      <Table<CounselorListDataT>
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

AdminCounselor.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminCounselor;
