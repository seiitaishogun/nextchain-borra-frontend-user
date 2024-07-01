import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@mui/material';
import Popup from '@/components/Common/Popup';
import { fetchAppleLogin, fetchKakaoLogin } from '@/api/auth/login';
import useAlert from '@/hooks/common/useAlert';
import useLogin from '@/hooks/auth/useLogin';

const Layout = styled.div`
  width: ${props => props.theme.deviceSize};
  height: auto;
  padding: 40px 8px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  word-break: keep-all;

  #model-text {
    margin-top: 70px;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: -0.25px;
  }
`;

function SocialLoginCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { renderMessage, setAlertOptions } = useAlert();
  const { handleLogin, isLoading: isLoginLoading } = useLogin();
  const provider = searchParams.get('provider') || '';
  const code = searchParams.get('code') || '';

  const { isFetching, isLoading, isError } = useQuery(
    ['loginCallback', code, provider],
    () => {
      const api = getCallbackApi();
      const params = getCallbackParams();
      return api(params);
    },
    {
      enabled: !!code && !!provider,
      onSuccess: ({ data }) => {
        const { token } = data;
        handleLogin(token);
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message || '오류가 발생했습니다.';
        setAlertOptions({
          isOpen: true,
          description: message,
          handleConfirm: () => {
            router.replace('/login');
          },
        });
      },
    }
  );

  const getCallbackApi = () => {
    if (provider === 'kakao') {
      return fetchKakaoLogin;
    }
    return fetchAppleLogin;
  };

  const getCallbackParams = () => {
    if (provider === 'kakao') {
      return {
        code,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
      };
    }
    return {
      code,
      redirect_uri: process.env.APPLE_REDIRECT_URI,
    };
  };

  if ((isLoading || isFetching || isLoginLoading) && !isError) {
    return (
      <Popup isOpen>
        <Layout>
          <CircularProgress size={100} />
          <Typography variant="h6" id="model-text">
            로그인 중입니다.
            <br />
            페이지를 닫거나 이동하지 마세요.
          </Typography>
        </Layout>
      </Popup>
    );
  }

  return <>{renderMessage()}</>;
}

export default SocialLoginCallback;
