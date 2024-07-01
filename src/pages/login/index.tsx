import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ButtonKakao from '@/components/Auth/Login/ButtonKakao';
import ButtonApple from '@/components/Auth/Login/ButtonApple';
import { checkInAppApple } from '@/utils/agent';
import { setReferrer, setReferrerPath } from '@/utils/referrer';
import { ReferrerPathE } from '@/types/users';

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 200px);

  .buttonWrap {
    display: flex;
    justify-content: center;
    margin: 40px 0;

    > button {
      margin: 0 5px;
    }
  }
`;

const ImageBox = styled.div`
  width: 60%;
  padding: 20px;
  box-sizing: border-box;
  background: url('${props => `${props.theme.imageUrl}/login/logo.png`}')
    no-repeat center center;
  background-size: cover;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const LoginButtonBox = styled.div`
  margin-top: 20px;
`;

function Login() {
  const router = useRouter();
  const [isApple, setIsApple] = useState<boolean>(false);

  useEffect(() => {
    setIsApple(checkInAppApple());
  }, [checkInAppApple]);

  useEffect(() => {
    if (!router.isReady) return;
    const referrer = (router.query?.redirect || '').toString();
    setReferrer(referrer);

    const referrerPath = (
      router.query?.referrerPath || ReferrerPathE.BORRA
    ).toString();
    setReferrerPath(referrerPath);
  }, [router.isReady]);

  return (
    <Layout>
      <ImageBox />

      <LoginButtonBox>
        <ButtonKakao />
        {isApple && <ButtonApple />}
      </LoginButtonBox>
    </Layout>
  );
}

export default Login;
