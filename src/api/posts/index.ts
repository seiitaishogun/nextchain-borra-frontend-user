import { instance } from '@/utils/axios';

interface Props {
  page: number;
  type: string;
  search_value?: string;
}

const fetchPosts = async (params: Props) => {
  const { data } = await instance.get(`/posts`, { params });
  return data;
};

const fetchPostsDetail = async (id: number) => {
  const { data } = await instance.get(`/posts/${id}`);
  return data;
};

export { fetchPosts, fetchPostsDetail };
