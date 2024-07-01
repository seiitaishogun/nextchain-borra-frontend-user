interface PaymentsList {
  id: number;
  email: string;
  name: string;
  type: string;
  increased: string;
  platform: string | null;
  device: string;
  referrer_path: string;
  created_at: string;
  user_id: number;
}

export type { PaymentsList };
