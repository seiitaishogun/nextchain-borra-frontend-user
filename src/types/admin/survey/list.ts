import { AdminListT } from '@/types/admin/list';

interface SurveySearchFilters {
  name: string;
  started_at: Date | null;
  ended_at: Date | null;
}

interface SurveyListDataT {
  id: number;
  name: string;
  content_id: string | null;
  content_name: string | null;
  total_count: number;
}

type SurveyListT = AdminListT<SurveyListDataT>;

export type { SurveySearchFilters, SurveyListT, SurveyListDataT };
