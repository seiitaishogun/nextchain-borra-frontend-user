import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import Title from '@/components/Common/Title';
import Tag from '@/components/Common/Tag';
import Confirm from '@/components/Common/Popup/Confirm';
import UpdateUserForm from '@/components/Accounts/Form/UpdateUser';
import FormButton from '@/components/Common/Button/FormButton';
import Agreement from '@/components/Common/Agreement';
import LinkTitle from '@/components/Common/Title/LinkTitle';
import { userInfoState } from '@/store/auth';
import { getSplitDate } from '@/utils/date';
import { fetchRegister, leave } from '@/api/auth';
import useFormTrigger from '@/hooks/form/useFormTrigger';
import useAlert from '@/hooks/common/useAlert';
import usePreventLeave from '@/hooks/common/usePreventLeave';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { getRedirectUrl, getReferrerPath } from '@/utils/referrer';
import { getRegisterPath } from '@/utils/user';
import { naverAdTrack } from '@/lib/naverAd';

interface Props {
  isRegister: boolean;
}

const Layout = styled.form`
  .my-info {
    .tags {
      margin-top: 40px;
    }

    > button {
      margin-top: 20px;
      width: 100%;
      height: 52px;
      border-radius: 10px;
      border: none;
      background: #8986ff;
      color: #fff;
      font-weight: 500;

      &.disabled {
        background: rgba(0, 0, 0, 0.5);
      }
    }
  }

  .link-setting {
    margin-top: 40px;
    padding-bottom: 30px;
  }
`;

const LeaveButton = styled.button`
  margin-bottom: 5px;
  font-weight: normal;
  font-size: 14px;
  color: #999;
  letter-spacing: -0.18px;
`;

