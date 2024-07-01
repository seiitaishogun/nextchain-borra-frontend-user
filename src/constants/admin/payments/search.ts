import { PaymentType, SearchType } from '@/types/admin/payments';

const SEARCH_TYPE_OPTIONS = [
  {
    label: '이메일',
    value: SearchType.Email,
  },
  {
    label: '회원명',
    value: SearchType.Name,
  },
  {
    label: '유입경로',
    value: SearchType.ReferrerPath,
  },
];

const PAYMENT_TYPE_OPTIONS = [
  { label: '결제', value: PaymentType.Payment },
  { label: '이벤트', value: PaymentType.Event },
];

export { SEARCH_TYPE_OPTIONS, PAYMENT_TYPE_OPTIONS };
