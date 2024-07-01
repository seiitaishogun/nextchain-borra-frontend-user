interface CommonContentSurveyT {
  id: number;
  name: string;
  order: number;
}

interface ContentSurveyChildT extends CommonContentSurveyT {
  parent_id: number;
}

interface ContentSurveyT extends CommonContentSurveyT {
  children: ContentSurveyChildT[];
}

interface ContentSurveyRequest {
  content_id: number;
}

interface ContentSurveyResponse {
  data: ContentSurveyT[];
}

export type {
  ContentSurveyT,
  ContentSurveyChildT,
  ContentSurveyRequest,
  ContentSurveyResponse,
};
