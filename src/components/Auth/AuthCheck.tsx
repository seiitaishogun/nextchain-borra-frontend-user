import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { authCheckState, loginState } from '@/store/auth';
import useAlert from '@/hooks/common/useAlert';

interface Props {
  children: React.ReactNode;
}

function AuthCheck({ children }: Props) {
  const router = useRouter();
  const authCheck = useRecoilValue(authCheckState);
  const isLogin = useRecoilValue(loginState);
  const { renderMessage, setAlertOptions } = useAlert();

  useEffect(() => {
    if (authCheck && !isLogin) {
      setAlertOptions({
        isOpen: true,
        description: '로그인이 필요합니다.',
        handleConfirm: () => {
          router.push(`/login?redirect=${router.asPath}`);
        },
      });
    }
  }, [authCheck]);

  if (authCheck && !isLogin) return renderMessage();
  if (!authCheck || !isLogin) return <div />;
  return <div>{children}</div>;
}

export default AuthCheck;
