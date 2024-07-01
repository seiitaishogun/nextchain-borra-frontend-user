const enum GenderE {
  Male = 0,
  Female = 1,
}

const enum MaritalE {
  Single = 'single',
  Couple = 'couple',
  Married = 'married',
}

/**
 * @description 양력/음력/윤달
 */
const enum CalendarE {
  Solar = 'solar',
  Lunar = 'lunar',
  Leap = 'leap',
}

/**
 * @description 가입 경로
 */
const enum RegisterPathE {
  Mobile = 'mobile',
  Web = 'web',
}

/**
 * @description 유입 경로
 */
const enum ReferrerPathE {
  BORRA = 'borra',
  Pincrux = 'pincrux',
  Nbt = 'nbt',
}

const enum Platform {
  Android = 'aos',
  Ios = 'ios',
}

// TODO: 유저단 작업시 공통 타입 제외하고 분리
interface RegisterProps<T = void> {
  email: string;
  name: string;
  gender: GenderE | T;
  marital: MaritalE | T;
  birthed_at: string | T;
  calendar: CalendarE | T;
  is_notify: boolean;
  is_mail: boolean;
  is_kakao: boolean;
  tags?: string[];
  recommender?: string;
  register_path: RegisterPathE | null;
  referrer_path: ReferrerPathE | null;
  is_birthed_time: boolean;
}

interface UserT<T = void> {
  id: number;
  email: string;
  name: string;
  old_id: number | null;
  grade_id: number | null;
  phone: string | null;
  daejeongsu: number | null;
  coin: number | null;
  provider: string | null;
  provider_id: string | null;
  provider_name: string | null;
  ad_id: string | null;
  register_path: RegisterPathE | null;
  referrer_path: ReferrerPathE | null;
  is_notify: boolean;
  is_mail: boolean;
  is_kakao: boolean;
  is_admin: boolean;
  is_agree: boolean;
  refresh_token: string | null;
  remember_token: string | null;
  payment_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  deleted_reason: string | null; // TODO: 사유 추가시 개선
  tags: Array<{ id: number; name: string }>;
  gender: GenderE | T;
  marital: MaritalE | T;
  birthed_at: string | T;
  calendar: CalendarE | T;
  recommender?: string;
  recommender_count: number | string;
  total_payment: number;
  status: string | number;
  is_birthed_time: boolean;
}

interface RecommendersT {
  id: number;
  email: string;
  name: string;
  status: string;
  created_at: Date | null;
}

export { GenderE, CalendarE, MaritalE, RegisterPathE, ReferrerPathE, Platform };
export type { RegisterProps, UserT, RecommendersT };
