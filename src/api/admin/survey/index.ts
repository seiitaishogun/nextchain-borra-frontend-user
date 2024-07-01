import {
  SurveyCreateRequest,
  SurveyCreateResponse,
  SurveyListRequest,
  SurveyListResponse,
  SurveyRequest,
  SurveyResponse,
  SurveyUpdateRequest,
  SurveyUpdateResponse,
} from '@/types/admin/survey';
import { adminInstance } from '@/utils/axios';

const fetchSurvey = async ({ survey_id }: SurveyRequest) => {
  const { data } = await adminInstance.get<SurveyResponse>(
    `/surveys/${survey_id}`
  );
  return data;
};

const fetchSurveyList = async ({ count, ...params }: SurveyListRequest) => {
  const { data } = await adminInstance.get<SurveyListResponse>('/surveys', {
    params: {
      count: count || 10,
      ...params,
    },
  });
  return data;
};

const fetchSurveyCreate = async (params: SurveyCreateRequest) => {
  const { data } = await adminInstance.post<SurveyCreateResponse>(
    '/surveys',
    params
  );
  return data;
};

const fetchSurveyUpdate = async ({
  survey_id,
  ...params
}: SurveyUpdateRequest) => {
  const { data } = await adminInstance.put<SurveyUpdateResponse>(
    `/surveys/${survey_id}`,
    params
  );
  return data;
};

export { fetchSurvey, fetchSurveyList, fetchSurveyCreate, fetchSurveyUpdate };
