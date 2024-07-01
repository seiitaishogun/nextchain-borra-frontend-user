const enum LikeType {
  Content = 'content',
  Counselor = 'counselor',
}

interface LikeRequest {
  id: number;
  type: LikeType;
}

interface LikesRequest {
  type: LikeType;
  ids: Array<number>;
}

export { LikeType };
export type { LikeRequest, LikesRequest };
