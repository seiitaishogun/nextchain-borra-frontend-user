import React, { ReactElement } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Admin/Layout';
import Form from '@/components/Admin/Advertises/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import {
  fetchAdvertisesDetail,
  fetchAdvertisesUpdate,
} from '@/api/admin/advertises';

function AdUpdate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = Number(router.query?.id || 0);
  const { data, isSuccess } = useQuery(
    ['advertises', id],
    () => fetchAdvertisesDetail(id),
    {
      enabled: router.isReady,
      select: res => res.data,
      onError: () => {
        alert('오류가 발생했습니다.');
        router.push('/admin/advertises');
      },
    }
  );
  const updateMutation = useMutation(
    (params: any) =>
      fetchAdvertisesUpdate({
        id,
        ...params,
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['adminAdvertisesDetail', id]);
      },
    }
  );

  return (
    <PageLayout>
      <h1>광고 제휴 수정</h1>
      {isSuccess && <Form data={data} formMutation={updateMutation} />}
    </PageLayout>
  );
}

AdUpdate.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdUpdate;
