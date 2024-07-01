import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Form from '@/components/Admin/Coupons/Form';
import AdminLayout from '@/components/Admin/Layout';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchCouponDetail, fetchCouponUpdate } from '@/api/admin/coupons';

function Detail() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const { data: detailData, isLoading } = useQuery(
    ['adminCouponDetail', id],
    () => fetchCouponDetail(Number(id)),
    {
      enabled: !!id,
      select: data => {
        const { data: detailContent } = data;
        const newData = {
          ...detailContent,
        };

        if (newData.started_at) {
          const [y, m, d] = newData.started_at
            .split(' ', 1)[0]
            .split('-')
            .map(Number);
          newData.started_at = new Date(y, m - 1, d);
        }

        if (newData.ended_at) {
          const [y, m, d] = newData.ended_at
            .split(' ', 1)[0]
            .split('-')
            .map(Number);
          newData.ended_at = new Date(y, m - 1, d);
        }

        return {
          ...data,
          data: newData,
        };
      },
    }
  );

  const updateMutation = useMutation(
    (params: any) =>
      fetchCouponUpdate({
        id,
        ...params,
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['adminCouponDetail', id]);
      },
    }
  );

  const detail = detailData?.data || '';

  return (
    <PageLayout>
      <h1>쿠폰 수정</h1>
      {!isLoading && <Form data={detail} formMutation={updateMutation} />}
    </PageLayout>
  );
}

export default Detail;

Detail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
