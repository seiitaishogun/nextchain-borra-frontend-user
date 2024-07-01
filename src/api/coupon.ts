import { instance } from '@/utils/axios';

interface CouponProps {
  code: string;
}

/**
 * 쿠폰 적립 api
 */
const fetchCouponCreate = async (params: CouponProps) => {
  const { data } = await instance.post('/coupon', params);
  return data;
};

export { fetchCouponCreate };
export type { CouponProps };
