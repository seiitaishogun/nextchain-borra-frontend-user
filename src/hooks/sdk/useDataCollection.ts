import TagManager from 'react-gtm-module';
import { EventProperties } from '@segment/analytics-next';
import { ShareType } from '@/components/Share/Share.type';
import { ReferrerPathE, RegisterPathE, UserT } from '@/types/users';
import { coinCalculator } from '@/utils/coin';
import { analytics } from '@/lib/segment';
import { checkPlatform } from '@/utils/agent';

function useDataCollection() {
  const handleEvent = ({
    event,
    eventName,
    traits,
  }: {
    event: 'track' | 'identify';
    eventName: string;
    traits: EventProperties;
  }) => {
    if (event === 'track') {
      TagManager.dataLayer({
        dataLayer: { event: eventName, ...traits },
      });
    }

    const agent = checkPlatform();
    if (agent === 'desktop') {
      analytics[event](eventName, traits);
    } else if (agent === 'aos' || agent === 'ios') {
      if (!window?.flutter_inappwebview) return;
      const newEvent = `inapp_segment_${event}`;
      window.flutter_inappwebview.callHandler(newEvent, eventName, traits);
    }

    if (eventName === 'purchase') {
      window.fbq('track', 'Purchase', {
        ...traits,
        currency: 'KRW',
        value: traits.price,
      });
    } else {
      window.fbq('trackCustom', eventName, traits);
    }
  };

  /**
   * segment and facebook pixel pageview
   */

  const handlePageViewEvent = () => {
    const agent = checkPlatform();

    if (agent === 'desktop') {
      analytics.page();
    } else if (agent === 'aos' || agent === 'ios') {
      if (!window?.flutter_inappwebview) return;
      window.flutter_inappwebview.callHandler('inapp_segment_screen');
    }

    window.fbq('track', 'PageView');
  };

  /**
   * 유저 정보
   */
  const segmentUserIdentify = (data?: UserT) => {
    if (!data) return;
    const id = data.id.toString();
    const traits = {
      user_id: data.id,
      user_email: data.email,
      user_phone: data.phone,
      user_name: data.name,
      user_gender: data.gender,
      user_marital: data.marital,
      user_birthed_at: data.birthed_at,
      user_calendar: data.calendar,
      user_coin: coinCalculator(data.coin),
      user_is_mail: !!data.is_mail,
      user_is_notify: !!data.is_notify,
      user_is_kakao: !!data.is_kakao,
      user_is_agree: !!data.is_agree,
      user_tags1: data.tags[0] || null,
      user_tags2: data.tags[1] || null,
      user_tags3: data.tags[2] || null,
      user_register_path: data.register_path || RegisterPathE.Web,
      user_referrer_path: data.referrer_path || ReferrerPathE.BORRA,
    };

    handleEvent({
      event: 'identify',
      eventName: id,
      traits,
    });
  };

  /**
   * 회원가입 이벤트
   */
  const handleSignInEvent = (data: UserT) => {
    const traits = {
      user_id: data.id,
      user_email: data.email,
      user_phone: data.phone,
      user_name: data.name,
      user_gender: data.gender,
      user_marital: data.marital,
      user_birthed_at: data.birthed_at,
      user_calendar: data.calendar,
      user_coin: coinCalculator(data.coin),
      user_is_mail: !!data.is_mail,
      user_is_notify: !!data.is_notify,
      user_is_kakao: !!data.is_kakao,
      user_is_agree: !!data.is_agree,
      user_tags1: data.tags[0] || null,
      user_tags2: data.tags[1] || null,
      user_tags3: data.tags[2] || null,
      user_register_path: data.register_path || null,
      user_referrer_path: data.referrer_path || ReferrerPathE.BORRA,
    };

    handleEvent({
      event: 'track',
      eventName: 'sign_up',
      traits,
    });
  };

  /**
   * 코인 충전 이벤트
   */
  const handlePaymentChargeEvent = (data: any) => {
    const traits = {
      product_id: data.id,
      product_price: data.price,
      product_method: data.method,
      content_name: data.contentName || '일반 코인 충전',
      platform: data.platform || 'web',
    };

    handleEvent({
      event: 'track',
      eventName: 'charge',
      traits,
    });
  };

  /**
   * 컨텐츠 구매 이벤트
   */
  const handleContentPurchaseEvent = (data: any) => {
    const traits = {
      id: data.purchase.id,
      content_id: data.content.id,
      content_category: data.content?.category?.name || '미등록 카테고리',
      content_name: data.content.name,
      content_price: data.content.price,
      content_discount_price: data.content.discount_price,
      content_tag1: data.content.tags[0]?.id || null,
      content_tag2: data.content.tags[1]?.id || null,
      content_tag3: data.content.tags[2]?.id || null,
      purchase_name: data.purchase.name,
      purchase_gender: data.purchase.gender,
      purchase_marital: data.purchase.marital,
      purchase_birthed_at: data.purchase.birthed_at,
      purchase_calendar: data.purchase.calendar,
      partner_name: data.purchase?.partner?.name || null,
      partner_gender: data.purchase?.partner?.gender || null,
      partner_marital: data.purchase?.partner?.marital || null,
      partner_birthed_at: data.purchase?.partner?.birthed_at || null,
      partner_calendar: data.purchase?.partner?.calendar || null,
    };

    handleEvent({
      event: 'track',
      eventName: 'purchase',
      traits,
    });
  };

  /**
   * 검색 이벤트
   */
  const handleSearchEvent = (traits: {
    keyword: string;
    user_id: number | null;
    user_name: string | null;
  }) => {
    handleEvent({
      event: 'track',
      eventName: 'search',
      traits,
    });
  };

  /**
   * 검색 후 컨텐츠 클릭 이벤트
   */
  const handleMoveSearchEvent = (traits: {
    keyword: string;
    content_id: number;
    content_name: string;
    user_id: number | null;
    user_name: string | null;
  }) => {
    handleEvent({
      event: 'track',
      eventName: 'move_search_content',
      traits,
    });
  };

  /**
   * 좋아요(장바구니) 이벤트
   */
  const handleLikeEvent = (traits: {
    content_id: number;
    content_name: string;
    user_id: number | null;
    user_name: string | null;
    is_purchase: boolean;
    is_like: boolean;
  }) => {
    handleEvent({
      event: 'track',
      eventName: 'content_like',
      traits,
    });
  };

  /**
   * 컨텐츠 공유하기 이벤트
   */
  const handleContentShareEvent = (traits: {
    content_id: number;
    content_name: string;
    user_id: number | null;
    user_name: string | null;
    share_type: ShareType;
  }) => {
    handleEvent({
      event: 'track',
      eventName: 'content_share',
      traits,
    });
  };

  /**
   * 컨텐츠 공유하기 사용 이벤트
   */
  const handleUseContentShareEvent = (traits: {
    content_id: number;
    content_name: string;
    user_id: number | null;
    user_name: string | null;
    share_type: ShareType;
  }) => {
    handleEvent({
      event: 'track',
      eventName: 'used_content_share',
      traits,
    });
  };

  /**
   * 컨텐츠 피드백 이벤트
   */
  const handleContentFeedbackEvent = (traits: {
    content_id: number;
    content_name: string;
    feedback_id: number;
    feedback_name: string;
    user_id: number | null;
    user_name: string | null;
    price: number | null;
  }) => {
    handleEvent({
      event: 'track',
      eventName: 'content_feedback',
      traits,
    });
  };

  /**
   * 상담사 좋아요
   */
  const handleCounselorLikeEvent = (traits: {
    counselor_id: number;
    counselor_name: string;
    counselor_c_id: number;
    user_id: number | null;
    user_name: string | null;
    is_like: boolean;
  }) => {
    handleEvent({
      event: 'track',
      eventName: 'counselor_like',
      traits,
    });
  };

  /**
   * 상담사 상세 페이지 전환 연결 버튼 클릭
   */
  const handleCounselorConnectEvent = (traits: {
    counselor_id: number;
    counselor_name: string;
    counselor_c_id: number;
    user_id: number | null;
    user_name: string | null;
  }) => {
    handleEvent({
      event: 'track',
      eventName: 'counselor_connect',
      traits,
    });
  };

  return {
    handlePageViewEvent,
    segmentUserIdentify,
    handleSignInEvent,
    handlePaymentChargeEvent,
    handleContentPurchaseEvent,
    handleSearchEvent,
    handleMoveSearchEvent,
    handleLikeEvent,
    handleContentShareEvent,
    handleUseContentShareEvent,
    handleContentFeedbackEvent,
    handleCounselorLikeEvent,
    handleCounselorConnectEvent,
  };
}

export default useDataCollection;
