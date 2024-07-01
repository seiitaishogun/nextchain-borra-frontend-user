import { useMutation } from '@tanstack/react-query';
import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Admin/Layout';
import Form from '@/components/Admin/Coupons/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchCouponCreate } from '@/api/admin/coupons';

function Create() {
  const router = useRouter();
  const createMutation = useMutation(fetchCouponCreate, {
    onSuccess: ({ coupon_id }) => {
      router.push(`/admin/coupons/${coupon_id}`);
    },
  });
  return (
    <PageLayout>
      <h1>쿠폰 등록</h1>
      <Form formMutation={createMutation} />
    </PageLayout>
  );
}

export default Create;

Create.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
