import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Modal } from '@mui/material';
import ShareLink from '@/components/Share/Term/Link';
import ShareKakao from '@/components/Share/Term/Kakao';
import {
  Layout,
  ShareSocial,
  ShareTitle,
} from '@/components/Share/Share.styled';
import { ShareType } from '@/components/Share/Share.type';
import Snackbar from '@/components/Common/Snackbar';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  url: string;
  content: any;
  userName: string;
  purchaseId: number;
}

function Share({
  isOpen,
  setIsOpen,
  url,
  content,
  userName,
  purchaseId,
}: Props) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const getUTMUrl = useCallback((type: ShareType) => `${url}${type}`, [url]);
  const handlePopupClose = useCallback(() => setIsOpen(false), []);
  return (
    // TODO: Popup 컴포넌트 스타일 수정후 연동
    <>
      <Modal
        open={isOpen}
        onClose={handlePopupClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Layout>
          <ShareTitle>친구에게 공유하기</ShareTitle>
          <ShareSocial>
            <ShareKakao
              content={content}
              purchaseId={purchaseId}
              url={getUTMUrl(ShareType.KAKAO)}
              userName={userName}
              setIsOpen={setIsOpen}
            />
            <ShareLink
              content={content}
              purchaseId={purchaseId}
              url={getUTMUrl(ShareType.Copy)}
              setOpenSnackbar={setOpenSnackbar}
              setIsOpen={setIsOpen}
            />
          </ShareSocial>
        </Layout>
      </Modal>

      <Snackbar
        isOpen={openSnackbar}
        setIsOpen={setOpenSnackbar}
        message="클립보드에 링크가 복사되었어요."
      />
    </>
  );
}

export default Share;
