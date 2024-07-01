import React, { ReactElement } from 'react';
import { useMutation } from '@tanstack/react-query';
import AdminLayout from '@/components/Admin/Layout';
import Form from '@/components/Admin/Posts/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchPostCreate } from '@/api/admin/posts';

function Create() {
  const createMutation = useMutation(fetchPostCreate);
  return (
    <PageLayout>
      <h1>게시글 등록</h1>

      <Form formMutation={createMutation} />
    </PageLayout>
  );
}

export default Create;

Create.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
