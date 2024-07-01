import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Share from '@/components/Share';
import { fetchContentsShare } from '@/api/content';
import useAlert from '@/hooks/common/useAlert';

interface Props {
  purchaseId: number;
  content: any;
  userName: string;
}

function useContentsShare({ purchaseId, content, userName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const { renderMessage, handleReset, setAlertOptions } = useAlert();
  const { mutate, isLoading } = useMutation(
    ['share', purchaseId],
    fetchContentsShare
  );

  const handleShare = () => {
    if (isLoading || isOpen) return;
    if (url) {
      setIsOpen(true);
      setUrl(url);
      return;
    }

    mutate(purchaseId, {
      onSuccess: res => {
        setIsOpen(true);
        setUrl(res.url);
      },
      onError: () => {
        setUrl('');
        setAlertOptions({
          isOpen: true,
          description: '오류가 발생했습니다. 다시 시도해주세요.',
          handleConfirm: handleReset,
        });
      },
    });
  };

  const renderShare = () => (
    <>
      <Share
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        url={url}
        content={content}
        userName={userName}
        purchaseId={purchaseId}
      />
      {renderMessage()}
    </>
  );

  return {
    handleShare,
    renderShare,
  };
}

export default useContentsShare;
