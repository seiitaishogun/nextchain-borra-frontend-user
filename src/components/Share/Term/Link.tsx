import { Dispatch, SetStateAction, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import { useRecoilValue } from 'recoil';
import { ShareSocialItem } from '@/components/Share/Share.styled';
import { ShareType } from '@/components/Share/Share.type';
import useAppContentShare from '@/hooks/app/useAppContentShare';
import useAppCheck from '@/hooks/app/useAppCheck';
import { userInfoState } from '@/store/auth';
import useDataCollection from '@/hooks/sdk/useDataCollection';

interface Props {
  content: any;
  purchaseId: number;
  url: string;
  setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ShareLink({
  content,
  purchaseId,
  url,
  setOpenSnackbar,
  setIsOpen,
}: Props) {
  const userInfo = useRecoilValue(userInfoState);
  const { handleContentShareEvent } = useDataCollection();
  const { appContentShareLink } = useAppContentShare();
  const { isApp } = useAppCheck();

  const handleCopy = useCallback(() => {
    if (isApp) {
      appContentShareLink({
        contentId: content.id,
        purchaseId,
      });
    } else {
      copy(url);
      setOpenSnackbar(true);
    }

    setIsOpen(false);

    handleContentShareEvent({
      content_id: content.id,
      content_name: content.name,
      user_id: userInfo?.id || null,
      user_name: userInfo?.name || null,
      share_type: ShareType.Copy,
    });
  }, [url, isApp]);

  return (
    <ShareSocialItem
      image={`${process.env.APP_IMAGE_URL}/share/share_link.svg`}
      onClick={handleCopy}
    />
  );
}

export default ShareLink;
