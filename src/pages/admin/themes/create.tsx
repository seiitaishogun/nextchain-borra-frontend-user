import React, { ReactElement } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import AdminLayout from '@/components/Admin/Layout';
import Form from '@/components/Admin/Themes/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchThemesCreate } from '@/api/admin/themes';

function Create() {
  const formMutate = useMutation(fetchThemesCreate);

  return (
    <PageLayout>
      <Typography variant="h4" component="h1" mb={2}>
        테마 신규등록
      </Typography>
      <Form formMutation={formMutate} />
    </PageLayout>
  );
}

export default Create;

Create.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
