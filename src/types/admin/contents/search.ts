import { OrderDirectionE } from '@/components/Admin/Common/Table/types';
import { CountType, SearchType } from '@/types/admin/contents/contents';

interface SearchFilters {
  search_type: SearchType;
  search_value: string;
  started_at: Date | null;
  ended_at: Date;
  min_price: number | null;
  max_price: number | null;
  count_type: CountType;
  count_min_value: number | null;
  count_max_value: number | null;
  is_open: {
    [key: number]: boolean;
  };
  is_new: boolean;
  is_hot: boolean;
  is_discount: boolean;
  category_id: number | '';
  type_id: number | '';
  tag_id: number | '';
  order_column: null;
  order_direction: OrderDirectionE | null;
}

interface SearchRequest {
  search_type: SearchType;
  search_value: string | null;
  started_at: string | null;
  ended_at: string | null;
  min_price: number | null;
  max_price: number | null;
  count_type: CountType;
  count_min_value: number | null;
  count_max_value: number | null;
  is_open: 0 | 1 | null;
  is_new: 0 | 1 | null;
  is_hot: 0 | 1 | null;
  is_discount: 0 | 1 | null;
  category_id: number | null;
  type_id: number | null;
  tag_id: number | null;
  order_column: string | null;
  order_direction: OrderDirectionE | null;
}

export type { SearchFilters, SearchRequest };
