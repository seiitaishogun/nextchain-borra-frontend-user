import { instance } from '@/utils/axios';
import { LikeRequest, LikesRequest } from '@/types/like';

/**
 * 콘텐츠, 전화상담 좋아요 상태 변경
 */

const fetchUpdateLike = async (params: LikeRequest) => {
  const { data } = await instance.post(`/likes`, params);
  return data;
};

/**
 * 좋아요한 콘텐츠, 전확 상담 리스트 조회
 */
const fetchLikes = async (params: LikesRequest) => {
  const { data } = await instance.post(`/likes/index`, params);
  return data;
};

export { fetchUpdateLike, fetchLikes };
