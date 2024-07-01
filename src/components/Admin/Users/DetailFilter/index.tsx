import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object } from 'yup';
import { format as dateFormat } from 'date-fns';
import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import {
  CoinFormLayout,
  Layout,
} from '@/components/Admin/Users/DetailFilter/DetailFilter.styled';
import TextField from '@/components/Admin/Common/Form/TextField';
import Radio from '@/components/Admin/Common/Form/Radio';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import FormDelete from '@/components/Admin/Users/DetailFilter/FormDelete';
import FormCharge from '@/components/Admin/Users/DetailFilter/FormCharge';
import { MaritalE } from '@/types/users';
import {
  IS_CHARGE,
  IS_MAIL_TEXT,
  IS_NOTIFY_TEXT,
  MARITAL_TEXT,
} from '@/constants/users';
import { UserDetail } from '@/types/admin/users/detail';

interface Props {
  id: number;
  data: UserDetail;
}

function DetailFilter({ id, data }: Props) {
  const router = useRouter();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenCharge, setIsOpenCharge] = useState(false);
  const [isCharge, setIsCharge] = useState(true);

  const { control, trigger, getValues, setValue } = useForm<{
    coin: number | '';
  }>({
    resolver: yupResolver(schema),
    defaultValues: {
      coin: '',
    },
  });

  const handleGoList = () => {
    router.push('/admin/users');
  };

  const [ydm = '', hms = ''] = data?.birthed_at
    ? data.birthed_at.split(' ')
    : ['', ''];

  return (
    <Layout>
      <Grid container spacing={0}>
        <LabelGroup label="이름">{data.name}</LabelGroup>
        <LabelGroup label="이메일(수신여부)">
          <span>{data.email}</span>
          <FormControlLabel
            control={<Checkbox defaultChecked={data.is_mail} />}
            label="수신"
            sx={{
              marginLeft: '10px',
            }}
            disabled
          />
        </LabelGroup>
        <LabelGroup label="생년월일">{ydm}</LabelGroup>
        <LabelGroup label="태어난시간">{hms}</LabelGroup>
        <LabelGroup label="휴대폰번호">{data?.phone || ''}</LabelGroup>
        <LabelGroup label="ADID">{data?.ad_id || ''}</LabelGroup>
        <LabelGroup label="결혼여부">
          {data?.marital ? MARITAL_TEXT[data.marital as MaritalE] : ''}
        </LabelGroup>
        <LabelGroup label="보유코인">{data?.coin || 0}원</LabelGroup>
        <LabelGroup label="총결제금액">{data?.total_payment || 0}원</LabelGroup>
        <LabelGroup id="coin" label="코인적립/차감">
          <Radio
            labels={IS_CHARGE}
            checked={isCharge}
            onChange={e => setIsCharge(e.target.value === 'true')}
          />
          <Controller
            name="coin"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CoinFormLayout>
                <div>
                  <TextField
                    placeholder="0"
                    value={value}
                    onChange={onChange}
                  />
                  {error && (
                    <span className="error">숫자로 값을 입력해주세요.</span>
                  )}
                </div>
                <Button
                  variant="contained"
                  onClick={() => {
                    trigger(['coin']).then(check => {
                      if (check) setIsOpenCharge(true);
                    });
                  }}
                >
                  저장
                </Button>
              </CoinFormLayout>
            )}
          />
        </LabelGroup>
        <LabelGroup label="최초 유입경로">
          {data?.referrer_path || ''}
        </LabelGroup>
        <LabelGroup label="상태">{data?.status || ''}</LabelGroup>
        <LabelGroup label="관심태그">
          {data?.tags &&
            data.tags.map((tag: any) => (
              <span key={tag.id} style={{ paddingRight: '5px' }}>
                {tag.name}
              </span>
            ))}
        </LabelGroup>
        <LabelGroup label="가입일">{data.created_at || ''}</LabelGroup>
        <LabelGroup label="최종 접속일">{data.last_accessed_at}</LabelGroup>
        <LabelGroup label="마지막 결제일">
          {data?.payment_at
            ? dateFormat(new Date(data.payment_at), 'yyyy-MM-dd')
            : '미결제'}
        </LabelGroup>
        <LabelGroup label="푸시알림">
          {data?.is_notify
            ? IS_NOTIFY_TEXT[data.is_notify ? 1 : 0]
            : IS_NOTIFY_TEXT[0]}
        </LabelGroup>
        <LabelGroup label="기타알림 수신여부">
          {data?.is_mail ? IS_MAIL_TEXT[data.is_mail ? 1 : 0] : IS_MAIL_TEXT[0]}
        </LabelGroup>
        <LabelGroup label="추천회원">{data?.recommender || '없음'}</LabelGroup>
        <LabelGroup label="추천회원수">
          {data?.recommender_count || 0}명
        </LabelGroup>

        <div className="buttonWrap">
          <Button variant="outlined" onClick={() => setIsOpenDelete(true)}>
            탈퇴
          </Button>
          <Button variant="contained" onClick={handleGoList}>
            목록
          </Button>
        </div>

        {isOpenDelete && (
          <FormDelete
            id={id}
            isOpen={isOpenDelete}
            setIsOpen={setIsOpenDelete}
          />
        )}

        {isOpenCharge && (
          <FormCharge
            id={id}
            isCharge={isCharge}
            isOpen={isOpenCharge}
            setIsOpen={setIsOpenCharge}
            countCoin={getValues('coin') as number}
            setValue={setValue}
          />
        )}
      </Grid>
    </Layout>
  );
}

export default DetailFilter;

const schema = object({
  coin: number().min(1).required(),
});
