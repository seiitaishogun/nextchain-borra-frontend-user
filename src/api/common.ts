import { instance } from '@/utils/axios';

const fetchTags = async () => {
  const { data } = await instance.get(`/common/tags`);
  return data;
};

const fetchCategories = async () => {
  const { data } = await instance.get(`/common/categories`);
  return data;
};

/**
 * 오늘의 운세 한마디
 */
const fetchCommonWord = async () => {
  const { data } = await instance.get(`/contents/common/word`);
  return data;
};

export { fetchTags, fetchCategories, fetchCommonWord };
