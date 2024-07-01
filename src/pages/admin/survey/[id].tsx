import React, { ReactElement } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/Admin/Layout';
import SurveyUpdateForm from '@/components/Admin/Survey/Update/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import withSurveyForm from '@/hoc/admin/survey/withSurveyForm';
import { fetchSurvey, fetchSurveyUpdate } from '@/api/admin/survey';
import { updateSchema } from '@/constants/admin/survey/form';
import {
  SurveyResponse,
  SurveyUpdateRequest,
  SurveyUpdateResponse,
} from '@/types/admin/survey';

const UpdateFormComponent = withSurveyForm(SurveyUpdateForm);

function AdminSurveyDetail() {
  const searchParams = useSearchParams();
  const survey_id = searchParams.get('id') || '';
  const { data, isSuccess, isFetched, isLoading } = useQuery(
    ['survey', survey_id],
    () =>
      fetchSurvey({
        survey_id,
      }),
    {
      enabled: !!survey_id,
      initialData: {
        data: {
          survey: {
            id: 0,
            name: '',
            total_count: 0,
          },
          survey_data: [],
        },
      } as SurveyResponse,
      select: res => res.data,
    }
  );
  const updateMutate = useMutation(
    (params: SurveyUpdateRequest) =>
      fetchSurveyUpdate({
        ...params,
        survey_id: Number(survey_id),
      }),
    {
      onSuccess: ({ message }) => {
        alert(message);
      },
    }
  );

  const defaultValues = {
    name: data.survey.name,
    total_count: data.survey.total_count,
    data: data.survey_data,
  };

  return (
    <PageLayout>
      <h1>설문 데이터 상세 조회</h1>

      {!isLoading && isSuccess && isFetched && (
        <UpdateFormComponent<SurveyUpdateRequest, SurveyUpdateResponse>
          data={data}
          defaultValues={defaultValues}
          schema={updateSchema}
          formMutation={updateMutate}
          confirmText="수정 하시겠습니까?"
        />
      )}
    </PageLayout>
  );
}

export default AdminSurveyDetail;

AdminSurveyDetail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
