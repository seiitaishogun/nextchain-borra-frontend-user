import styled from 'styled-components';
import React from 'react';
import Navigation from '@/components/Common/Layout/Navigation';

interface Props {
  children?: React.ReactNode;
}

const Layout = styled.div`
  position: relative;
  width: calc(${props => props.theme.deviceSize});
  margin: 0 auto;
  padding: 50px 0 100px;
  box-sizing: border-box;
`;

function NormalLayout({ children }: Props) {
  return (
    <Layout>
      {children}
      <Navigation />
    </Layout>
  );
}

export default NormalLayout;
