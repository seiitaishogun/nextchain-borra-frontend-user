import React, { ReactElement } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Form from '@/components/Admin/Banner/Form';
import AdminLayout from '@/components/Admin/Layout';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchBannerDetail, fetchBannerUpdate } from '@/api/admin/main/banner';
import { getOriginDateToSplit } from '@/utils/date';

function BannerUpdate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = Number(router.query?.id || 0);
  const { data, isSuccess } = useQuery(
    ['adminBannerDetail', id],
    () => fetchBannerDetail(id),
    {
      enabled: router.isReady,
      select: res => {
        const { is_open, started_at, ended_at, ...result } = res.data;

        return {
          ...result,
          is_open: !!is_open,
          started_at: getOriginDateToSplit(started_at),
          ended_at: getOriginDateToSplit(ended_at),
        };
      },
      onError: () => {
        alert('오류가 발생했습니다.');
        router.push('/admin/banners');
      },
    }
  );

  const updateMutation = useMutation(
    (params: any) =>
      fetchBannerUpdate({
        id,
        ...params,
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['adminBannerDetail', id]);
      },
    }
  );

  return (
    <PageLayout>
      <h1>배너 수정</h1>
      {isSuccess && <Form data={data} formMutation={updateMutation} />}
    </PageLayout>
  );
}

BannerUpdate.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default BannerUpdate;
