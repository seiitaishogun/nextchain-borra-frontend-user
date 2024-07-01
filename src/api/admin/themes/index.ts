import { adminInstance } from '@/utils/axios';

/**
 * 태마 조회 api
 * */
const fetchThemes = async (params: any) => {
  const { data } = await adminInstance.get(`/themes`, {
    params,
  });
  return data;
};

/**
 * 태마 상세 api
 * */
const fetchThemesDetail = async (id: any) => {
  const { data } = await adminInstance.get(`/themes/${id}`);
  return data;
};

/**
 * 태마 생성 api
 * */
const fetchThemesCreate = async (params: any) => {
  const { data } = await adminInstance.post(`/themes`, params);
  return data;
};

/**
 * 태마 수정 api
 * */
const fetchThemesUpdate = async ({ id, ...params }: any) => {
  const { data } = await adminInstance.put(`/themes/${id}`, params);
  return data;
};

export { fetchThemes, fetchThemesDetail, fetchThemesCreate, fetchThemesUpdate };
