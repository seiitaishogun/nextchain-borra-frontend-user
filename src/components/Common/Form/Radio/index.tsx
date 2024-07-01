import React from 'react';
import styled from 'styled-components';
import SingleRadio from '@/components/Common/Form/Radio/SingleRadio';
import { MultiRadioProps } from '@/components/Common/Form/Radio/types';

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;

  > label {
    margin-right: 14px;
  }

  > label:last-child {
    margin-right: 0;
  }
`;

function MultiRadio({ radios, ...props }: MultiRadioProps) {
  return (
    <Layout>
      {radios.map(radio => (
        <SingleRadio key={radio.value} {...props} {...radio} />
      ))}
    </Layout>
  );
}

export default MultiRadio;
