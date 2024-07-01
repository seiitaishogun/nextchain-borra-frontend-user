import React, { useEffect } from 'react';
import { getCookie, removeCookies } from 'cookies-next';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useUser from '@/hooks/auth/useUser';
import { authCheckState, loginState, userInfoState } from '@/store/auth';

const Message = dynamic(() => import('@/components/Common/Popup/Message'), {
  ssr: false,
});

interface Props {
  children: any;
}

function Auth({ children }: Props) {
  const router = useRouter();
  const setAuthCheck = useSetRecoilState(authCheckState);
  const isLogin = useRecoilValue(loginState);
  const userInfo = useRecoilValue(userInfoState);
  const { mutate } = useUser();

  useEffect(() => {
    if (getCookie('access_token')) {
      mutate();
    } else {
      setAuthCheck(true);
      removeCookies('user_id');
    }
  }, []);

  const isRegister = router.pathname.includes('register');

  return (
    <>
      {children}

      <Message
        isOpen={isLogin && !userInfo?.is_agree && !isRegister}
        description="보라 이용을 위해 정보 입력이 필요합니다"
        handleConfirm={() => {
          router.push('/register');
        }}
      />
    </>
  );
}

export default Auth;
