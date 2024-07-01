import React from 'react';
import { Control } from 'react-hook-form';
import styled from 'styled-components';
import Title, { TitleProps } from '@/components/Common/Title';
import TarotInput from '@/components/Contents/Detail/Form/Tarot/Input';

interface Props extends TitleProps {
  isUser: boolean;
  control: Control<any>;
}

const Layout = styled.section`
  .active {
    margin: 32px 0 0;
  }
`;

function TarotForm({ isUser, title, linkConfig, control }: Props) {
  return (
    <Layout>
      {!isUser && (
        <Title title={title} linkConfig={linkConfig} className="active" />
      )}
      <TarotInput isUser={isUser} control={control} />
    </Layout>
  );
}

export default TarotForm;
