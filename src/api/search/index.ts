import { instance } from '@/utils/axios';

/**
 * 추천 검색어 리소스
 */
const fetchKeywords = async () => {
  const { data } = await instance.get('/search/keywords');
  return data;
};

const fetchSearchHistory = async () => {
  const { data } = await instance.get('/search/history');
  return data;
};

const fetchStoreSearchHistory = async (search_value?: string) => {
  const { data } = await instance.get('/search/history', {
    params: search_value,
  });
  return data;
};

const fetchSearch = async (params?: { search_value: string; page: number }) => {
  const { data } = await instance.get('/search', { params });
  return data;
};

const fetchDeleteSearchKeyword = async (search_value: string) => {
  const { data } = await instance.delete('/search', {
    params: {
      search_value,
    },
  });
  return data;
};

export {
  fetchKeywords,
  fetchSearchHistory,
  fetchStoreSearchHistory,
  fetchSearch,
  fetchDeleteSearchKeyword,
};
