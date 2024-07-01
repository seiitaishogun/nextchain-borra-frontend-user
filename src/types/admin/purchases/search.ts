import { OrderDirectionE } from '@/components/Admin/Common/Table/types';
import { GenderE, MaritalE, ReferrerPathE, RegisterPathE } from '@/types/users';

const enum SearchTypeE {
  User = 'user_name',
  Email = 'user_email',
  Content = 'content',
  Theme = 'theme',
}

const enum OrderColumnE {
  Decreased = 'decreased',
}

interface SearchFilters {
  search_type: SearchTypeE;
  search_value: string;
  started_at: Date | null;
  ended_at: Date;
  min_age: number | null;
  max_age: number | null;
  min_coin: number | null;
  max_coin: number | null;
  gender: {
    [key: number]: boolean;
  };
  marital: {
    [key: string]: boolean;
  };
  types: {
    [key: number]: boolean;
  };
  tags: {
    [key: number]: boolean;
  };
  register_path: {
    [key: string]: boolean;
  };
  referrer_path: {
    [key: string]: boolean;
  };
  order_column: OrderColumnE | null;
  order_direction: OrderDirectionE | null;
}

interface SearchRequest {
  search_type: SearchTypeE;
  search_value: string | null;
  started_at: string | null;
  ended_at: string | null;
  min_age: number | null;
  max_age: number | null;
  min_coin: number | null;
  max_coin: number | null;
  gender: Array<GenderE> | null;
  marital: Array<MaritalE> | null;
  types: Array<number> | null;
  tags: Array<number> | null;
  register_path: Array<RegisterPathE> | null;
  referrer_path: Array<ReferrerPathE> | null;
  order_column: OrderColumnE;
  order_direction: OrderDirectionE;
}

export { SearchTypeE };
export type { SearchFilters, SearchRequest };
