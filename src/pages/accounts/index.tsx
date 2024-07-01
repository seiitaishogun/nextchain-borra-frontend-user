import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TodayFortune from '@/components/Main/TodayFortune';
import Title from '@/components/Common/Title';
import Card from '@/components/Common/Card';
import UserInfo from '@/components/Accounts/UserInfo';
import AuthCheck from '@/components/Auth/AuthCheck';
import { PaddingBox } from '@/components/Contents/Result/Result.styled';
import HistoryLayout from '@/components/Common/Layout/History';
import Advertise from '@/components/Common/Advertise';
import Banner from '@/components/Common/Banner';
import useContentsLikes from '@/hooks/contents/useContentsLikes';
import { ACCOUNT_HOME_AD } from '@/constants/adsense';
import { fetchAccountLike, fetchAccountReplay } from '@/api/account/list';

const Layout = styled.div`
  section {
    margin-top: 40px;
    padding: 0 16px;
  }

  .like-contents {
    margin-top: 30px;
  }

  #user-info {
    padding-top: 4px;
  }

  #today-fortune {
    margin-top: 24px;
  }

  .ad {
    margin: 40px 0 0;
    padding: 0;
  }
`;

function Accounts() {
  const likesData = useQuery(['accountsLike'], fetchAccountLike, {
    select: res => res.data,
    initialData: {
      data: [],
    },
  });
  const likesListData = useContentsLikes({
    data: likesData.data || [],
    isLoading: likesData.isLoading,
  });

  const replaysData = useQuery(['accountsViews', 1], fetchAccountReplay, {
    select: res => res.data,
    initialData: {
      data: [],
    },
  });
  const replaysListData = useContentsLikes({
    data: replaysData.data,
    isLoading: replaysData.isLoading,
  });

  return (
    <AuthCheck>
      <Layout>
        <PaddingBox id="user-info">
          <UserInfo isAccountButton />
        </PaddingBox>

        <div id="today-fortune">
          <TodayFortune />
        </div>

        <Advertise
          style={{
            margin: '30px 0 0',
            padding: '0 16px',
          }}
          {...ACCOUNT_HOME_AD}
        />

        <section className="like-contents">
          <Title title="좋아요" linkConfig={{ href: '/accounts/likes' }} />
          <Card
            size="small"
            data={likesListData}
            isLoading={likesData.isLoading || likesData.isFetching}
            emptyMessage="좋아요를 누른 콘텐츠가 없습니다."
          />
        </section>

        <section className="recent-contents">
          <Title
            title="콘텐츠 다시보기"
            linkConfig={{ href: '/accounts/replays' }}
          />
          <Card
            isPurchaseLink
            size="small"
            data={replaysListData}
            isLoading={replaysData.isLoading || replaysData.isFetching}
            emptyMessage="최근 조회 콘텐츠가 없습니다."
          />
        </section>

        <section className="ad">
          <Banner
            width="360px"
            height="200px"
            image={`${process.env.APP_IMAGE_URL}/accounts/ad_banner.jpg`}
            link="/contents/47"
          />
        </section>
      </Layout>
    </AuthCheck>
  );
}

Accounts.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="마이페이지">{page}</HistoryLayout>;
};

export default Accounts;
