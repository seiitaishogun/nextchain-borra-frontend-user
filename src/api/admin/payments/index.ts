import { adminInstance } from '@/utils/axios';

/**
 * 웹 코인 적립 내역 조회 api
 * */
const fetchPaymentsWeb = async (params: any) => {
  const { data } = await adminInstance.get(`/payments/web`, {
    params,
  });
  return data;
};

/**
 * 앱 코인 적립 내역 조회 api
 * */
const fetchPaymentsApp = async (params: any) => {
  const { data } = await adminInstance.get(`/payments/app`, {
    params,
  });
  return data;
};

/**
 * 관리자 지급 적립 내역 조회 api
 * */
const fetchPaymentsEvent = async (params: any) => {
  const { data } = await adminInstance.get(`/payments/event`, {
    params,
  });
  return data;
};

/**
 * 코인 적립 내역 엑셀 다운로드 api
 * */
const fetchExcelDownload = async (params?: any) =>
  adminInstance.get('/download/payments', {
    params,
  });

export {
  fetchPaymentsWeb,
  fetchPaymentsApp,
  fetchPaymentsEvent,
  fetchExcelDownload,
};
