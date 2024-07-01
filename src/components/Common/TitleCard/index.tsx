import React from 'react';
import styled from 'styled-components';
import Title, { TitleProps } from '@/components/Common/Title';
import Card, { CardProps } from '@/components/Common/Card';

const Layout = styled.section`
  margin-top: 56px;
  padding: 0 16px;
`;

interface Props {
  style?: React.CSSProperties;
  titleProps: TitleProps;
  cardProps: CardProps;
}

function TitleCard({ style, titleProps, cardProps }: Props) {
  return (
    <Layout style={style}>
      <Title {...titleProps} />
      <Card {...cardProps} />
    </Layout>
  );
}

export default TitleCard;
