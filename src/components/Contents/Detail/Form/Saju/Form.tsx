import React from 'react';
import styled from 'styled-components';
import Title, { TitleProps } from '@/components/Common/Title';
import UserForm from '@/components/Accounts/Form/User';

interface Props extends TitleProps {
  isUser: boolean;
}

const Layout = styled.section`
  margin-top: 32px;
`;

function SajuForm({ isUser, title, linkConfig }: Props) {
  return (
    <Layout>
      <Title title={title} linkConfig={linkConfig} />
      <UserForm isUser={isUser} />
    </Layout>
  );
}

export default SajuForm;
