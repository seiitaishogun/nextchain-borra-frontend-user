interface SurveyChildrenDataT {
  name: string;
  order: number;
}

interface SurveyDataT {
  name: string;
  order: number;
  children: SurveyChildrenDataT[];
}

export type { SurveyDataT, SurveyChildrenDataT };
