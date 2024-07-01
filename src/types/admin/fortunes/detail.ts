import { ConditionsT, ContentT, StatusE } from '@/types/admin/fortunes';

interface ExcelT {
  id: number;
  name: string;
  path: string;
}

interface DetailT {
  condition1: ConditionsT;
  condition2: ConditionsT;
  condition3: ConditionsT;
  condition4: ConditionsT;
  contents?: Array<ContentT> | [];
  id: number | null;
  status: StatusE;
  name: string;
  template: {
    id: number;
    name: string;
    description: string;
  };
  type: {
    id: number;
    name: string;
    description: string;
  };
  is_open?: boolean;
  excel: ExcelT;
}

export type { DetailT };
