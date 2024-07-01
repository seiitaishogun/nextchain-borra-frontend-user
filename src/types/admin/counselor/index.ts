import { CounselorListT } from '@/types/admin/counselor/list';
import { CounselorT } from '@/types/admin/counselor/detail';

interface CounselorRequest {
  counselor_id: string;
}

interface CounselorResponse {
  data: CounselorT;
}

interface CounselorListRequest {
  page: number;
}

interface CounselorListResponse {
  data: CounselorListT;
}

interface CounselorUpdateRequest {
  counselor_id: number | string;
  thumbnail_id: number | null;
  banner_id: number | null;
}

interface CounselorUpdateResponse {
  id: number;
  message: string;
}

export type {
  CounselorRequest,
  CounselorResponse,
  CounselorListRequest,
  CounselorListResponse,
  CounselorUpdateRequest,
  CounselorUpdateResponse,
};
