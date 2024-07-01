import Script from 'next/script';

function useKakaoLogin() {
  const initKakao = () => {
    window.Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
  };

  const loadScript = () => (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js"
      integrity="sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh"
      crossOrigin="anonymous"
      onLoad={initKakao}
    />
  );

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.KAKAO_REDIRECT_URI,
    });
  };

  return { loadScript, loginWithKakao };
}

export default useKakaoLogin;
