import { AdminListT } from '@/types/admin/list';

interface CounselorListDataT {
  id: number;
  c_id: number;
  name: string;
}

type CounselorListT = AdminListT<CounselorListDataT>;

export type { CounselorListT, CounselorListDataT };
