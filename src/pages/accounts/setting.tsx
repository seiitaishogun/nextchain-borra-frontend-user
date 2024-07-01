import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import HistoryLayout from '@/components/Common/Layout/History';
import Title from '@/components/Common/Title';
import Agreement from '@/components/Common/Agreement';
import { fetchUpdateNotify } from '@/api/account';
import { userInfoState } from '@/store/auth';

const Layout = styled.section`
  padding: 0 16px;

  ul {
    margin-top: 16px;
    padding: 8px 16px;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 8px;

    li {
      margin-top: 8px;
      padding-left: 20px;
      text-indent: -20px;
      font-size: 14px;
      font-weight: normal;
      line-height: 18px;
      list-style: disc inside;
      color: #000000;
    }

    li:first-child {
      margin-top: 0;
    }
  }
`;

function Setting() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { control, setValue, getValues } = useForm({
    mode: 'all',
    resolver: yupResolver(
      yup.object({
        is_notify: yup.boolean().required(),
      })
    ),
    defaultValues: {
      is_notify: false,
    },
  });
  const updateMutate = useMutation(['updateNotify'], fetchUpdateNotify);

  useEffect(() => {
    setValue('is_notify', !!userInfo?.is_notify);
  }, [userInfo?.is_notify]);

  const handleUpdateNotify = () => {
    if (updateMutate.isLoading) return;
    const { is_notify } = getValues();
    updateMutate.mutate(
      {
        is_notify: !is_notify,
      },
      {
        onSuccess: () => {
          setUserInfo(prev => ({
            ...prev,
            is_notify: !is_notify,
          }));
        },
      }
    );
  };

  const agreements = AGREEMENTS.map(item => ({
    ...item,
    handleChange: handleUpdateNotify,
  }));

  return (
    <Layout>
      <Title title="수신 설정" />

      <Agreement
        variant="push"
        isAllChecked={false}
        control={control}
        items={agreements}
      />

      <ul>
        <li>푸시 알림 수신을 위해 고객님의 기기에서 알림을 허용해주세요.</li>
        <li>
          위 항목을 모두 동의하셔야 보라의 맞춤형 추천 및 이벤트 알림을 받으실
          수 있습니다.
        </li>
      </ul>
    </Layout>
  );
}

Setting.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="마이페이지">{page}</HistoryLayout>;
};

export default Setting;

const AGREEMENTS = [
  {
    name: 'is_notify',
    isRequired: false,
    text: '운세 정보(광고성) 수신',
    links: [
      {
        height: 530,
        link: 'https://app.catchsecu.com/document/C/3e493b42869b1db',
      },
      {
        height: 530,
        link: 'https://app.catchsecu.com/document/C/f2d17e90b4cf932',
      },
    ],
  },
];
