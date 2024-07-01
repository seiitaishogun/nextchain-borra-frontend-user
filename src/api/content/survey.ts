import { instance } from '@/utils/axios';
import {
  ContentSurveyRequest,
  ContentSurveyResponse,
} from '@/types/content/survey';

const fetchContentSurvey = async ({ content_id }: ContentSurveyRequest) => {
  const { data } = await instance.get<ContentSurveyResponse>(
    `/contents/${content_id}/survey`
  );
  return data;
};

export { fetchContentSurvey };
