import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Form from '@/components/Admin/Fortunes/Form';
import AdminLayout from '@/components/Admin/Layout';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchFortunesDetail, fetchFortunesUpdate } from '@/api/admin/fortunes';

const Layout = styled(PageLayout)`
  .groupContent > div {
    margin-right: 10px;
  }
`;

function Detail() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery(
    ['adminFortuneDetail', id],
    () => fetchFortunesDetail(id),
    {
      enabled: !!id,
    }
  );

  const updateMutation = useMutation(
    (params: any) =>
      fetchFortunesUpdate({
        id,
        ...params,
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['adminFortuneDetail', id]);
      },
    }
  );

  return (
    <Layout>
      <h1>운세 풀이 데이터 수정</h1>
      {!isLoading && (
        <Form data={data?.data.fortune} formMutation={updateMutation} />
      )}

      <Table
        page={1}
        columns={columns}
        rows={data?.data.fortune_data || []}
        isLoading={isLoading}
        isPagination={false}
      />
    </Layout>
  );
}

export default Detail;

Detail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

const columns: Array<TableColumns<any>> = [
  { id: 'value1', label: 'value1', maxWidth: 60 },
  { id: 'value2', label: 'value2', maxWidth: 60 },
  { id: 'value3', label: 'value3', maxWidth: 60 },
  { id: 'value4', label: 'value4', maxWidth: 60 },
  { id: 'name', label: '제목 (요약)', maxWidth: 300 },
  {
    id: 'contents',
    label: '내용 (풀이)',
    maxWidth: 300,
  },
];
