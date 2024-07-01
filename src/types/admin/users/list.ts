interface UsersList {
  id: number;
  email: string;
  name: string;
  gender: string;
  birthed_at: string;
  age: number;
  phone: string;
  register_path: string;
  is_notify: string;
  is_kakao: string;
  marital: string;
  total_payment: string;
  coin: string;
  tags: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  recommender_count: number | string;
  ad_id: string;
  status: string;
  is_admin: boolean;
}

export type { UsersList };
