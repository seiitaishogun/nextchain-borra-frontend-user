import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { fetchUpdateLike } from '@/api/like';
import { loginState, userInfoState } from '@/store/auth';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { ContentDetailT } from '@/types/content/detail';
import { LikeType } from '@/types/like';

interface Props {
  content: ContentDetailT;
  setAlertOptions: (options: any) => void;
  handleReset: () => void;
}

function useUpdateContentLike({
  content,
  setAlertOptions,
  handleReset,
}: Props) {
  const queryClient = useQueryClient();
  const isLogin = useRecoilValue(loginState);

  const userInfo = useRecoilValue(userInfoState);
  const { handleLikeEvent } = useDataCollection();
  const likeMutate = useMutation(fetchUpdateLike);

  const handleUpdateLike = () => {
    if (likeMutate.isLoading) return;

    if (!isLogin) {
      setAlertOptions({
        isOpen: true,
        description: '로그인 후 이용해 주세요',
        handleConfirm: handleReset,
      });

      return;
    }

    likeMutate.mutate(
      {
        id: content.id,
        type: LikeType.Content,
      },
      {
        onSuccess: ({ status, count }) => {
          queryClient.setQueryData(['contentsLikes', { id: content.id }], () =>
            status ? [content.id] : []
          );

          queryClient.setQueryData(
            ['contentsDetail', { id: content.id }],
            (oldData: any) => ({
              ...oldData,
              like_count: count,
            })
          );

          handleLikeEvent({
            content_id: content.id,
            content_name: content.name,
            user_id: userInfo?.id || null,
            user_name: userInfo?.name || null,
            is_purchase: false,
            is_like: !!status,
          });
        },
        onError: () => {
          setAlertOptions({
            isOpen: true,
            description: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
            handleConfirm: handleReset,
          });
        },
      }
    );
  };

  return { handleUpdateLike };
}

export default useUpdateContentLike;
