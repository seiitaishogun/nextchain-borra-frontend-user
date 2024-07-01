import { adminInstance } from '@/utils/axios';

/**
 * 게시글 리스트 조회 api
 */
const fetchPosts = async (params: any) => {
  const { data } = await adminInstance.get('/posts', {
    params,
  });
  return data;
};

/**
 * 게시글 리스트 상세 api
 */
const fetchPostDetail = async (id: any) => {
  const { data } = await adminInstance.get(`/posts/${id}`);
  return data;
};

/**
 * 게시글 리스트 삭제 api
 */
const fetchPostDelete = async (id: any) => {
  const { data } = await adminInstance.delete(`/posts/${id}`);
  return data;
};

/**
 * 게시글 리스트 수정 api
 */
const fetchPostUpdate = async ({ id, ...params }: any) => {
  const { data } = await adminInstance.put(`/posts/${id}`, params);
  return data;
};

/**
 * 게시글 리스트 등록 api
 */
const fetchPostCreate = async (params: any) => {
  const { data } = await adminInstance.post('/posts', params);
  return data;
};

/**
 * 게시글 공개 여부 업데이트 api
 */

const fetchPostUpdateOpen = async ({ id, ...params }: any) => {
  const { data } = await adminInstance.put(`/posts/${id}/open`, params);
  return data;
};

export {
  fetchPosts,
  fetchPostDetail,
  fetchPostDelete,
  fetchPostUpdate,
  fetchPostCreate,
  fetchPostUpdateOpen,
};
