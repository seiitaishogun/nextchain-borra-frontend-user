import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import LoginButton from '@/components/Common/LoginButton';
import {
  FirstFreeClockDescription,
  FirstFreeDescription,
  WaitFreeDescription,
} from '@/components/Contents/Detail/Form/ButtonBox/ButtonBox.styled';
import CoinBox from '@/components/Common/PriceBox/CoinBox';
import ClockBox from '@/components/Common/PriceBox/ClockBox';
import WaitFreeTimer from '@/components/Contents/Detail/Form/ButtonBox/WaitFreeTimer';
import FormButton from '@/components/Common/Button/FormButton';
import { ReferrerPathE } from '@/types/users';
import { ContentStepE } from '@/types/content/step';
import { checkFreeContent } from '@/utils/content';
import { ContentsTypeE } from '@/types/content';
import { authCheckState, loginState, userInfoState } from '@/store/auth';
import useWaitFreeTimer from '@/hooks/contents/useWaitFreeTimer';
import { ContentDetailT } from '@/types/content/detail';
import { numberWithCommas } from '@/utils/number';
import { contentStepAtom } from '@/store/content/step';
import { contentFormSelector } from '@/store/content/form';

const Confirm = dynamic(() => import('@/components/Common/Popup/Confirm'), {
  ssr: false,
});

interface Props {
  content: ContentDetailT;
  handleSubmit: () => void;
}

