import { instance } from '@/utils/axios';

const fetchRenewCache = async (params: { key: string }) => {
  const { data } = await instance.post('/renew/cache', params);
  return data;
};

const fetchRenewCounselor = async () => {
  const { data } = await instance.post('/renew/counselor');
  return data;
};

export { fetchRenewCache, fetchRenewCounselor };
