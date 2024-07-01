import { instance } from '@/utils/axios';
import {
  FeedbackShowRequest,
  FeedbackShowResponse,
  FeedbackStoreRequest,
  FeedbackStoreResponse,
} from '@/types/content/feedback';

const fetchFeedbacks = async ({
  content_id,
  ...params
}: FeedbackShowRequest) => {
  const { data } = await instance.get<FeedbackShowResponse>(
    `/contents/${content_id}/feedback`,
    {
      params,
    }
  );
  return data;
};

const fetchFeedbackStore = async ({
  content_id,
  ...params
}: FeedbackStoreRequest) => {
  const { data } = await instance.post<FeedbackStoreResponse>(
    `/contents/${content_id}/feedback`,
    params
  );
  return data;
};

export { fetchFeedbacks, fetchFeedbackStore };