const LeaveBox = styled.div`
  margin-top: 5px;

  input {
    width: 100%;
    height: 19px;
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: normal;
    font-size: 16px;
    color: #000;
    text-align: center;
    letter-spacing: -0.21px;
    outline: none;

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

function MyInfo({ isRegister }: Props) {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openLeave, setOpenLeave] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [leaveText, setLeaveText] = useState('');
  const {
    control,
    reset,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { isValid },
  } = useForm<any>({
    mode: 'all',
    resolver: yupResolver(getSchema(isRegister)),
    defaultValues,
  });
  const { handleTrigger } = useFormTrigger({ trigger });
  const { mutate, isLoading } = useMutation(fetchRegister);
  const leaveMutate = useMutation(['leave'], leave);
  const { renderMessage, setAlertOptions, handleReset } = useAlert();
  const { handleDestroy } = usePreventLeave({
    message: isRegister
      ? '보라 이용을 위해 정보 입력이 필요합니다'
      : '변경사항을 저장하지 않고 이동하시겠습니까?',
  });
  const { segmentUserIdentify, handleSignInEvent } = useDataCollection();

  useEffect(() => {
    const { year, month, day, ...birthed_at } = getSplitDate(
      userInfo?.birthed_at || null
    );

    reset({
      name: userInfo?.name || '',
      gender:
        typeof userInfo?.gender === 'number' ? userInfo.gender.toString() : '',
      marital: userInfo?.marital || '',
      calendar: userInfo?.calendar || '',
      year: year || '',
      month: month || '',
      day: day || '',
      tags: userInfo?.tags || [],
      is_kakao: userInfo?.is_kakao || false,
      is_mail: userInfo?.is_mail || false,
      is_notify: userInfo?.is_notify || false,
      is_birthed_time: isRegister ? false : userInfo?.is_birthed_time,
      ...birthed_at,
    });

    handleTrigger();

    return () => {
      reset();
    };
  }, []);

  const handleSubmit = () => {
    if (isLoading) return;
    const {
      year,
      month,
      gender,
      day,
      hour,
      minute,
      is_birthed_time,
      is_agree,
      ...user
    } = getValues();
    const register_path = isRegister ? getRegisterPath() : null;
    const referrer_path = isRegister ? getReferrerPath() : null;
    const params = {
      ...user,
      gender: Number(gender),
      birthed_at: format(
        new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
          is_birthed_time ? Number(hour) : 0,
          is_birthed_time ? Number(minute) : 0
        ),
        'yyyy-MM-dd HH:mm:00'
      ),
      is_birthed_time,
      is_agree: isRegister ? is_agree : userInfo?.is_agree || 0,
      register_path,
      referrer_path,
    };

    mutate(params, {
      onSuccess: () => {
        naverAdTrack({
          key: 2,
          value: 0,
        });
        setAlertOptions({
          isOpen: true,
          description: isRegister
            ? '회원가입이 완료되었습니다.'
            : '회원정보가 수정되었습니다.',
          handleConfirm: () => {
            const newUserInfo = {
              ...userInfo,
              ...params,
            };
            setUserInfo(newUserInfo);
            segmentUserIdentify(newUserInfo);

            if (isRegister) {
              handleSignInEvent(newUserInfo);
              const referrer = getRedirectUrl();
              router.push(referrer);
            } else {
              router.push('/accounts');
            }
          },
          container: () => document.querySelector('.my-info'),
        });
        setOpenConfirm(false);
        handleDestroy();
      },
      onError: () => {
        setAlertOptions({
          isOpen: true,
          description: '오류가 발생했습니다. 다시 시도해주세요.',
          handleConfirm: handleReset,
        });
      },
    });
  };

  const selectedTag = watch('tags').map((tag: number | string) =>
    tag.toString()
  );

  const handleClickTag = (tagId: string) => {
    if (selectedTag.includes(tagId.toString())) {
      setValue(
        'tags',
        selectedTag.filter((tag: string) => tag !== tagId.toString())
      );

      handleTrigger();
      return;
    }

    if (selectedTag.length === 3) {
      setAlertOptions({
        isOpen: true,
        description: '관심태그는 최대 3개까지 선택 가능합니다.',
        handleConfirm: handleReset,
      });
      return;
    }

    setValue('tags', [...selectedTag, tagId]);
    handleTrigger();
  };

  const handleIsBirthedTime = () => {
    setValue('hour', '');
    setValue('minute', '');
    setValue('is_birthed_time', !watch('is_birthed_time'));
    handleTrigger();
  };

  const handleAllCheck = () => {
    const check = !getValues('is_agree_all');
    AGREEMENTS.forEach(({ name }) => {
      setValue(name, check);
    });
    handleTrigger();
  };

  const handleLeave = () => {
    if (!leaveText) {
      setAlertOptions({
        isOpen: true,
        description: '탈퇴 사유를 입력해주세요.',
        handleConfirm: handleReset,
      });
      return;
    }

    if (leaveMutate.isLoading) return;

    leaveMutate.mutate(
      {
        deleted_reason: leaveText,
      },
      {
        onSuccess: ({ message }) => {
          handleDestroy();
          deleteCookie('access_token');
          setAlertOptions({
            isOpen: true,
            description: message,
            handleConfirm: () => {
              window.location.href = '/';
            },
          });
        },
        onError: () => {
          setAlertOptions({
            isOpen: true,
            description: '오류가 발생했습니다. 다시 시도해주세요.',
            handleConfirm: handleReset,
          });
        },
      }
    );
  };

  const title = isRegister ? '내 정보 입력' : '내 정보 수정';

  return (
    <Layout>
      <section className="my-info">
        <Title title={title} />
        <UpdateUserForm
          control={control}
          isRegister={isRegister}
          handleIsBirthedTime={handleIsBirthedTime}
        />
        <div className="tags">
          <Title title="지금 내 관심은..." />
          <Tag selectedTag={selectedTag} onClick={handleClickTag} />
        </div>
        {isRegister && (
          <Agreement
            isAllChecked
            handleAllCheck={handleAllCheck}
            control={control}
            items={AGREEMENTS}
          />
        )}
        {!isRegister && (
          <LinkTitle
            className="link-setting"
            title="수신 설정"
            href="/accounts/setting"
          />
        )}

        {!isRegister && (
          <div>
            <LeaveButton type="button" onClick={() => setOpenLeave(true)}>
              회원 탈퇴
            </LeaveButton>
            <Confirm
              isOpen={openLeave}
              title="탈퇴하시겠습니까?"
              description={
                <LeaveBox>
                  <input
                    type="text"
                    value={leaveText}
                    onChange={e => setLeaveText(e.target.value)}
                    placeholder="탈퇴사유를 입력해주세요"
                  />
                </LeaveBox>
              }
              handleCancel={() => setOpenLeave(false)}
              confirmText="탈퇴"
              handleConfirm={handleLeave}
            />
          </div>
        )}

        <FormButton
          isValid={isValid}
          activeText={isRegister ? '회원가입' : undefined}
          onClick={() => setOpenConfirm(true)}
        />
      </section>

      <Confirm
        isOpen={openConfirm}
        title={isRegister ? '회원가입' : '변경사항 저장'}
        description={
          isRegister
            ? '회원정보를 저장하시겠습니까?'
            : '변경사항을 저장하시겠습니까?'
        }
        handleCancel={() => setOpenConfirm(false)}
        confirmText="저장"
        handleConfirm={handleSubmit}
      />

      {renderMessage()}
    </Layout>
  );
}

export default MyInfo;

const AGREEMENTS = [
  {
    name: 'is_agree',
    isRequired: true,
    text: '개인정보 수집·이용 동의',
    links: [
      {
        height: 440,
        link: 'https://app.catchsecu.com/document/C/4b536adc149ae8f',
      },
      {
        height: 550,
        link: 'https://app.catchsecu.com/document/C/9120582dc71a11e',
      },
    ],
  },
  {
    name: 'is_notify',
    isRequired: false,
    text: '마케팅 활용 및 광고성 정보 수신 동의',
    links: [
      {
        height: 510,
        link: 'https://app.catchsecu.com/document/C/3e493b42869b1db',
      },
      {
        height: 500,
        link: 'https://app.catchsecu.com/document/C/f2d17e90b4cf932',
      },
    ],
  },
  {
    name: 'is_third',
    isRequired: false,
    text: '개인정보 제3자 제공 동의',
    links: [
      {
        height: 620,
        link: 'https://app.catchsecu.com/document/C/5e1bfbcdcd726af',
      },
      {
        height: 700,
        link: 'https://app.catchsecu.com/document/C/f6e27d4354ff1a2',
      },
    ],
  },
];

const getSchema = (isRegister: boolean) =>
  yup.object().shape({
    name: yup.string().ensure().required(),
    gender: yup.number().required(),
    marital: yup.string().ensure().required(),
    year: yup.number().required(),
    month: yup.number().required(),
    day: yup.number().required(),
    calendar: yup.string().required(),
    hour: yup.number().when('is_birthed_time', {
      is: true,
      then: schema => schema.required(),
      otherwise: schema => schema.transform(() => 1).notRequired(),
    }),
    minute: yup.number().when('is_birthed_time', {
      is: true,
      then: schema => schema.required(),
      otherwise: schema => schema.transform(() => 1).notRequired(),
    }),
    tags: yup.array(yup.string()).ensure().min(1).max(3).required(),
    is_agree: isRegister
      ? yup.boolean().oneOf([true]).required()
      : yup.boolean().notRequired(),
    is_notify: isRegister
      ? yup.boolean().required()
      : yup.boolean().notRequired(),
    is_third: isRegister
      ? yup.boolean().required()
      : yup.boolean().notRequired(),
    is_mail: yup.boolean().required(),
    is_kakao: yup.boolean().required(),
    recommender: yup.string().notRequired(),
    is_birthed_time: yup.boolean().required(),
    is_agree_all: yup.boolean().notRequired(),
  });

const defaultValues = {
  name: '',
  gender: '',
  marital: '',
  year: '',
  month: '',
  day: '',
  calendar: '',
  hour: '',
  minute: '',
  tags: [],
  is_agree: false,
  is_notify: false,
  is_third: false,
  is_mail: false,
  is_kakao: false,
  recommender: '',
  is_birthed_time: true,
  is_agree_all: false,
};
