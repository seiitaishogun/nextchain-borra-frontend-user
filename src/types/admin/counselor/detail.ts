import { FileT } from '@/types/admin/common/file';

interface CounselorT {
  id: number;
  c_id: number;
  name: string;
  thumbnail: FileT | null;
  thumbnail_id: number | null;
  banner: FileT | null;
  banner_id: number | null;
}

export type { CounselorT };
