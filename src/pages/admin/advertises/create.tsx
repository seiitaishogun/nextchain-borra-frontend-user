import React, { ReactElement } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Admin/Layout';
import Form from '@/components/Admin/Advertises/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchAdvertisesCreate } from '@/api/admin/advertises';

function AdCreate() {
  const router = useRouter();
  const createMutation = useMutation(fetchAdvertisesCreate, {
    onSuccess: ({ advertise_id }) => {
      router.push(`/admin/advertises/${advertise_id}`);
    },
  });

  return (
    <PageLayout>
      <h1>광고 제휴 등록</h1>
      <Form formMutation={createMutation} />
    </PageLayout>
  );
}

AdCreate.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdCreate;
