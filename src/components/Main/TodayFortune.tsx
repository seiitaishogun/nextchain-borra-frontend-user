import styled from 'styled-components';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import LoginButton from '@/components/Common/LoginButton';
import { PaddingBox } from '@/components/Contents/Result/Result.styled';
import { authCheckState, loginState, userInfoState } from '@/store/auth';
import { fetchCommonWord } from '@/api/common';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 32px 0 0;
  padding: 15px 24px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 9px 19px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;

  h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.23px;
    text-align: left;

    .highlight {
      box-shadow: inset 0 -10px 0 rgba(137, 134, 255, 0.5);
    }
  }
`;

const Box = styled.div`
  margin-top: 15px;
  min-height: 24px;

  .fortune-link {
    display: inline-block;
  }

  p {
    font-weight: normal;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
    line-height: 24px;
    letter-spacing: -0.26px;
    text-align: left;
    cursor: pointer;

    b,
    u {
      font-weight: normal;
      text-decoration: none;
    }
  }
`;

function TodayFortune() {
  const authCheck = useRecoilValue(authCheckState);
  const isLogin = useRecoilValue(loginState);
  const userInfo = useRecoilValue(userInfoState);
  const { data, error }: any = useQuery(['contentsWord'], fetchCommonWord, {
    enabled: authCheck && isLogin,
  });

  const renderData = () => {
    if (!authCheck) return null;
    const status = error?.response?.status;

    if (status === 403) {
      return (
        <LoginButton link="/register" text="약관 동의후 이용 가능합니다." />
      );
    }

    if (isLogin) {
      return (
        <Link href="/contents/2" className="fortune-link">
          <p dangerouslySetInnerHTML={{ __html: data }} />
        </Link>
      );
    }

    return <LoginButton />;
  };

  return (
    <PaddingBox>
      <Layout>
        <h2>
          {userInfo?.name ? `${userInfo.name}님의 ` : ' '}
          <span className="highlight">오늘 운세는?</span>
        </h2>
        <Box>{renderData()}</Box>
      </Layout>
    </PaddingBox>
  );
}

export default TodayFortune;
