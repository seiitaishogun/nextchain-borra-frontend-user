import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/store/auth';
import { fetchLikes } from '@/api/like';
import { LikeType } from '@/types/like';

interface Props {
  data: Array<any>;
  isLoading: boolean;
  onSuccess?: () => void;
}

function useContentsLikes({ data, isLoading, onSuccess }: Props) {
  const isLogin = useRecoilValue(loginState);
  const res = useQuery(
    ['contentsLikes', data],
    () =>
      fetchLikes({
        type: LikeType.Content,
        ids: data.map(({ id, content_id }: any) => content_id || id),
      }),
    {
      enabled: !isLoading && data?.length > 0 && isLogin,
      initialData: [],
      onSuccess,
    }
  );

  if (!data) return [];

  return data.map(c => ({
    ...c,
    isLike: res.data.includes(c?.content_id || c.id),
  }));
}

export default useContentsLikes;
