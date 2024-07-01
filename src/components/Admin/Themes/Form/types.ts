import { ThemeT } from '@/types/admin/contents/contents';

interface ThemeFormT extends ThemeT {
  file?: {
    id: number;
    name: string;
    path: string;
  };
}

export type { ThemeFormT };
