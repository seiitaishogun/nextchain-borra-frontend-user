import { Platform, ReferrerPathE as ReferrerPathEnum } from '@/types/users';

const enum SearchType {
  Email = 'email',
  Name = 'name',
  ReferrerPath = 'referrer_path',
}

const enum PaymentType {
  Payment = 'payment',
  Event = 'event',
}

interface PaymentT {
  id: number;
  user_id: number;
  email: string;
  name: string;
  type: string;
  price: number;
  device: string;
  platform: Platform;
  referrer_path: ReferrerPathEnum;
  created_at: Date;
}

export { SearchType, PaymentType };
export type { PaymentT };
