import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { fetchContentsPurchase } from '@/api/content';
import { userInfoState } from '@/store/auth';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { getErrorMessage } from '@/utils/content/message';
import { formatContentResultData } from '@/utils/content';
import { ContentDetailT } from '@/types/content/detail';
import { coinCalculator } from '@/utils/coin';
import { contentStepAtom } from '@/store/content/step';
import { ContentStepE } from '@/types/content/step';
import { contentFormSelector } from '@/store/content/form';
import { naverAdTrack } from '@/lib/naverAd';

interface Props {
  content: ContentDetailT;
  setPurchaseData: Dispatch<SetStateAction<any>>;
  setAlertOptions: (options: any) => void;
}

function useContentPurchaseMutate({
  content,
  setPurchaseData,
  setAlertOptions,
}: Props) {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userInfoState);
  const [contentStep, setContentStep] = useRecoilState(contentStepAtom);
  const setContentForm = useSetRecoilState(contentFormSelector(content.id));
  const { handleContentPurchaseEvent } = useDataCollection();
  const advertise_used_id = router.query.advertise_used_id || null;

  return useMutation(
    (params: any) =>
      fetchContentsPurchase({
        ...params,
        advertise_used_id,
      }),
    {
      onSuccess: ({ data }) => {
        naverAdTrack({
          key: 1,
          value: content.price,
        });

        setPurchaseData(formatContentResultData(data));

        const coin = coinCalculator(data.purchase.price);
        setUserInfo(prev => ({
          ...prev,
          coin: prev?.coin ? prev.coin - coin : 0,
        }));
        handleContentPurchaseEvent(data);

        setContentForm(null);
        setContentStep(ContentStepE.Result);

        const urlOptions = {
          pathname: '/contents/[id]',
          query: {
            ...router.query,
            id: content.id,
            purchaseId: data.purchase.id,
          },
        };
        if (content.is_skip && router.query.is_skip !== '0') {
          router.replace(urlOptions);
        } else if (contentStep === ContentStepE.Survey) {
          router.replace(urlOptions);
        } else {
          router.push(urlOptions);
        }
      },

      onError: (err: any) => {
        const { status } = err.response;

        setAlertOptions({
          isOpen: true,
          description: getErrorMessage(err),
          handleConfirm: () => {
            if (status === 302) {
              router.push(`/login?redirect=/contents/${content.id}`);
            } else if (status === 402) {
              router.push(
                `/payments/charge?redirect=${encodeURIComponent(
                  router.asPath
                )}&contentName=${content.name}`
              );
            } else {
              router.replace('/');
            }
          },
        });
      },
    }
  );
}

export default useContentPurchaseMutate;
