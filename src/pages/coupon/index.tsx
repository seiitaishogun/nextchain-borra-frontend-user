import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import AuthCheck from '@/components/Auth/AuthCheck';
import useAlert from '@/hooks/common/useAlert';
import { CouponProps, fetchCouponCreate } from '@/api/coupon';
import { coinCalculator } from '@/utils/coin';
import { userInfoState } from '@/store/auth';

function Coupon() {
  const router = useRouter();
  const { code } = router.query;
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { mutate, isLoading } = useMutation(fetchCouponCreate);
  const { renderMessage, setAlertOptions } = useAlert();

  useEffect(() => {
    if (!router.isReady || isLoading) return;

    const params: CouponProps = {
      code: code as string,
    };

    mutate(params, {
      onSuccess: ({ data }) => {
        const { name, price, url } = data;
        const coin = coinCalculator(price);
        setUserInfo({
          ...userInfo,
          coin: (userInfo?.coin || 0) + coin,
        });

        setAlertOptions({
          isOpen: true,
          description: `${name}\n${coin}코인이 적립되었습니다.`,
          handleConfirm: () => {
            window.location.href = url || '/';
          },
        });
      },
      onError: (err: any) => {
        const { data } = err.response;
        setAlertOptions({
          isOpen: true,
          description: data.message || '올바르지 않은 쿠폰입니다.',
          handleConfirm: () => {
            window.location.href = '/';
          },
        });
      },
    });
  }, [router.isReady, code]);

  return <AuthCheck>{renderMessage()}</AuthCheck>;
}

export default Coupon;
