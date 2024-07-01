import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import ContentDetail from '@/components/Contents/Detail';
import HistoryHeader from '@/components/Common/Layout/HistoryHeader';
import NormalLayout from '@/components/Common/Layout/Normal';
import ContentAdvertise from '@/components/Contents/Advertise';
import Snackbar from '@/components/Common/Snackbar';
import ContentSurvey from '@/components/Contents/Survey';
import { fetchContentDetail } from '@/api/content';
import useContentPurchaseMutate from '@/hooks/contents/useContentPurchaseMutate';
import useAlert from '@/hooks/common/useAlert';
import { getErrorMessage } from '@/utils/content/message';
import useContentLike from '@/hooks/contents/useContentLike';
import { ContentDetailT } from '@/types/content/detail';
import { contentStepAtom, isAdvertiseAtom } from '@/store/content/step';
import { ContentStepE } from '@/types/content/step';
import { LikeType } from '@/types/like';
import { naverAdTrackContainerKey } from '@/lib/naverAd';

const ContentResult = dynamic(() => import('@/components/Contents/Result'), {
  ssr: false,
});

const Loading = dynamic(() => import('@/components/Common/Popup/Loading'), {
  ssr: false,
});

function ContentsDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const [contentStep, setContentStep] = useRecoilState(contentStepAtom);
  const [isAdvertise] = useRecoilState(isAdvertiseAtom);
  const { renderMessage, setAlertOptions } = useAlert();
  const id = Number(searchParams.get('id'));
  const purchaseId = Number(searchParams.get('purchaseId') || 0);

  const {
    data: content,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(['contentsDetail', id], () => fetchContentDetail({ id }), {
    enabled: searchParams.has('id') && !searchParams.has('purchaseId'),
    initialData: () => ({
      data: {} as ContentDetailT,
    }),
    select: res => ({
      ...res.data,
      user_wait_free_time: res.data.user_wait_free_time ?? '00:00:00',
    }),
    onSuccess: res => {
      const isSkip = searchParams.get('is_skip');
      if (res.is_skip && isSkip !== '0') {
        purchaseMutate.mutate({
          id,
          data: [null],
        });
        setContentStep(ContentStepE.Result);
      } else if (contentStep !== null && searchParams.has('step')) {
        const step = searchParams.get('step') as ContentStepE;
        if (step === ContentStepE.Survey) {
          setContentStep(ContentStepE.Survey);
        } else {
          setContentStep(ContentStepE.Detail);
        }
      } else {
        setContentStep(ContentStepE.Detail);
      }
    },
    onError: (err: any) => {
      setAlertOptions({
        isOpen: true,
        description: getErrorMessage(err),
        handleConfirm: () => {
          router.replace('/');
        },
      });
    },
  });

  const purchaseMutate = useContentPurchaseMutate({
    content,
    setPurchaseData,
    setAlertOptions,
  });
  const isLike = useContentLike({ type: LikeType.Content, id });

  useEffect(() => {
    if (
      searchParams.has('id') &&
      searchParams.has('purchaseId') &&
      !purchaseData
    ) {
      router.replace(`/contents/${id}/result/${purchaseId}`);
    }
  }, [searchParams, purchaseData]);

  const handleHideSnackbar = () => {
    setPurchaseData((prev: any) => ({
      ...prev,
      message: '',
    }));
  };

  const renderPage = () => {
    if (contentStep === ContentStepE.Detail && isSuccess && content?.id) {
      return (
        <ContentDetail
          content={content}
          isLike={isLike}
          setPurchaseData={setPurchaseData}
        />
      );
    }

    if (contentStep === ContentStepE.Survey && isSuccess && content?.id) {
      return (
        <ContentSurvey content={content} setPurchaseData={setPurchaseData} />
      );
    }

    if (contentStep === ContentStepE.Result && purchaseData) {
      return (
        <>
          <ContentResult data={purchaseData} isLike={isLike} isShare={false} />
          <Snackbar
            isOpen={!!purchaseData.message}
            setIsOpen={handleHideSnackbar}
            message={purchaseData.message}
          />
        </>
      );
    }

    return null;
  };

  if (isLoading || purchaseMutate.isLoading)
    return <Loading isOpen={isLoading} />;
  if (isAdvertise) {
    return <ContentAdvertise contentId={content.id} type={content.type} />;
  }
  if (isError || purchaseMutate.isError) return renderMessage();
  if (!searchParams.has('id')) return null;

  return (
    <section>
      <HistoryHeader name={content.name} />

      {renderPage()}

      <div id={naverAdTrackContainerKey} />
    </section>
  );
}

ContentsDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <NormalLayout>{page}</NormalLayout>;
};

export default ContentsDetail;
