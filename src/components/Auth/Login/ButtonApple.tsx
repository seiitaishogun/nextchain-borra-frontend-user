import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import AppleLogin from 'react-apple-login';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoginButton = styled.div`
  overflow: hidden;
  width: 183px;
  height: 45px;
  margin-top: 8px;
  background: url('${props =>
      `${props.theme.imageUrl}/login/apple_button.png`}')
    no-repeat center center;
  background-size: cover;
  cursor: pointer;
  text-indent: -9999px;
`;

function ButtonApple() {
  return (
    <Layout>
      <AppleLogin
        clientId={process.env.APPLE_LOGIN_CLIENT_ID}
        redirectURI={process.env.APPLE_REDIRECT_URI}
        render={props => (
          <LoginButton onClick={props.onClick}>애플 로그인</LoginButton>
        )}
      />
    </Layout>
  );
}

export default ButtonApple;
