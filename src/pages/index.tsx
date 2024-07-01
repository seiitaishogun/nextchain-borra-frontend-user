import React from 'react';
import styled from 'styled-components';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';
import TopBanner from '@/components/Main/TopBanner';
import HotContents from '@/components/Main/HotContents';
import TodayFortune from '@/components/Main/TodayFortune';
import TagContents from '@/components/Main/TagContents';
import FooterInfo from '@/components/Common/Layout/FooterInfo';
import TitleCard from '@/components/Common/TitleCard';
import Advertise from '@/components/Common/Advertise';
import {
  fetchMainBanner,
  fetchMainFirstFree,
  fetchMainFree,
  fetchMainHot,
  fetchMainToday,
  fetchMainWaitFree,
} from '@/api/main';
import { authCheckState, loginState } from '@/store/auth';
import { MAIN_AD } from '@/constants/adsense';

const Layout = styled.div`
  > section:last-child {
    padding-bottom: 56px;
  }
`;

function Home() {
  const authCheck = useRecoilValue(authCheckState);
  const isLogin = useRecoilValue(loginState);

  const todayContents = useQuery(['mainToday'], fetchMainToday, {
    initialData: {
      data: [],
    },
    select: res => res.data,
    staleTime: 10 * 1000,
  });

  const waitFreeContents = useQuery(['mainWaitFree'], fetchMainWaitFree, {
    initialData: {
      data: [],
    },
    select: res => res.data,
    staleTime: 10 * 1000,
  });

  const freeContents = useQuery(['mainFree'], fetchMainFree, {
    initialData: {
      data: [],
    },
    select: res => res.data,
    staleTime: 10 * 1000,
  });

  const firstFreeContents = useQuery(['mainFirstFree'], fetchMainFirstFree, {
    initialData: {
      data: [],
    },
    select: res => res.data,
    staleTime: 10 * 1000,
  });

  return (
    <>
      <Layout>
        <TopBanner />
        <HotContents />
        <TodayFortune />

        <TitleCard
          style={{
            marginTop: '32px',
          }}
          titleProps={{
            title: '오늘의 운세 모아보기',
          }}
          cardProps={{
            size: 'medium',
            isLoading: todayContents.isFetching || todayContents.isLoading,
            data: todayContents.data,
            isSwipe: true,
            useLike: false,
          }}
        />

        <TitleCard
          titleProps={{
            title: '눈 깜짝할 사이에, 기다리면 무료!',
            linkConfig: {
              href: '/category/8',
            },
          }}
          cardProps={{
            size: 'small',
            isLoading:
              waitFreeContents.isFetching || waitFreeContents.isLoading,
            data: waitFreeContents.data,
            useLike: false,
          }}
        />

        <Advertise
          style={{
            margin: '60px 0 0',
            padding: '0 16px',
          }}
          {...MAIN_AD}
        />

        <TagContents />

        <TitleCard
          titleProps={{
            title: '아직 본 적 없다면, 최초 무료 보기',
            linkConfig: {
              href: '/category/9',
            },
          }}
          cardProps={{
            size: 'small',
            isLoading:
              firstFreeContents.isFetching || firstFreeContents.isLoading,
            data: firstFreeContents.data,
            useLike: false,
          }}
        />

        <TitleCard
          titleProps={{
            title:
              (authCheck || '') ?? isLogin
                ? '여기서만 무료'
                : '회원가입하고 무료',
            linkConfig: {
              href: '/category/contents/free',
            },
          }}
          cardProps={{
            size: 'small',
            isLoading: freeContents.isFetching || freeContents.isLoading,
            data: freeContents.data,
            useLike: false,
          }}
        />
      </Layout>

      <FooterInfo />
    </>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['mainBanner'], fetchMainBanner);
  await queryClient.prefetchQuery(['mainHot'], fetchMainHot);
  await queryClient.prefetchQuery(['mainFree'], fetchMainFree);
  await queryClient.prefetchQuery(['mainToday'], fetchMainToday);
  await queryClient.prefetchQuery(['mainWaitFree'], fetchMainWaitFree);
  await queryClient.prefetchQuery(['mainFirstFree'], fetchMainFirstFree);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
