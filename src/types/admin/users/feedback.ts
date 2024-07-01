interface UserFeedbackShowRequest {
  page: number;
  user_id: number;
}

interface FeedbackListItem {
  id: number;
  content_name: string;
  feedback_name: string;
  created_at: string;
}

interface UserFeedbackShowResponse {
  data: {
    counts: null;
    list: FeedbackListItem[];
    paginate: number;
  };
}

export type {
  UserFeedbackShowRequest,
  UserFeedbackShowResponse,
  FeedbackListItem,
};
