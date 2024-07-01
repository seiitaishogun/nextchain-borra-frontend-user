import React, { ReactElement } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Admin/Layout';
import Form from '@/components/Admin/Posts/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchPostDetail, fetchPostUpdate } from '@/api/admin/posts';

function Detail() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading } = useQuery(
    ['adminPostDetail', id],
    () => fetchPostDetail(id),
    {
      enabled: !!id,
    }
  );

  const updateMutation = useMutation(
    (params: any) =>
      fetchPostUpdate({
        ...params,
        id,
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['adminPostDetail', id]);
      },
    }
  );

  return (
    <PageLayout>
      <h1>게시글 수정</h1>
      {!isLoading && <Form data={data?.data} formMutation={updateMutation} />}
    </PageLayout>
  );
}

export default Detail;

Detail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
