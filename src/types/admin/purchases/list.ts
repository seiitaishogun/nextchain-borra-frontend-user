interface PurchasesList {
  id: number;
  email: string;
  name: string;
  gender: string;
  type: string;
  content_name: string;
  payment: string;
  price: string;
  device: string;
  referrer_path: string;
  created_at: string;
  user: {
    id: number;
  };
  user_id?: number;
}

export type { PurchasesList };
