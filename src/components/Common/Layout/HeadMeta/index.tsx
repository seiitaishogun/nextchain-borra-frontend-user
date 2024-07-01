import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  description?: string;
  url?: string;
  image?: any;
}

function HeadMeta({ title, description, url, image }: Props) {
  const APP_URL = process.env.APP_URL || '';
  const router = useRouter();
  const { asPath } = router;
  return (
    <Head>
      <title>{title || '보라'}</title>
      <meta name="viewport" content="width=360, user-scalable=no" />
      <meta
        name="description"
        content={
          description || '멋진 하루를 시작하려면? 보라에서 확인해보세요!'
        }
      />
      <meta
        property="og:title"
        content={title || '보라 (BORRA) - 오늘 하루를 미리보기'}
      />
      <meta property="og:type" content="website" />

      {/**
       TODO SSR 적용 시 수정 필요
       */}
      <meta property="og:url" content={url || `${APP_URL}${asPath}`} />
      <meta
        property="og:image"
        content={
          image || `${process.env.APP_IMAGE_URL}/meta/logo.jpg`
        }
      />
    </Head>
  );
}

export default HeadMeta;
