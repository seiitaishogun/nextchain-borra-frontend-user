import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Loading from '@/components/Common/Popup/Loading';
import Title from '@/components/Common/Title';
import { fetchPaymentsResult } from '@/api/payments';
import { setLoginToken } from '@/utils/axios';
import useAlert from '@/hooks/common/useAlert';
import { userInfoState } from '@/store/auth';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { getContentName, getRedirectUrl } from '@/utils/referrer';
import { numberWithCommas } from '@/utils/number';

const Layout = styled.div`
  margin-top: 40px;
  padding: 0 16px;

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 42px;

    > button {
      width: 100%;
      height: 52px;
      border: none;
      border-radius: 10px;
      background: #8986ff;
      color: #fff;
      font-weight: 500;
      font-size: 16px;
    }
  }
`;
const Index = styled.div`
  padding-bottom: 50px;

  strong {
    font-size: 20px;
    font-weight: 700;
  }
`;
const ResultInfo = styled.div`
  width: 100%;
`;
const InfoFlex = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  &:first-child {
    border-bottom: 1px solid lightgrey;
  }

  span {
    color: grey;
  }
`;

function PaymentResult() {
  const router = useRouter();
  const [token, setToken] = useState<null | string>(null);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { setAlertOptions, renderMessage } = useAlert();
  const { handlePaymentChargeEvent } = useDataCollection();

  const { data, isLoading, isError } = useQuery(
    ['paymentsResult', router.query.id],
    () =>
      fetchPaymentsResult({
        id: Number(router.query.id),
      }),
    {
      enabled: router.isReady && !!token,
      select: res => res.data,
      onSuccess: res => {
        const addCoin = Number(res.title.replace(/코인/i, ''));
        setUserInfo({
          ...userInfo,
          coin: (userInfo?.coin || 0) + addCoin,
        });

        const contentName = getContentName();
        handlePaymentChargeEvent({
          ...res,
          contentName,
        });
      },
      onError: () => {
        setAlertOptions({
          isOpen: true,
          description: '결제 정보를 불러오는데 실패했습니다.',
          handleConfirm: () => {
            router.replace('/payments/charge');
          },
        });
      },
    }
  );

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      setToken('error');
    } else {
      setLoginToken(access_token);
      setToken(access_token);
    }

    return () => {
      localStorage.removeItem('access_token');
    };
  }, []);

  const handleConfirm = () => {
    const referrer = getRedirectUrl();
    router.push(referrer);
  };

  if (isLoading) return <Loading isOpen />;
  if (isError) return renderMessage();

  return (
    <Layout>
      <Index>
        <Title title={`${data.title} 구매 완료`} />
      </Index>

      <ResultInfo>
        <InfoFlex>
          <div>결제 수단</div>
          <div>
            <span>{data.method}</span>
          </div>
        </InfoFlex>
        <InfoFlex>
          <div>
            <span>결제 금액</span>
          </div>
          <div>
            <span>{numberWithCommas(data.price || 0)}원</span>
          </div>
        </InfoFlex>
      </ResultInfo>

      <div className="button-wrapper">
        <button type="button" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </Layout>
  );
}

export default PaymentResult;
