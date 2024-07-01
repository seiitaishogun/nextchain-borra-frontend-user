import { ContentsT, ParentT } from '@/types/admin/contents/contents';

interface ContentsFormT
  extends Omit<
    ContentsT,
    | 'id'
    | 'is_discount'
    | 'created_at'
    | 'parents'
    | 'children'
    | 'thumbnail'
    | 'thumbnail_large'
    | 'banner'
    | 'banner_text'
  > {
  id?: number;
  banner_id?: number | null;
  banner_text_id?: number | null;
  thumbnail_id?: number | null;
  thumbnail_large_id?: number | null;
  data: Array<ParentT>;
  is_discount?: number;
  created_at?: string;
  parents?: Array<any>;
  children?: Array<any>;
  banner?: any;
  banner_text?: any;
  thumbnail?: any;
  thumbnail_large?: any;
  wait_free_time?: number | null;
  is_wait_free_time?: number;
  is_first_free?: number | null;
  available_time?: number;
  advertise_code?: string;
  survey: {
    id: number;
    name: string;
  } | null;
}

export type { ContentsFormT };
