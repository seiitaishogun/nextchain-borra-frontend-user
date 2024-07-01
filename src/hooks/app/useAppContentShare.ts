interface CommonShareProps {
  contentId: number | string;
  purchaseId: number | string;
}

interface KakaoShareProps extends CommonShareProps {
  contentName: string;
  description: string;
}

interface ContentShareProps extends KakaoShareProps {
  eventName: string;
}

function useAppContentShare() {
  const appContentShare = ({
    eventName,
    contentId,
    purchaseId,
    contentName,
    description,
  }: ContentShareProps) => {
    window?.flutter_inappwebview?.callHandler(
      eventName,
      contentId.toString(),
      purchaseId.toString(),
      contentName.toString(),
      description
    );
  };

  const appContentShareKakao = ({
    contentId,
    purchaseId,
    contentName,
    description,
  }: KakaoShareProps) => {
    appContentShare({
      eventName: 'content_share_kakao',
      contentId,
      purchaseId,
      contentName,
      description,
    });
  };

  const appContentShareLink = ({ contentId, purchaseId }: CommonShareProps) => {
    appContentShare({
      eventName: 'content_share_linkcopy',
      contentId,
      purchaseId,
      contentName: '',
      description: '',
    });
  };

  return {
    appContentShareKakao,
    appContentShareLink,
  };
}

export default useAppContentShare;
