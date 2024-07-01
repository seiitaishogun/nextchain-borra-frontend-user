/**
 * 쿠폰 리스트 데이터 타입
 */
interface CouponList {
  id: number;
  name: string;
  price: number;
  used_count: number;
  created_at: string;
}

/**
 * 쿠폰 등록폼 데이터 타입
 */
interface CouponFormData {
  name: string;
  content_id: number | null;
  price?: number;
  url: string;
  code?: string;
  started_at: Date | null;
  ended_at: Date | null;
}

/**
 * 쿠폰 상세 데이터 타입
 */
interface CouponDetailData {
  id: number;
  name: string;
  price: number;
  url: string;
  coupon_url: string;
  used_count: number;
  started_at: Date;
  ended_at: Date;
  created_at: string;
}

export type { CouponList, CouponFormData, CouponDetailData };
