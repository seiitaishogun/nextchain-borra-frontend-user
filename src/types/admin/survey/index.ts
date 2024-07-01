import { SurveyDataT } from '@/types/admin/survey/form';
import { SurveyT } from '@/types/admin/survey/detail';
import { SurveyListT } from '@/types/admin/survey/list';

interface SurveyRequest {
  survey_id: string;
}

interface SurveyResponse {
  data: SurveyT;
}

interface SurveyListRequest {
  page: number;
  count?: number;
  name?: string | null;
  started_at?: string | null;
  ended_at?: string | null;
}

interface SurveyListResponse {
  data: SurveyListT;
}

interface SurveyCreateRequest {
  name: string;
  total_count: number;
  data: SurveyDataT[];
}

interface SurveyCreateResponse {
  id: number;
  message: string;
}

interface SurveyUpdateRequest {
  survey_id: number;
  name: string;
  data: {
    name: string;
    order: number;
    children: {
      name: string;
      order: number;
    }[];
  }[];
}

interface SurveyUpdateResponse {
  message: string;
}

export type {
  SurveyRequest,
  SurveyResponse,
  SurveyListRequest,
  SurveyListResponse,
  SurveyCreateRequest,
  SurveyCreateResponse,
  SurveyUpdateRequest,
  SurveyUpdateResponse,
};
