const path = require('path');
const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  compress: true,
  enabled: process.env.ANALYZE === 'true',
});

const CompressionPlugin = require('compression-webpack-plugin');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  compiler: {
    styledComponents: true,
    removeConsole: false
    //removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    APP_URL: process.env.APP_URL,
    APP_USER_API_URL: process.env.APP_USER_API_URL,
    APP_ADMIN_API_URL: process.env.APP_ADMIN_API_URL,
    APP_ENV: process.env.APP_ENV,
    APP_IMAGE_URL: process.env.APP_IMAGE_URL,
    APPLE_REDIRECT_URI: process.env.APPLE_REDIRECT_URI,
    APPLE_LOGIN_CLIENT_ID: process.env.APPLE_LOGIN_CLIENT_ID,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
    KAKAO_JAVASCRIPT_KEY: process.env.KAKAO_JAVASCRIPT_KEY,
    SEGMENT_KEY: process.env.SEGMENT_KEY,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    GTM_TRACKING_ID: process.env.GTM_TRACKING_ID,
    ADSENSE_CLIENT_ID: process.env.ADSENSE_CLIENT_ID,
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
    NAVER_AD_ID: process.env.NAVER_AD_ID,
  },
  webpack: config => {
    const isProd = process.env.NODE_ENV === 'production';
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src'),
    };
    config.plugins.push(new CompressionPlugin());
    return {
      ...config,
      mode: isProd ? 'production' : 'development',
      devtool: isProd ? 'hidden-source-map' : 'eval',
    };
  },
  output: {
    path: '/accounts',
    publicPath: `${process.env.APP_IMAGE_URL}/accounts`,
  },
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  images: {
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'borra-bucket.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'borra.today',
      },
      {
        protocol: 'https',
        hostname: 'borra.fles.dev',
      },
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
      },
      {
        protocol: 'https',
        hostname: 'static.borra.today',
      },
    ],
  },
  experimental: {
    appDir: false,
    optimizeFonts: true,
    webVitalsAttribution: ['CLS', 'LCP'],
  },
};

module.exports = withPlugins(
  [withBundleAnalyzer({ compress: true })],
  nextConfig
);
