import { instance } from '@/utils/axios';
import { PgCode } from '@/types/payments';

const fetchPaymentsProducts = async () => {
  const { data } = await instance.get(`/payments`);
  return data;
};

interface WebProps {
  product_id: number;
  pgcode: PgCode;
  hash: string;
}

const fetchPaymentsWeb = async (params: WebProps) => {
  const { data } = await instance.post(`/payments/web`, params);
  return data;
};

interface ProcessProps {
  payment_method: any;
  product_id: number;
  product_title: string;
  product_description: string;
  product_price: number;
  status: number;
  failed_reason?: string;
  hash: string;
}

const fetchPaymentsApp = async (params: ProcessProps) => {
  const { data } = await instance.post(`/payments/app`, params);
  return data;
};

interface ResultProps {
  id: number;
}

const fetchPaymentsResult = async ({ id }: ResultProps) => {
  const { data } = await instance.post(`/payments/coin/${id}`);
  return data;
};

const fetchPaymentsCid = async (params: { cid: any }) => {
  const { data } = await instance.post(`/payments/cid`, params);
  return data;
};

const fetchPaymentsHash = async (params: { product_id: number }) => {
  const { data } = await instance.post(`/payments/hash`, params);
  return data;
};

export {
  fetchPaymentsProducts,
  fetchPaymentsWeb,
  fetchPaymentsApp,
  fetchPaymentsResult,
  fetchPaymentsCid,
  fetchPaymentsHash,
};
export type { WebProps };
