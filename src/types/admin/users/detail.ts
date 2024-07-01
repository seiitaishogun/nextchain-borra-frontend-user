interface UserDetail {
  id: number;
  name: string;
  email: string;
  calendar: string;
  birthed_at: string;
  phone: string;
  ad_id: string;
  marital: string;
  total_payment: string;
  coin: number;
  referrer_path: string;
  status: string;
  tags: {
    id: number;
    name: string;
    description: string;
  }[];
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  payment_at: string;
  is_mail: boolean;
  is_notify: boolean;
  is_kakao: boolean;
  recommender: string;
  recommender_count: string;
  is_admin: boolean;
}

export type { UserDetail };
