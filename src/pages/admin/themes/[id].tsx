import React, { ReactElement } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import AdminLayout from '@/components/Admin/Layout';
import Form from '@/components/Admin/Themes/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchThemesDetail, fetchThemesUpdate } from '@/api/admin/themes';

function Detail() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = router.query?.id;
  const { data, isLoading } = useQuery(
    ['adminThemesDetail', id],
    () => fetchThemesDetail(id),
    {
      enabled: !!id,
      select: ({ data: selectData }) => ({
        ...selectData,
        file_id: selectData.file?.id || null,
      }),
    }
  );

  const formMutate = useMutation(fetchThemesUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['adminThemesDetail', id]);
    },
  });

  return (
    <PageLayout>
      <Typography variant="h4" component="h1" mb={2}>
        테마 상세/수정
      </Typography>
      {!isLoading && <Form data={data} formMutation={formMutate} />}
    </PageLayout>
  );
}

export default Detail;

Detail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
