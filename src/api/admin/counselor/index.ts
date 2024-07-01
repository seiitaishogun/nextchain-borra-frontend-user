import { adminInstance } from '@/utils/axios';
import {
  CounselorListRequest,
  CounselorListResponse,
  CounselorRequest,
  CounselorResponse,
  CounselorUpdateRequest,
  CounselorUpdateResponse,
} from '@/types/admin/counselor';

const fetchCounselor = async ({ counselor_id }: CounselorRequest) => {
  const { data } = await adminInstance.get<CounselorResponse>(
    `/counselors/${counselor_id}`
  );
  return data;
};

const fetchCounselorList = async (params: CounselorListRequest) => {
  const { data } = await adminInstance.get<CounselorListResponse>(
    '/counselors',
    {
      params,
    }
  );
  return data;
};

const fetchCounselorUpdate = async ({
  counselor_id,
  ...params
}: CounselorUpdateRequest) => {
  const { data } = await adminInstance.put<CounselorUpdateResponse>(
    `/counselors/${counselor_id}`,
    params
  );
  return data;
};

export { fetchCounselor, fetchCounselorList, fetchCounselorUpdate };
