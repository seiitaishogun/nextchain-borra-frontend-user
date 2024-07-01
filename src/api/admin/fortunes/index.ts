import { adminInstance } from '@/utils/axios';

/**
 * 운세 데이터 조회 api
 * */
const fetchFortunes = async (params: any) => {
  const { data } = await adminInstance.get(`/fortunes`, {
    params,
  });
  return data;
};

/**
 * 운세 데이터 상세 api
 * */
const fetchFortunesDetail = async (id: any) => {
  const { data } = await adminInstance.get(`/fortunes/${id}`);
  return data;
};

/**
 * 운세 데이터 등록 api
 * */
const fetchFortunesCreate = async (params: any) => {
  const { data } = await adminInstance.post(`/fortunes`, params);
  return data;
};

/**
 * 운세 데이터 수정 api
 * */
const fetchFortunesUpdate = async ({ id, ...params }: any) => {
  const { data } = await adminInstance.put(`/fortunes/${id}`, params);
  return data;
};

/**
 * 운세 데이터 삭제 api
 * */
const fetchFortunesDelete = async (id: number) => {
  const { data } = await adminInstance.delete(`/fortunes/${id}`);
  return data;
};

/**
 * 운세 데이터 사용 여부 업데이트 api
 * */
const fetchFortunesUpdateOpen = async ({ id, ...params }: any) => {
  const { data } = await adminInstance.put(`/fortunes/${id}/open`, params);
  return data;
};

/**
 * 관리자 운세 풀이 데이터에서 사용하는 리소스
 * */
const fetchFortunesResource = async () => {
  const { data } = await adminInstance.get(`/fortunes/create`);
  return data;
};

/**
 * 운세 데이터 엑셀 다운로드
 * */
const fetchFortunesExcelDownload = async (params: any) =>
  adminInstance.get('/templates', { params });

/**
 * 운세 데이터 엑셀 다운로드 상세 by id
 */
const fetchFortunesExcelDownloadDetail = async (id: number) =>
  adminInstance.get(`/download/fortuneData/${id}`);

export {
  fetchFortunes,
  fetchFortunesCreate,
  fetchFortunesDetail,
  fetchFortunesDelete,
  fetchFortunesUpdate,
  fetchFortunesUpdateOpen,
  fetchFortunesResource,
  fetchFortunesExcelDownload,
  fetchFortunesExcelDownloadDetail,
};
