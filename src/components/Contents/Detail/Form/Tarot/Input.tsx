import React from 'react';
import { Control } from 'react-hook-form';
import styled from 'styled-components';
import LabelGroup from '@/components/Common/Form/LabelGroup';
import TextField from '@/components/Common/Form/TextField';
import MultiRadio from '@/components/Common/Form/Radio';

interface Props {
  isUser: boolean;
  control: Control<any>;
}

const Layout = styled.fieldset`
  select {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

function TarotInput({ isUser, control }: Props) {
  function getName(property: string) {
    const name = isUser ? 'user' : 'partner';
    return `${name}.${property}`;
  }

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
    </Layout>
  );
}

export default TarotInput;

const RADIOS = [
  {
    value: '0',
    labelText: '남자',
  },
  {
    value: '1',
    labelText: '여자',
  },
];
