import { adminInstance } from '@/utils/axios';

/**
 * 콘텐츠 조회 api
 * */
const fetchContents = async (params: any) => {
  const { data } = await adminInstance.get(`/contents`, {
    params,
  });
  return data;
};

/**
 * 콘텐츠 상세 api
 * */
const fetchContentsDetail = async (id: number) => {
  const { data } = await adminInstance.get(`/contents/${id}`);
  return data;
};

/**
 * 콘텐츠 생성 api
 * */
const fetchContentsCreate = async (params: any) => {
  const { data } = await adminInstance.post(`/contents`, params);
  return data;
};

/**
 * 콘텐츠 수정 api
 * */
const fetchContentsUpdate = async ({ id, ...params }: any) => {
  const { data } = await adminInstance.put(`/contents/${id}`, params);
  return data;
};

/**
 * 관리자 콘텐츠에서 사용하는 리소스
 * categories, tags 데이터 사용
 * */
const fetchContentsResource = async () => {
  const { data } = await adminInstance.get(`/contents/create`);
  return data;
};

/**
 * 콘텐츠 엑셀 다운로드 api
 * */
const fetchExcelDownload = async (params?: any) => {
  const data = await adminInstance.get('/download/contents', {
    params,
  });
  return data;
};

export {
  fetchContents,
  fetchContentsResource,
  fetchContentsCreate,
  fetchContentsDetail,
  fetchContentsUpdate,
  fetchExcelDownload,
};
