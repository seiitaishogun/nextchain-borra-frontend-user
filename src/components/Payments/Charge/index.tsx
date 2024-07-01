import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { deleteCookie, setCookie } from 'cookies-next';
import Title from '@/components/Common/Title';
import MultiRadio from '@/components/Common/Form/Radio';
import Confirm from '@/components/Common/Popup/Confirm';
import LabelText from '@/components/Payments/Charge/LabelText';
import FormButton from '@/components/Common/Button/FormButton';
import Agreement from '@/components/Common/Agreement';
import Loading from '@/components/Common/Popup/Loading';
import Popup from '@/components/Common/Popup';
import {
  fetchPaymentsCid,
  fetchPaymentsHash,
  fetchPaymentsProducts,
  fetchPaymentsWeb,
  WebProps,
} from '@/api/payments';
import { checkPlatform, isMobile } from '@/utils/agent';
import { PgCode } from '@/types/payments';
import useAlert from '@/hooks/common/useAlert';
import { setContentName, setReferrer } from '@/utils/referrer';

const Layout = styled.div`
  margin-top: 32px;
  font-size: 14px;

  .button-wrapper {
    margin-top: 30px;

    .btn-payment {
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

const Price = styled.div`
  .options {
    margin-top: 16px;

    > div {
      flex-direction: column;

      label {
        display: inline-flex;
        box-sizing: border-box;
        margin: 5px 0;
        padding: 10px 0 10px 18px;
        height: fit-content;
        border-radius: 25px;
        border: solid 1px #e1e8f4;
        background: #fff;
        cursor: pointer;
      }
    }
  }
`;

const Payment = styled.div`
  margin-top: 22px;
  font-size: 14px;

  .options {
    display: flex;
    margin-top: 6px;

    label {
      margin-top: 10px;
    }
  }
