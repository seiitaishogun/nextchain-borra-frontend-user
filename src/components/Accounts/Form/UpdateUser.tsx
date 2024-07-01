import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import LabelGroup from '@/components/Common/Form/LabelGroup';
import TextField from '@/components/Common/Form/TextField';
import MultiRadio from '@/components/Common/Form/Radio';
import Select from '@/components/Common/Form/Select';
import { UnknownButton } from '@/styles/Accounts/UserInfo.styled';
import {
  daysGenerator,
  hourGenerator,
  minutesGenerator,
  monthsGenerator,
  yearsGenerator,
} from '@/utils/date';
import { CALENDAR_OPTION, MARITAL_OPTION } from '@/constants/users';

interface Props {
  // eslint-disable-next-line react/no-unused-prop-types
  isRegister: boolean;
  control: Control<any>;
  handleIsBirthedTime: () => void;
}

const Layout = styled.fieldset`
  select {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const FlexSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

function UpdateUserForm({
  // isRegister,
  control,
  handleIsBirthedTime,
}: Props) {
  const month = useWatch({ control, name: 'month' });
  const currentDate = new Date();
  const years = yearsGenerator({ to: currentDate.getFullYear() });
  const months = monthsGenerator();
  const days = daysGenerator({
    year: currentDate.getFullYear(),
    month: Number(month),
  });
  const hours = hourGenerator();
  const minutes = minutesGenerator();
  const is_birthed_time = useWatch({ control, name: 'is_birthed_time' });

  return (
    <Layout>
      <LabelGroup id="name" labelText="이름">
        <TextField
          control={control}
          name="name"
          placeholder="이름을 입력해주세요"
        />
      </LabelGroup>

      <LabelGroup id="gender" labelText="성별">
        <MultiRadio control={control} name="gender" radios={RADIOS} />
      </LabelGroup>

      <LabelGroup id="marital" labelText="결혼 여부">
        <Select
          control={control}
          name="marital"
          options={MARITAL_OPTION}
          isDefault
          defaultConfig={{
            text: '선택',
            value: '',
          }}
        />
      </LabelGroup>

      <LabelGroup id="birthed_date" labelText="생년월일">
        <Select
          control={control}
          name="year"
          options={years}
          isDefault
          defaultConfig={{
            text: '년도',
            value: '',
          }}
        />
        <Select
          control={control}
          name="month"
          options={months}
          isDefault
          defaultConfig={{
            text: '월',
            value: '',
          }}
        />
        <Select
          control={control}
          name="day"
          options={days}
          isDefault
          defaultConfig={{
            text: '일',
            value: '',
          }}
        />
        <Select
          control={control}
          name="calendar"
          options={CALENDAR_OPTION}
          isDefault
          defaultConfig={{
            text: '선택',
            value: '',
          }}
        />
      </LabelGroup>

      <LabelGroup id="birthed_time" labelText="태어난 시간">
        <FlexSpaceBetween>
          <div>
            <Select
              control={control}
              name="hour"
              options={hours}
              isDefault
              defaultConfig={{
                text: '시',
                value: '',
              }}
              disabled={!is_birthed_time}
            />
            <Select
              control={control}
              name="minute"
              options={minutes}
              isDefault
              disabled={!is_birthed_time}
              defaultConfig={{
                text: '분',
                value: '',
              }}
            />
          </div>

          <UnknownButton
            type="button"
            is_birthed_time={is_birthed_time}
            onClick={() => {
              handleIsBirthedTime();
            }}
          >
            <CheckIcon />
            모름
          </UnknownButton>
        </FlexSpaceBetween>
      </LabelGroup>

      {/* TODO: 약관 정의 후 추가
      <LabelGroup id="is_notify" labelText="푸시 알림">
        <ToggleBox name="is_notify" control={control} />
      </LabelGroup>

      <LabelGroup id="is_mail" labelText="이메일 수신">
        <ToggleBox name="is_mail" control={control} />
      </LabelGroup>

      <LabelGroup id="is_kakao" labelText="카카오 알림">
        <ToggleBox name="is_kakao" control={control} />
      </LabelGroup>

      <LabelGroup id="recommender" labelText="추천인">
        <TextField
          control={control}
          name="recommender"
          placeholder="추천인 이메일을 입력해주세요"
        />
      </LabelGroup>
      */}
    </Layout>
  );
}

export default UpdateUserForm;

const RADIOS = [
  {
    value: 0,
    labelText: '남자',
  },
  {
    value: 1,
    labelText: '여자',
  },
];
