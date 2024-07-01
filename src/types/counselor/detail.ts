import { CounselorStateT } from '@/types/counselor';

interface CounselorDetailT {
  id: number;
  c_id: number;
  m_id: number;
  name: string;
  summary: string;
  content: string;
  image: string;
  thumbnail: string | null;
  banner: string | null;
  state: CounselorStateT;
  part: string;
  profile: string;
  is_free: 0 | 1;
  is_sinjeom: 0 | 1;
  is_tarot: 0 | 1;
  is_yeoghag: 0 | 1;
  view_count: number;
  like_count: number;
}

interface CounselorRequest {
  counselor_id: number;
}

interface CounselorResponse {
  data: CounselorDetailT;
}

export type { CounselorDetailT, CounselorRequest, CounselorResponse };
