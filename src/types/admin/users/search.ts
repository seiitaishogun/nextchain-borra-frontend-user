import { OrderDirectionE } from '@/components/Admin/Common/Table/types';
import { GenderE, MaritalE, ReferrerPathE, RegisterPathE } from '@/types/users';

const enum SearchTypeE {
  Name = 'name',
  Phone = 'phone',
  Email = 'email',
  Adid = 'ad_id',
  ReferrerPath = 'referrer_path',
}

const enum DateTypeE {
  CreatedAt = 'created_at',
  UpdatedAt = 'updated_at',
}

/**
 * @description 가입/휴먼/탈퇴
 */
const enum StatusE {
  Active = 'active',
  Inactive = 'inactive',
  Deleted = 'deleted',
}

const enum OrderColumn {
  Email = 'email',
  Name = 'name',
  Gender = 'gender',
  BirthedAt = 'birthed_at',
  Phone = 'phone',
  RegisterPath = 'register_path',
  ReferrerPath = 'referrer_path',
  IsNotify = 'is_notify',
  Marital = 'marital',
  TotalPayment = 'total_payment',
  Coin = 'coin',
  Tags = 'tags',
}

interface SearchFilters {
  search_type: SearchTypeE;
  search_value: string;
  date_type: DateTypeE;
  started_at: Date | null;
  ended_at: Date;
  min_payment: number | null;
  max_payment: number | null;
  min_age: number | null;
  max_age: number | null;
  min_coin: number | null;
  max_coin: number | null;
  min_recommender: number | null;
  max_recommender: number | null;
  gender: {
    [key: number]: boolean;
  };
  marital: {
    [key: string]: boolean;
  };
  register_path: {
    [key: string]: boolean;
  };
  is_notify: {
    [key: number]: boolean;
  };
  is_mail: {
    [key: number]: boolean;
  };
  is_kakao: {
    [key: number]: boolean;
  };
  referrer_path: {
    [key: string]: boolean;
  };
  tags: {
    [key: number]: boolean;
  };
  status: {
    [key: string]: boolean;
  };
  order_column: OrderColumn | null;
  order_direction: OrderDirectionE | null;
}

interface SearchRequest {
  search_type: SearchTypeE;
  search_value: string | null;
  date_type: DateTypeE;
  started_at: string | null;
  ended_at: string | null;
  min_payment: number | null;
  max_payment: number | null;
  min_age: number | null;
  max_age: number | null;
  min_coin: number | null;
  max_coin: number | null;
  min_recommender: number | null;
  max_recommender: number | null;
  gender: Array<GenderE> | null;
  marital: Array<MaritalE> | null;
  register_path: Array<RegisterPathE> | null;
  is_notify: Array<0 | 1> | null;
  is_mail: Array<0 | 1> | null;
  is_kakao: Array<0 | 1> | null;
  referrer_path: Array<ReferrerPathE> | null;
  tags: Array<number> | null;
  status: Array<StatusE> | null;
  order_column: OrderColumn | null;
  order_direction: OrderDirectionE | null;
}

export { SearchTypeE, DateTypeE, StatusE, OrderColumn };
export type { SearchFilters, SearchRequest };
