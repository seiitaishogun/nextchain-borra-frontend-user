import React, { ReactElement } from 'react';
import { useMutation } from '@tanstack/react-query';
import AdminLayout from '@/components/Admin/Layout';
import Form from '@/components/Admin/Banner/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchBannerCreate } from '@/api/admin/main/banner';

function BannerCreate() {
  const createMutation = useMutation(fetchBannerCreate);
  return (
    <PageLayout>
      <h1>배너 등록</h1>
      <Form formMutation={createMutation} />
    </PageLayout>
  );
}

BannerCreate.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default BannerCreate;
