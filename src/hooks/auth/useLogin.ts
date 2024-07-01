import { useRouter } from 'next/router';
import { setLoginToken } from '@/utils/axios';
import useUser from '@/hooks/auth/useUser';
import { getRedirectUrl } from '@/utils/referrer';

function useLogin() {
  const router = useRouter();
  const { mutate: fetchUser, isLoading } = useUser({
    handleRegister: (is_agree: boolean) => {
      if (is_agree) {
        const referrer = getRedirectUrl();
        router.replace(referrer);
      } else {
        router.replace('/register');
      }
    },
  });

  const handleLogin = (token: string) => {
    setLoginToken(token);
    fetchUser();
  };

  return { handleLogin, isLoading };
}

export default useLogin;
