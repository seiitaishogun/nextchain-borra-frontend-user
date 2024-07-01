import { instance } from '@/utils/axios';

interface Props {
  page: number;
}

const fetchPayments = async (params: Props) => {
  const { data } = await instance.get('/accounts/histories/payments', {
    params,
  });
  return data;
};

const fetchPurchases = async (params: Props) => {
  const { data } = await instance.get('/accounts/histories/purchases', {
    params,
  });
  return data;
};

const fetchUpdateNotify = async (params: { is_notify: boolean }) => {
  const { data } = await instance.put('/accounts/update/notify', params);
  return data;
};

export { fetchPayments, fetchPurchases, fetchUpdateNotify };
