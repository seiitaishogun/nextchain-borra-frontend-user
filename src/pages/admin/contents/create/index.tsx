import React, { ReactElement } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Admin/Layout';
import Form from '@/components/Admin/Contents/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchContentsCreate } from '@/api/admin/contents';

function Create() {
  const router = useRouter();
  const isAdvertise = router.query.site === 'advertise';
  const formMutate = useMutation(fetchContentsCreate, {
    onSuccess: ({ message, content_id }) => {
      // alert(message);
      router.push(`/admin/contents/${content_id}`);
    },
    onError: () => {
      alert('오류');
    },
  });

  return (
    <PageLayout>
      <h1>{isAdvertise && '광고 제휴'} 콘텐츠 등록</h1>
      <Form isAdvertise={isAdvertise} formMutation={formMutate} />
    </PageLayout>
  );
}

export default Create;

Create.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
