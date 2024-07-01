export {};

declare global {
  interface Window {
    flutter_inappwebview: any;
    paymentsCallback: ((id: number) => void) | null;
    AppleID: any;
    Kakao: any;
    adsbygoogle: any;
    gtag: any;
    fbq: any;
    wcs: any;
  }
}
