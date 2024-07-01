import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { loginState, userInfoState } from '@/store/auth';
import { fetchUpdateLike } from '@/api/like';
import { CounselorDetailT } from '@/types/counselor/detail';
import { LikeType } from '@/types/like';
import useDataCollection from '@/hooks/sdk/useDataCollection';

interface Props {
  counselor: CounselorDetailT;
  setAlertOptions: (options: any) => void;
  handleReset: () => void;
}

function useUpdateLike({ counselor, setAlertOptions, handleReset }: Props) {
  const queryClient = useQueryClient();
  const isLogin = useRecoilValue(loginState);
  const userInfo = useRecoilValue(userInfoState);
  const likeMutate = useMutation(fetchUpdateLike);
  const { handleCounselorLikeEvent } = useDataCollection();

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
        id: counselor.id,
        type: LikeType.Counselor,
      },
      {
        onSuccess: ({ status, count }) => {
          queryClient.setQueryData(
            ['counselorsLikes', { id: counselor.id }],
            () => (status ? [counselor.id] : [])
          );

          queryClient.setQueryData(
            ['counselor', counselor.id],
            (oldData: any) => ({
              ...oldData,
              like_count: count,
            })
          );

          handleCounselorLikeEvent({
            counselor_id: counselor.id,
            counselor_c_id: counselor.c_id,
            counselor_name: counselor.name,
            user_id: userInfo?.id || null,
            user_name: userInfo?.name || null,
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

export default useUpdateLike;
