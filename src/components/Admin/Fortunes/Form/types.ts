import { StatusE } from '@/types/admin/fortunes';
import { DetailT } from '@/types/admin/fortunes/detail';

interface UpdateFormT extends DetailT {
  type_id: number;
  excel: any;
  excel_id: any;
}

interface CreateFormT {
  template_id: number | '';
  type_id: number | '';
  status: StatusE | '';
  is_open: boolean;
  condition1: number;
  condition2: number;
  condition3: number;
  condition4: number;
  name: string;
  excel?: string;
  excel_id?: number;
  excel_name?: string;
}

export type { UpdateFormT, CreateFormT };
