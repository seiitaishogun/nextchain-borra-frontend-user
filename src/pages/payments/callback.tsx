import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';
import Loading from '@/components/Common/Popup/Loading';
import useAlert from '@/hooks/common/useAlert';
import { fetchPaymentsApp } from '@/api/payments';

function PaymentsCallback() {
  const router = useRouter();
  const { isLoading, isSuccess, mutate } = useMutation((params: any) =>
    fetchPaymentsApp(params)
  );
  const { renderMessage, setAlertOptions } = useAlert();

  useEffect(() => {
    if (!router.isReady) return;

    /**
     * ios 인앱 결제시 취소 버튼을 눌러도 callback 으로 이동되는 문제가 있어서 추가
     */
    const { query } = router;
    if (!query.purchase_id || query.purchase_id === 'null') {
      router.replace('/payments/charge');
      return;
    }

    if (isSuccess || isLoading) return;

    const hasInAppPurchaseInfo = hasCookie('inAppPurchaseInfo');
    const inAppPurchaseInfo = hasInAppPurchaseInfo
      ? JSON.parse(getCookie('inAppPurchaseInfo') as string)
      : {};

    mutate(
      {
        platform: query.platform,
        product_id: Number(inAppPurchaseInfo?.product_id || 0),
        app_product_id: query.product_id,
        app_purchase_id: query.purchase_id,
        price: Number(query.product_price),
        fail_reason: query?.fail_reason || null,
        hash: inAppPurchaseInfo?.hash || '',
      },
      {
        onSuccess: ({ id }: { id: number }) => {
          deleteCookie('inAppPurchaseInfo');
          if (id) {
            router.replace(`/payments/result/${id}`);
          } else {
            setAlertOptions({
              isOpen: true,
              description: '오류가 발생했습니다. 다시 시도해주세요.',
              handleConfirm: () => {
                router.replace('/payment/charge');
              },
            });
          }
        },
        onError: () => {
          deleteCookie('inAppPurchaseInfo');
          setAlertOptions({
            isOpen: true,
            description: '오류가 발생했습니다. 다시 시도해주세요.',
            handleConfirm: () => {
              router.replace('/payment/charge');
            },
          });
        },
      }
    );
  }, [router.query]);

  if (isLoading || !isSuccess) return <Loading isOpen />;
  return <>{renderMessage()}</>;
}

export default PaymentsCallback;