`;

function Charge() {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [payment, setPayment] = useState<any>(null);
  const [paymentURL, setPaymentURL] = useState<string>('');
  const [isIosProgress, setIsIosProgress] = useState(false);
  const isApp = !!window?.flutter_inappwebview;
  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(isApp ? appSchema : webSchema),
    defaultValues: {
      product_id: '',
      pgcode: '',
      privacy_agree: false,
    },
  });
  const { renderMessage, setAlertOptions, handleReset } = useAlert();
  const webMutate = useMutation(['paymentsWeb'], fetchPaymentsWeb);
  const hashMutate = useMutation(['paymentsAppHash'], fetchPaymentsHash);
  const { mutate: failMutate, isLoading } = useMutation(
    ['paymentsCid'],
    fetchPaymentsCid,
    {
      retry: 5,
      retryDelay: 500,
      onSuccess: res => {
        router.push(`/payments/result/${res.id}`);
      },
      onError: () => {
        alert('결제에 실패하였습니다.');
        setPaymentURL('');
      },
    }
  );

  const { data } = useQuery(['paymentsProducts'], fetchPaymentsProducts, {
    initialData: {
      method: [],
      products: [],
    },
    select: res => {
      const { method, products } = res;

      return {
        method: method.map((m: any) => ({
          value: m.name,
          labelText: m.content,
        })),
        products: products
          .filter((p: any) => {
            const agent = checkPlatform();

            if (agent === 'ios') {
              return p.price_ios > 0;
            }

            if (agent === 'aos') {
              return p.price_aos > 0;
            }

            return p.price > 0;
          })
          .map((p: any) => ({
            value: p.id,
            labelText: <LabelText product={p} />,
          })),
        origin_product: products,
      };
    },
  });

  useEffect(() => {
    const messageCallback = (e: MessageEvent<any>) => {
      if (payment || isApp) return;
      if (e.data.isPayment) {
        setPayment(e.data);

        if (e.data.code === '0') {
          router.push(`/payments/result/${e.data.id}`);
        } else if (!e.data.code) {
          failMutate({
            cid: e.data.id,
          });
        } else {
          const message = e.data.message || '결제에 실패하였습니다.';
          alert(message);
          setPaymentURL('');
        }
      }
    };

    window.addEventListener('message', messageCallback);

    return () => {
      window.removeEventListener('message', messageCallback);
    };
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    const referrer = (router.query?.redirect || '').toString();
    setReferrer(referrer);

    const contentName = (router.query?.contentName || '').toString();
    setContentName(contentName);
  }, [router.isReady]);

  const handleSubmit = () => {
    if (hashMutate.isLoading || isIosProgress) return;
    const product_id = Number(getValues('product_id'));

    hashMutate.mutate(
      {
        product_id,
      },
      {
        onSuccess: hash => {
          if (isApp) {
            handleInAppPurchase(hash);
          } else {
            handleWebPurchase(hash);
          }
        },
        onError: () => {
          deleteCookie('inAppPurchaseInfo');
          setAlertOptions({
            isOpen: true,
            description: '오류가 발생했습니다. 다시 시도해주세요.',
            handleConfirm: () => {
              handleReset();
              setOpenConfirm(false);
            },
          });
        },
      }
    );
  };

  const handleInAppPurchase = (hash: string) => {
    const product_id = Number(getValues('product_id'));
    const { code } = data.origin_product.find((p: any) => p.id === product_id);
    setCookie('inAppPurchaseInfo', JSON.stringify({ hash, product_id }));
    setOpenConfirm(false);

    const agent = checkPlatform();
    if (agent === 'ios') {
      setIsIosProgress(true);
    }

    try {
      window.flutter_inappwebview.callHandler('inapp_purchase', code);
    } catch {
      deleteCookie('inAppPurchaseInfo');
    }
  };

  const handleWebPurchase = (hash: string) => {
    if (webMutate.isLoading) return;
    const { product_id, pgcode } = getValues();
    const params: WebProps = {
      product_id: Number(product_id),
      pgcode: pgcode as PgCode,
      hash,
    };

    webMutate.mutate(params, {
      onSuccess: res => {
        if (isMobile()) {
          setPaymentURL(res.mobile_url);
        } else {
          setPaymentURL(res.online_url);
        }
        setOpenConfirm(false);
      },
      onError: () => {
        setAlertOptions({
          isOpen: true,
          description: '오류가 발생했습니다. 다시 시도해주세요.',
          handleConfirm: () => {
            handleReset();
            setOpenConfirm(false);
          },
        });
      },
    });
  };

  return (
    <Layout>
      <form>
        <Price>
          <Title title="충전하기" />
          <div className="options">
            <MultiRadio
              control={control}
              name="product_id"
              radios={data.products}
            />
          </div>
        </Price>

        {!isApp && (
          <Payment>
            <Title title="충전방법" />
            <div className="options">
              <MultiRadio
                control={control}
                name="pgcode"
                radios={data.method}
              />
            </div>
          </Payment>
        )}

        <Agreement isAllChecked={false} control={control} items={AGREEMENTS} />

        <div className="button-wrapper">
          <FormButton
            isValid={isValid && !isIosProgress}
            activeText="충전하기"
            disabledText="충전하기"
            onClick={() => setOpenConfirm(true)}
          />
        </div>
      </form>

      <Confirm
        isOpen={openConfirm}
        title="코인 충전"
        description="충전을 진행하시겠습니까?"
        handleCancel={() => setOpenConfirm(false)}
        handleConfirm={handleSubmit}
      />

      {renderMessage()}

      <Popup isOpen={!!paymentURL}>
        <iframe
          title="payment"
          id="payment"
          src={paymentURL}
          style={{
            overflow: 'hidden',
            width: '420px',
            height: '80vh',
          }}
          height="100%"
        />
      </Popup>

      <Loading isOpen={isLoading || isIosProgress} />
    </Layout>
  );
}

export default Charge;

const AGREEMENTS = [
  {
    name: 'privacy_agree',
    isRequired: true,
    text: '개인정보 수집·이용 동의',
    links: [
      {
        height: 530,
        link: 'https://app.catchsecu.com/document/C/9120582dc71a11e',
      },
    ],
  },
];

const webSchema = yup.object().shape({
  product_id: yup.number().required(),
  pgcode: yup.string().ensure().required(),
  privacy_agree: yup.boolean().oneOf([true]).required(),
});

const appSchema = yup.object().shape({
  product_id: yup.number().required(),
  privacy_agree: yup.boolean().oneOf([true]).required(),
});
