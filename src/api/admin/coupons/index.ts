import { adminInstance } from '@/utils/axios';

interface Props {
  page: number;
}

/**
 * 쿠폰 조회 api
 */
const fetchCoupons = async (params: Props) => {
  const { data } = await adminInstance.get('/coupons', {
    params,
  });
  return data;
};

/**
 * 쿠폰 상세 api
 */
const fetchCouponDetail = async (id: number) => {
  const { data } = await adminInstance.get(`/coupons/${id}`);
  return data;
};

/**
 * 쿠폰 등록 api
 */

interface CreateProps {
  name: string;
  content_id: number | null;
  price: number;
  url: string | null;
  code: string | null;
  started_at: string | null;
  ended_at: string | null;
}

const fetchCouponCreate = async (params: CreateProps) => {
  const { data } = await adminInstance.post('/coupons', params);
  return data;
};

/**
 * 쿠폰 수정 api
 */

interface UpdateProps {
  id: string;
  name: string;
  content_id: number | null;
  url: string | null;
  started_at: string | null;
  ended_at: string | null;
}

const fetchCouponUpdate = async ({ id, ...params }: UpdateProps) => {
  const { data } = await adminInstance.put(`/coupons/${id}`, params);
  return data;
};

/**
 * 쿠폰 삭제 api
 */
const fetchCouponDelete = async (id: number) => {
  const { data } = await adminInstance.delete(`/coupons/${id}`);
  return data;
};

export {
  fetchCoupons,
  fetchCouponDetail,
  fetchCouponCreate,
  fetchCouponUpdate,
  fetchCouponDelete,
};

export type { CreateProps };
