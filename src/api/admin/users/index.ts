import { adminInstance } from '@/utils/axios';

/**
 * 유저 리스트 조회 api
 */
const fetchUsers = async (params: any) => {
  const { data } = await adminInstance.get('/users', {
    params,
  });
  return data;
};

/**
 * 유저 상세 api
 */
const fetchUsersDetail = async (id: number) => {
  const { data } = await adminInstance.get(`/users/${id}`);
  return data;
};

/**
 * 유저 삭제 api
 */
const fetchUsersDelete = async ({ id, deleted_reason }: any) => {
  const { data } = await adminInstance.delete(`/users/${id}`, {
    data: { deleted_reason },
  });
  return data;
};

/**
 * 유저 코인 적립/차감 api
 */
const fetchUsersUpdateCoin = async ({ id, ...params }: any) => {
  const { data } = await adminInstance.put(`/users/${id}`, params);
  return data;
};

/**
 * 유저 엑셀 다운로드 api
 * */
const fetchUsersExcelDownload = async (params?: any) => {
  const data = await adminInstance.get('/download/users', { params });
  return data;
};

const fetchUsersRecommends = async ({ id, ...params }: any) => {
  const { data } = await adminInstance.get(`/users/${id}/recommends`, {
    params,
  });

  return data;
};

const fetchUsersPayments = async ({ id, ...params }: any) => {
  const { data } = await adminInstance.get(`/users/${id}/payments`, {
    params,
  });

  return data;
};

const fetchUsersPurchases = async (params: any) => {
  const { data } = await adminInstance.get(`/payments/purchases`, {
    params,
  });

  return data;
};

export {
  fetchUsers,
  fetchUsersDetail,
  fetchUsersDelete,
  fetchUsersUpdateCoin,
  fetchUsersExcelDownload,
  fetchUsersRecommends,
  fetchUsersPayments,
  fetchUsersPurchases,
};
