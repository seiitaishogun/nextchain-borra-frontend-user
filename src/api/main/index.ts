import { instance } from '@/utils/axios';

/**
 * 상단 배너
 */
const fetchMainBanner = async () => {
  const { data } = await instance.get(`/contents/main/banner`);
  return data;
};

/**
 * 지금 가장 핫한
 */
const fetchMainHot = async () => {
  const { data } = await instance.get(`/contents/main/hot`);
  return data;
};

/**
 * 지금 가장 핫한 램덤
 */
const fetchMainHotRandom = async () => {
  const { data } = await instance.get(`/contents/main/hot/recommend`);
  return data;
};

/**
 * 오늘의 운세 모아보기
 */
const fetchMainToday = async () => {
  const { data } = await instance.get(`/contents/main/today`);
  return data;
};

/**
 * 지금 내 관심은(태그별 컨텐츠)
 */
const fetchMainTags = async (tag_id: number) => {
  const { data } = await instance.get(`/contents/main/tags/${tag_id}`);
  return data;
};

/**
 * 여기서만 무료
 */
const fetchMainFree = async () => {
  const { data } = await instance.get(`/contents/main/free`);
  return data;
};

/**
 * 기다리면 무료
 */
const fetchMainWaitFree = async () => {
  const { data } = await instance.get(`/contents/main/wait-free`);
  return data;
};

/**
 * 최초 무료
 */
const fetchMainFirstFree = async () => {
  const { data } = await instance.get(`/contents/main/first-free`);
  return data;
};

export {
  fetchMainBanner,
  fetchMainHot,
  fetchMainHotRandom,
  fetchMainToday,
  fetchMainTags,
  fetchMainFree,
  fetchMainWaitFree,
  fetchMainFirstFree,
};
