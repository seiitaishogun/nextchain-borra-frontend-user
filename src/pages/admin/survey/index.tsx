import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import AdminLayout from '@/components/Admin/Layout';
import Table from '@/components/Admin/Common/Table';
import Search from '@/components/Admin/Survey/Search';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchSurveyList } from '@/api/admin/survey';
import useListData from '@/hooks/admin/useListData';
import { SurveyListResponse } from '@/types/admin/survey';
import { SurveyListDataT } from '@/types/admin/survey/list';
import { searchRequest, searchFiltersState } from '@/store/admin/survey/search';
import { columns } from '@/constants/admin/survey/list';

function AdminSurvey() {
  const searchFilters = useRecoilValue(searchRequest);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    ['adminSurveys', { page, ...searchFilters }],
    () =>
      fetchSurveyList({
        page: Number(page),
        ...searchFilters,
      }),
    {
      initialData: {} as SurveyListResponse,
      select: res => res.data,
    }
  );

  const { list, paginate } = useListData<SurveyListDataT>(data);

  useEffect(
    () => () => {
      resetSearchFilters();
    },
    []
  );

  return (
    <PageLayout>
      <h1>설문 데이터 조회</h1>

      <Search setPage={setPage} />

      <Table<SurveyListDataT>
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

AdminSurvey.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminSurvey;
