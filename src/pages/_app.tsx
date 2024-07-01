import React, { ReactElement, ReactNode, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { RecoilRoot } from 'recoil';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import Layout from '@/components/Common/Layout';
import Auth from '@/components/Auth';
import HeadMeta from '@/components/Common/Layout/HeadMeta';
import Theme from '@/styles/Theme';
import GlobalStyle from '@/styles/GlobalStyle';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { initNaverAd } from '@/lib/naverAd';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const { handlePageViewEvent } = useDataCollection();

  useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.GTM_TRACKING_ID,
    });
    handlePageViewEvent();
    initNaverAd();
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      try {
        initNaverAd();
      } catch (err) {
        console.error(err);
      }

      try {
        handlePageViewEvent();
      } catch (err) {
        console.error(err);
      }

      try {
        window.gtag('config', process.env.GTM_TRACKING_ID, {
          page_path: url,
          user_id: getCookie('user_id') || '',
        });
      } catch (err) {
        console.error(err);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

  return (
    <>
      <HeadMeta />
      <GlobalStyle />

      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={Theme}>
              <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
