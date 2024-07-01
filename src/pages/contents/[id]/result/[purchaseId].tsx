import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Result from '@/components/Contents/Result';
import Loading from '@/components/Common/Popup/Loading';
import HistoryHeader from '@/components/Common/Layout/HistoryHeader';
import NormalLayout from '@/components/Common/Layout/Normal';
import { ShareType } from '@/components/Share/Share.type';
import { fetchContentsResult } from '@/api/content';
import useAlert from '@/hooks/common/useAlert';
import { userInfoState } from '@/store/auth';
import { formatContentResultData } from '@/utils/content';
import { OriginContentResultDataT } from '@/types/content';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { LikeType } from '@/types/like';
import useContentLike from '@/hooks/contents/useContentLike';

function ContentsResult() {
  const router = useRouter();
  const id = Number(router.query.id);
  const purchasesId = Number(router.query.purchaseId);
  const code = router.query?.code ? router.query?.code.toString() : null;
  const userInfo = useRecoilValue(userInfoState);
  const [isShare, setIsShare] = useState(false);
  const { handleUseContentShareEvent } = useDataCollection();
  const { renderMessage, setAlertOptions } = useAlert();
  const { data, isLoading, isError } = useQuery(
    ['contentsResult', purchasesId],
    () =>
      fetchContentsResult({
        id: purchasesId,
        code,
      }),
    {
      enabled: router.isReady,
      select: (res: { data: OriginContentResultDataT }) =>
        formatContentResultData(res.data),
      onSuccess: res => {
        if (code) {
          setIsShare(true);

          const share_type = router.query.utm_term as ShareType;
          handleUseContentShareEvent({
            content_id: id,
            content_name: res?.content?.name || '',
            user_id: userInfo?.id || null,
            user_name: userInfo?.name || null,
            share_type,
          });
        }
      },
      onError: (err: any) => {
        let message = '오류가 발생했습니다. 다시 시도해주세요.';
        const { status } = err.response;

        if (status === 403) {
          message = '다시보기 기간이 만료되었습니다.';
        } else if (status === 404) {
          if (code) {
            message = '공유하기 링크가 잘못되었습니다.';
          } else {
            message = '본인이 구매한 콘텐츠만 이용가능합니다.';
          }
        }

        setAlertOptions({
          isOpen: true,
          description: message,
          handleConfirm: () => {
            router.back();
          },
        });
      },
    }
  );

  const isLike = useContentLike({
    id,
    type: LikeType.Content,
  });

  if (isLoading) return <Loading isOpen />;
  if (isError) return renderMessage();

  return (
    <>
      <HistoryHeader name={data?.content?.name || ''} />
      <Result data={data} isLike={isLike} isShare={isShare} />
    </>
  );
}

ContentsResult.getLayout = function getLayout(page: React.ReactNode) {
  return <NormalLayout>{page}</NormalLayout>;
};

export default ContentsResult;
