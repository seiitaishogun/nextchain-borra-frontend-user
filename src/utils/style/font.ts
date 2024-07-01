import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  preload: false,
  style: 'normal',
  display: 'swap',
});

const pretendard = localFont({
  src: [
    {
      path: '../../../public/fonts/pretendard/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../../public/fonts/pretendard/Pretendard-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../../public/fonts/pretendard/Pretendard-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../../../public/fonts/pretendard/Pretendard-Bold.woff2',
      weight: '700',
    },
  ],
  style: 'normal',
  display: 'swap',
});

export { notoSansKR, pretendard };
