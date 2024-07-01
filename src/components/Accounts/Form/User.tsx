import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
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
import useFormTrigger from '@/hooks/form/useFormTrigger';

interface Props {
  isUser: boolean;
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

function UserForm({ isUser }: Props) {
  const { control, setValue, trigger } = useFormContext();
  const { handleTrigger } = useFormTrigger({ trigger });
  const month = useWatch({ control, name: getName('month') });
  const currentDate = new Date();
  const years = yearsGenerator({ to: currentDate.getFullYear() });
  const months = monthsGenerator();
  const days = daysGenerator({
    year: currentDate.getFullYear(),
    month: Number(month),
  });
  const hours = hourGenerator();
  const minutes = minutesGenerator();
  const is_birthed_time = useWatch({
    control,
    name: getName('is_birthed_time'),
  });

  function getName(property: string) {
    const name = isUser ? 'user' : 'partner';
    return `${name}.${property}`;
  }

  const handleIsBirthedTime = () => {
    setValue(getName('hour'), '');
    setValue(getName('minute'), '');
    setValue(getName('is_birthed_time'), !is_birthed_time);
    handleTrigger();
  };

  return (
    <Layout>
      <LabelGroup id="name" labelText="이름">
        <TextField
          control={control}
          name={getName('name')}
          placeholder="이름을 입력해주세요"
        />
      </LabelGroup>

      <LabelGroup id="gender" labelText="성별">
        <MultiRadio
          control={control}
          name={getName('gender')}
          radios={RADIOS}
        />
      </LabelGroup>

      <LabelGroup id="gender" labelText="결혼 여부">
        <Select
          control={control}
          name={getName('marital')}
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
          name={getName('year')}
          options={years}
          isDefault
          defaultConfig={{
            text: '년도',
            value: '',
          }}
        />
        <Select
          control={control}
          name={getName('month')}
          options={months}
          isDefault
          defaultConfig={{
            text: '월',
            value: '',
          }}
        />
        <Select
          control={control}
          name={getName('day')}
          options={days}
          isDefault
          defaultConfig={{
            text: '일',
            value: '',
          }}
        />
        <Select
          control={control}
          name={getName('calendar')}
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
              name={getName('hour')}
              options={hours}
              isDefault
              disabled={!is_birthed_time}
              defaultConfig={{
                text: '시',
                value: '',
              }}
            />
            <Select
              control={control}
              name={getName('minute')}
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
    </Layout>
  );
}

export default UserForm;

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