function Button({ content, handleSubmit }: Props) {
  const router = useRouter();
  const [isOpenPurchaseConfirm, setIsOpenPurchaseConfirm] = useState(false);
  const [isOpenReplayConfirm, setIsOpenReplayConfirm] = useState(false);
  const authCheck = useRecoilValue(authCheckState);
  const isLogin = useRecoilValue(loginState);
  const userInfo = useRecoilValue(userInfoState);
  const [contentStep, setContentStep] = useRecoilState(contentStepAtom);
  const setContentForm = useSetRecoilState(contentFormSelector(content.id));
  const {
    watch,
    getValues,
    formState: { isValid },
  } = useFormContext();
  const waitTime = useWaitFreeTimer({
    userWaitFreeTime: content.user_wait_free_time || '00:00:00',
  });

  const getPurchaseDataToString = useCallback(
    (data?: any) => {
      if (!data) return '';

      let result = '';
      if (data.name) {
        result += data.name;
      }

      if (data.gender !== null) {
        result += data.gender;
      }

      if (data.marital) {
        result += data.marital;
      }

      if (data.year) {
        result += `${data.year}-`;
      }

      if (data.month) {
        result += `${data.month.toString().padStart(2, '0')}-`;
      }

      if (data.day) {
        result += `${data.day.toString().padStart(2, '0')} `;
      }

      /**
       * 태어난 시간이 있을 경우에만 시간을 추가한다.
       */
      if (
        content.type.name === ContentsTypeE.Saju ||
        content.type.name === ContentsTypeE.Jamidusu
      ) {
        if (data.is_birthed_time) {
          const hour = (data?.hour || '').toString().padStart(2, '0');
          const minute = (data?.minute || '').toString().padStart(2, '0');
          result += `${hour}:${minute}:00${data.is_birthed_time ? '1' : '0'}`;
        } else {
          result += `00:00:00${data.is_birthed_time ? '1' : '0'}`;
        }
      }

      if (data.calendar) {
        result += data.calendar;
      }

      return result;
    },
    [content.type]
  );

  const getCardDataToString = (data?: any) => {
    let result = '';

    if (data.inner) {
      result += `${data.inner},`;
    }

    if (data.outer) {
      result += data.outer;
    }

    if (data.tarot) {
      if (Array.isArray(data.tarot)) {
        result += data.tarot.join('');
      }
    }

    return result;
  };

  const getPurchaseData = useCallback(
    () =>
      getPurchaseDataToString(user) +
      getPurchaseDataToString(partner) +
      getCardDataToString({
        inner: watch('inner'),
        outer: watch('outer'),
        tarot: watch('tarot'),
      }),
    [getPurchaseDataToString, getCardDataToString]
  );
  const { user, partner } = watch();
  const replayId = useMemo(() => {
    const purchase = content.purchases_flat
      .find(d => {
        const [, str] = d.split('|');
        return str === getPurchaseData();
      })
      ?.split('|');
    return purchase?.[0]?.toString() || null;
  }, [content.purchases_flat, getPurchaseData]);

  const renderSubmitButtonText = useMemo(
    (text?: string) => (
      <>
        {!checkFreeContent(content) && (
          <CoinBox
            price={content.price}
            discountPrice={content.discount_price}
            isDiscount={content.is_discount}
          />
        )}
        <span>{text || '결과 확인하기'}</span>
      </>
    ),
    [content, isValid]
  );

  const renderFormButton = () => {
    if (!authCheck) return null;

    /**
     * 비 로그인 상태
     * 로그인 페이지 이동
     */
    if (!isLogin) {
      const query = `referrerPath=${(
        router.query?.utm_source || ReferrerPathE.BORRA
      ).toString()}`;
      return <LoginButton query={query} />;
    }

    /**
     * 로그인 + 설문 콘텐츠
     * 설문 페이지 전환
     */
    if (content.is_survey && contentStep === ContentStepE.Detail) {
      return (
        <FormButton
          isValid={isValid}
          activeText={renderSubmitButtonText}
          disabledText={renderSubmitButtonText}
          onClick={() => {
            const formData = getValues();
            setContentForm(formData);
            setContentStep(ContentStepE.Survey);
            router.push({
              pathname: '/contents/[id]',
              query: {
                ...router.query,
                id: content.id,
                step: ContentStepE.Survey,
              },
            });
          }}
        />
      );
    }

    /**
     * 로그인 + 무료 콘텐츠
     * 즉시 구매 처리
     */
    if (checkFreeContent(content)) {
      return (
        <FormButton
          isValid={isValid}
          activeText={renderSubmitButtonText}
          disabledText={renderSubmitButtonText}
          onClick={() => handleSubmit()}
        />
      );
    }

    /**
     * 유료 + 콘텐츠 최초 무료 + 기다리면 무료가 아닌 상태
     * 즉시 구매 처리
     */
    if (
      content.is_first_free &&
      content.is_first_free_used &&
      content.wait_free_time === 0
    ) {
      return (
        <FormButton
          isValid={isValid}
          activeText={
            <FirstFreeDescription>
              <CoinBox price={content.price} discountPrice={0} isDiscount />
              <p>지금 바로 무료로 보기</p>
            </FirstFreeDescription>
          }
          disabledText={
            <FirstFreeDescription>
              <CoinBox price={content.price} discountPrice={0} isDiscount />
              <p>지금 바로 무료로 보기</p>
            </FirstFreeDescription>
          }
          onClick={() => handleSubmit()}
        />
      );
    }

    /**
     * 유료 + 콘텐츠 최초 무료 + 기다리면 무료
     * 즉시 구매 처리
     */
    if (
      content.is_first_free &&
      content.is_first_free_used &&
      content.wait_free_time > 0 &&
      content.user_wait_free_time === '00:00:00'
    ) {
      return (
        <FormButton
          isValid={isValid}
          activeText={
            <FirstFreeClockDescription>
              <ClockBox waitFreeTime={content.wait_free_time || 0} />
              <p>지금 바로 무료로 보기</p>
            </FirstFreeClockDescription>
          }
          disabledText={
            <FirstFreeClockDescription>
              <ClockBox waitFreeTime={content.wait_free_time || 0} />
              <p>지금 바로 무료로 보기</p>
            </FirstFreeClockDescription>
          }
          onClick={() => handleSubmit()}
        />
      );
    }

    /**
     * 유료 + 구매한 콘텐츠인지 확인(다시보기)
     * confirm 알럿 출력: 다시보기 or 구매
     * */
    if (replayId) {
      return (
        <FormButton
          isValid
          activeText={
            <>
              <CoinBox
                price={content.price}
                discountPrice={content.discount_price}
                isDiscount={content.is_discount}
              />
              <span>다시보기</span>
            </>
          }
          onClick={() => {
            if (
              content.type.name === ContentsTypeE.Saju ||
              content.type.name === ContentsTypeE.Jamidusu
            ) {
              setIsOpenReplayConfirm(true);
            } else {
              router.push(`/contents/${content.id}/result/${replayId}`);
            }
          }}
        />
      );
    }

    /**
     * 유료 + 기다리면 무료
     * 기다리면 무료 가능
     * 기다리면 무료 불가
     *  1. 다시보기 알럿
     *  2. 일반 구매 알럿
     */
    if (content.wait_free_time > 0) {
      return (
        <FormButton
          isValid={isValid}
          activeText={
            <WaitFreeDescription>
              <WaitFreeTimer waitTime={waitTime} />
              <p className={classNames({ active: waitTime.isUserWaitFree })}>
                {waitTime.isUserWaitFree
                  ? '지금 바로 무료로 보기'
                  : '결과 확인하기'}
              </p>
            </WaitFreeDescription>
          }
          disabledText={
            <WaitFreeDescription>
              <WaitFreeTimer waitTime={waitTime} />
              <p className={classNames({ active: waitTime.isUserWaitFree })}>
                {waitTime.isUserWaitFree
                  ? '지금 바로 무료로 보기'
                  : '결과 확인하기'}
              </p>
            </WaitFreeDescription>
          }
          onClick={() => {
            if (waitTime.isUserWaitFree) {
              handleSubmit();
            } else {
              setIsOpenPurchaseConfirm(true);
            }
          }}
        />
      );
    }

    /**
     * 유료 + 구매한 콘텐츠가 아닌 경우
     * 일반 구매
     */
    return (
      <FormButton
        isValid={isValid}
        activeText={renderSubmitButtonText}
        disabledText={renderSubmitButtonText}
        onClick={() => setIsOpenPurchaseConfirm(true)}
      />
    );
  };

  /**
   * 유료 + 구매한 콘텐츠가 아닌 경우
   * 일반 구매
   */
  return (
    <>
      {renderFormButton()}

      {/* 일반 구매 */}
      <Confirm
        isOpen={isOpenPurchaseConfirm}
        title={`보유 코인: ${numberWithCommas(userInfo?.coin || 0)}개`}
        description={
          <p>
            <div
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            >
              <CoinBox
                price={content.price}
                discountPrice={content.discount_price}
                isDiscount={content.is_discount}
              />
            </div>
            을 사용해서
            <br />
            <strong>{content.name}</strong> 을(를) 보시겠습니까?
          </p>
        }
        cancelText="아니요"
        handleCancel={() => setIsOpenPurchaseConfirm(false)}
        confirmText="예"
        handleConfirm={() => handleSubmit()}
      />

      {/* 다시보기 */}
      <Confirm
        isOpen={isOpenReplayConfirm}
        title={`보유 코인: ${numberWithCommas(userInfo?.coin || 0)}개`}
        description={
          <p>
            이미 구매한 콘텐츠입니다.
            <br />
            <div
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
              }}
            >
              <CoinBox
                price={content.price}
                discountPrice={content.discount_price}
                isDiscount={content.is_discount}
              />
            </div>
            를 사용해서 다시 보시겠습니까?
          </p>
        }
        cancelText="구매한 콘텐츠 보기"
        handleCancel={() => {
          router.push(`/contents/${content.id}/result/${replayId}`);
        }}
        confirmText="예"
        handleConfirm={() => handleSubmit()}
      />
    </>
  );
}

export default Button;
