import { CounselorStateT } from '@/types/counselor/index';

interface CounselorListT {
  id: number;
  c_id: number;
  name: string;
  summary: string;
  thumbnail: string | null;
  image: string;
  state: CounselorStateT;
  like_count: number;
  view_count: number;
  is_free: 0 | 1;
}

interface CounselorListResponse {
  data: CounselorListT[];
}

export type { CounselorListT, CounselorListResponse };
