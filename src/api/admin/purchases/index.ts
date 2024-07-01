import { adminInstance } from '@/utils/axios';

/**
 * 코인 사용 내역 조회 api
 * */
const fetchPurchases = async (params: any) => {
  const { data } = await adminInstance.get(`/purchases`, {
    params,
  });
  return data;
};

/**
 * 코인 사용 내역 엑셀 다운로드 api
 * */
const fetchExcelDownload = async (params?: any) => {
  const data = await adminInstance.get('/download/purchases', {
    params,
  });
  return data;
};

export { fetchPurchases, fetchExcelDownload };
