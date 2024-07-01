import styled from 'styled-components';
import useKakaoLogin from '@/hooks/auth/useKakaoLogin';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoginButton = styled.button`
  overflow: hidden;
  width: 183px;
  height: 45px;
  border: none;
  background: url(${props => `${props.theme.imageUrl}/login/kakao_login_medium_narrow.png`}) no-repeat;
  background-size: contain;
  appearance: none;
  cursor: pointer;
  text-indent: -9999px;
`;

function ButtonKakao() {
  const { loadScript, loginWithKakao } = useKakaoLogin();

  return (
    <Layout>
      <LoginButton onClick={loginWithKakao}>카카오 로그인</LoginButton>
      {loadScript()}
    </Layout>
  );
}

export default ButtonKakao;
