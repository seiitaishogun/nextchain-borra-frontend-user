import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { removeCookies, setCookie } from 'cookies-next';
import { fetchUser } from '@/api/auth';
import { authCheckState, loginState, userInfoState } from '@/store/auth';
import { setLoginToken } from '@/utils/axios';
import { UserT } from '@/types/users';
import { coinCalculator } from '@/utils/coin';
import useDataCollection from '@/hooks/sdk/useDataCollection';

interface Props {
  handleRegister?: (is_agree: boolean) => void;
}

function useUser({ handleRegister }: Props = {}) {
  const setAuthCheck = useSetRecoilState(authCheckState);
  const setLoggedInState = useSetRecoilState(loginState);
  const setUserInfoState = useSetRecoilState(userInfoState);
  const { segmentUserIdentify } = useDataCollection();

  return useMutation(fetchUser, {
    retry: false,
    onSuccess: ({ data }: { data: UserT }) => {
      setCookie('user_id', data.id.toString());
      setAuthCheck(true);
      setUserInfoState({
        ...data,
        coin: coinCalculator(data.coin),
      });
      setLoggedInState(true);
      segmentUserIdentify(data);

      if (handleRegister) {
        handleRegister(data.is_agree);
      }
    },
    onError: () => {
      removeCookies('user_id');
      setAuthCheck(true);
      setUserInfoState(null);
      setLoggedInState(false);
      setLoginToken('');
    },
  });
}

export default useUser;
