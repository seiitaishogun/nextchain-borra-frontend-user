import { instance } from '@/utils/axios';
import { CounselorRequest, CounselorResponse } from '@/types/counselor/detail';

const fetchCounselor = async ({ counselor_id }: CounselorRequest) => {
  const { data } = await instance.get<CounselorResponse>(
    `/counselors/${counselor_id}`
  );
  return data;
};

export { fetchCounselor };
