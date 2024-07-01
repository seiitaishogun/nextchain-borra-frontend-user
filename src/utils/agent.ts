import { isIOS, isMobile as checkIsMobile } from 'react-device-detect';

// TODO: 추후 제거
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function checkInAppApple(): boolean {
  return isIOS && checkIsMobile;
}

function checkPlatform(): 'aos' | 'ios' | 'desktop' | 'mobile' {
  const agent = navigator.userAgent.toLowerCase();
  /**
   * 데스크탑, 모바일 브라우저
   */

  if (!window?.flutter_inappwebview) {
    return 'desktop';
  }

  /**
   * 인앱일때 안드로이드 체크
   */
  if (agent.indexOf('android') > -1) {
    return 'aos';
  }

  /**
   * 인앱일때 ios 체크
   */
  if (
    agent.indexOf('iphone') > -1 ||
    agent.indexOf('ipad') > -1 ||
    agent.indexOf('ipod') > -1
  ) {
    return 'ios';
  }

  /**
   * 예외 체크
   */
  return 'mobile';
}

const checkMobile = () => (window?.flutter_inappwebview ? 'mobile' : 'web');

export { isMobile, checkInAppApple, checkPlatform, checkMobile };
