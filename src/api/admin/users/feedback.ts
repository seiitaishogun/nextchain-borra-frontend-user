import { adminInstance } from '@/utils/axios';
import {
  UserFeedbackShowRequest,
  UserFeedbackShowResponse,
} from '@/types/admin/users/feedback';

const fetchUserFeedbacks = async ({
  user_id,
  ...params
}: UserFeedbackShowRequest) => {
  const { data } = await adminInstance.get<UserFeedbackShowResponse>(
    `/users/${user_id}/feedbacks`,
    { params }
  );
  return data;
};

export { fetchUserFeedbacks };
