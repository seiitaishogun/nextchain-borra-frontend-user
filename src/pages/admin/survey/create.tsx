import React, { ReactElement } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Admin/Layout';
import SurveyCreateForm from '@/components/Admin/Survey/Create/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchSurveyCreate } from '@/api/admin/survey';
import withSurveyForm from '@/hoc/admin/survey/withSurveyForm';
import {
  SurveyCreateRequest,
  SurveyCreateResponse,
} from '@/types/admin/survey';
import { createSchema } from '@/constants/admin/survey/form';

const CreateFormComponent = withSurveyForm(SurveyCreateForm);

function AdminSurveyCreate() {
  const router = useRouter();
  const createMutate = useMutation(fetchSurveyCreate, {
    onSuccess: ({ id, message }) => {
      alert(message);
      router.push(`/admin/survey/${id}`);
    },
  });

  return (
    <PageLayout>
      <h1>설문 데이터 신규 등록</h1>

      <CreateFormComponent<SurveyCreateRequest, SurveyCreateResponse>
        schema={createSchema}
        formMutation={createMutate}
        defaultValues={{
          name: '',
          total_count: 0,
          data: [],
        }}
        confirmText="등록 하시겠습니까?"
      />
    </PageLayout>
  );
}

export default AdminSurveyCreate;

AdminSurveyCreate.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
