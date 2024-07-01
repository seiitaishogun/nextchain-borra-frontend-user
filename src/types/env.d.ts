export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: string;
      APP_IMAGE_URL: string;
      KAKAO_REDIRECT_URI: string;
      KAKAO_JAVASCRIPT_KEY: string;
      APPLE_REDIRECT_URI: string;
      APPLE_LOGIN_CLIENT_ID: string;
      SEGMENT_KEY: string;
      GA_TRACKING_ID: string;
      GTM_TRACKING_ID: string;
      ADSENSE_CLIENT_ID: string;
      FACEBOOK_PIXEL_ID: string;
      NAVER_AD_ID: string;
    }
  }
}
