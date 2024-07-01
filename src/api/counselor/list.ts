import { instance } from '@/utils/axios';
import { CounselorListResponse } from '@/types/counselor/list';

const fetchCounselors = async () => {
  const { data } = await instance.get<CounselorListResponse>('/counselors');
  return data;
};

export { fetchCounselors };
