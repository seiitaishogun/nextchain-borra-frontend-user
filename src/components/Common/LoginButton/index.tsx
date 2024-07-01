import styled from 'styled-components';
import { useRouter } from 'next/router';

interface Props {
  link?: string;
  text?: string | React.ReactNode;
  query?: string;
}

const Layout = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.yellowFE};
  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.21px;
  cursor: pointer;

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
  }
`;

function LoginButton({ link, text, query }: Props) {
  const router = useRouter();

  return (
    <Layout
      type="button"
      onClick={() => {
        router.push(
          link
            ? `${link}?redirect=${encodeURIComponent(router.asPath)}&${
                query || ''
              }`
            : `/login?redirect=${encodeURIComponent(router.asPath)}&${
                query || ''
              }`
        );
      }}
    >
      {text || '간편 가입하고 결과 보기'}
    </Layout>
  );
}

export default LoginButton;
