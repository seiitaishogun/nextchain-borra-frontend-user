interface FeedbackT {
  id: number;
  name: string;
  count: number;
}

interface FeedbackShowRequest {
  content_id: number;
  purchase_id?: number;
}

interface FeedbackShowResponse {
  data: {
    feedback: FeedbackT[];
    status: 1 | 2 | 3 | null;
  };
}

interface FeedbackStoreRequest {
  content_id: number;
  purchase_id: number;
  feedback_id: number;
}

interface FeedbackStoreResponse {
  data: {
    id: number;
    content_id: number;
    purchase_id: number;
    feedback_id: number;
    price: number;
    message: string;
  };
}

interface FeedbackStoreErrorResponse {
  data: {
    message: string;
  };
}

export type {
  FeedbackT,
  FeedbackShowRequest,
  FeedbackShowResponse,
  FeedbackStoreRequest,
  FeedbackStoreResponse,
  FeedbackStoreErrorResponse,
};
