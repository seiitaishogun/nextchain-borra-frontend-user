import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import useUser from '@/hooks/auth/useUser';
import { loginSample } from '@/api/auth';
import { setLoginToken } from '@/utils/axios';

function LoginAdsense() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: fetchUser } = useUser();
  useQuery(
    ['sampleLogin'],
    () => loginSample({ hash_code: searchParams.get('hash_code') || '' }),
    {
      enabled: router.isReady,
      onSuccess: (token: string) => {
        const [, t] = token.split(' ');
        setLoginToken(t);
        fetchUser();
        router.push('/');
      },
      onError: () => {
        router.push('/');
      },
    }
  );

  return null;
}

export default LoginAdsense;
