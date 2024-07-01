import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { ShareSocialItem } from '@/components/Share/Share.styled';
import { ShareType } from '@/components/Share/Share.type';
import useAppCheck from '@/hooks/app/useAppCheck';
import useAppContentShare from '@/hooks/app/useAppContentShare';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { userInfoState } from '@/store/auth';

interface Props {
  content: any;
  purchaseId: number;
  url: string;
  userName: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ShareKakao({ content, purchaseId, url, userName, setIsOpen }: Props) {
  const userInfo = useRecoilValue(userInfoState);
  const { handleContentShareEvent } = useDataCollection();
  const { appContentShareKakao } = useAppContentShare();
  const { isApp } = useAppCheck();
  const defaultImage = `${process.env.APP_URL || ''}${
    process.env.APP_IMAGE_URL
  }/contents/thumbnail/default_thumbnail_square.png`;
  const description = `${userName}님이 보라에서 ${content.name}에 관한 이야기를 펼쳐보았어요. 같이 보러가실래요?`;
  const shareMessage = () => {
    if (isApp === null) return;

    if (isApp) {
      appContentShareKakao({
        contentId: content.id,
        purchaseId,
        contentName: content.name,
        description,
      });
    } else {
      if (!window.Kakao) return;
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
      }
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: content.name,
          description,
          imageUrl: content?.thumbnail?.path || defaultImage,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      });
    }

    setIsOpen(false);
    handleContentShareEvent({
      content_id: content.id,
      content_name: content.name,
      user_id: userInfo?.id || null,
      user_name: userInfo?.name || null,
      share_type: ShareType.KAKAO,
    });
  };

  return (
    <ShareSocialItem
      image={`${process.env.APP_IMAGE_URL}/share/share_kakao.svg`}
      onClick={shareMessage}
    />
  );
}

export default ShareKakao;
