import { instance } from '@/utils/axios';

const fetchPurchases = async (params: any) => {
  const { data } = await instance.post(`/purchases`, params);
  return data;
};

export { fetchPurchases };
