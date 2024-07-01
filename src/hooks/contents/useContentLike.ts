import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/store/auth';
import { fetchLikes } from '@/api/like';
import { LikeType } from '@/types/like';

interface Props {
  id: number;
  type: LikeType;
}

function useContentLike({ type, id }: Props) {
  const isLogin = useRecoilValue(loginState);

  const queryKey =
    type === LikeType.Content ? 'contentsLikes' : 'counselorsLikes';

  const { data } = useQuery(
    [queryKey, { id }],
    () => fetchLikes({ type, ids: [id] }),
    {
      enabled: !!id && isLogin,
      initialData: {
        data: [],
      },
    }
  );

  return data.length > 0;
}

export default useContentLike;
