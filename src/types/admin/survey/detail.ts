interface SurveyT {
  survey: {
    id: number;
    name: string;
    total_count: number;
  };
  survey_data: {
    id: number;
    name: string;
    order: number;
    children: {
      id: number;
      parent_id: number;
      name: string;
      order: number;
    }[];
  }[];
}

export type { SurveyT };
