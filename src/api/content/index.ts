import { instance } from '@/utils/axios';
import {
  ContentShowRequest,
  ContentShowResponse,
} from '@/types/content/detail';

/**
 * 콘텐츠 상세
 */
const fetchContentDetail = async ({ id }: ContentShowRequest) => {
  const { data } = await instance.get<ContentShowResponse>(`/contents/${id}`);
  return data;
};

/**
 * 콘텐츠 구매
 */
const fetchContentsPurchase = async ({ id, ...params }: any) => {
  const { data } = await instance.post(`/contents/${id}/purchase`, params);
  return data;
};

const fetchContentsResult = async ({
  id,
  ...params
}: {
  id: number;
  code: string | null;
}) => {
  const { data } = await instance.get(`/purchases/${id}`, { params });
  return data;
};

/**
 * 사주 정보 조회
 */
const fetchSajuInfo = async ({ id }: { id: number }) => {
  const { data } = await instance.post(`/purchases/${id}/saju`);
  return data;
};

/**
 * 명반 정보 조회
 */

interface MyeongbanT {
  myeongban: Array<MyeongbanDetailT>;
  position: {
    jami: string;
    myeonggung: string;
    ohaengguk: string;
  };
}

interface MyeongbanDetailT {
  cheongan: string;
  gung: string;
  jami: string;
  cheonbu: string;
}

const fetchMyongbanInfo = async ({ id }: { id: number }) => {
  const { data } = await instance.post(`/purchases/${id}/myeongban`);
  return data;
};

/**
 * 콘텐츠 소제목 미리보기
 */
const fetchContentsPreview = async (id: number) => {
  const { data } = await instance.get(`/contents/${id}/previews`);
  return data;
};

/**
 * 콘텐츠 공유 하기
 */
const fetchContentsShare = async (id: number) => {
  const { data } = await instance.get(`/purchases/${id}/share`, {
    params: {
      type: 'url',
    },
  });
  return data;
};

export {
  fetchContentDetail,
  fetchContentsPurchase,
  fetchContentsResult,
  fetchSajuInfo,
  fetchMyongbanInfo,
  fetchContentsPreview,
  fetchContentsShare,
};

export type { MyeongbanT, MyeongbanDetailT };
