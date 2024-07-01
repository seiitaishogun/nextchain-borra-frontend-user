import React from 'react';
import styled from 'styled-components';
import Header from '@/components/Common/Layout/Header';
import Navigation from '@/components/Common/Layout/Navigation';

interface Props {
  children?: React.ReactNode;
}

const StyledLayout = styled.div`
  position: relative;
  width: calc(${props => props.theme.deviceSize});
  margin: 0 auto;
  padding: 50px 0;
  box-sizing: border-box;
`;

function Layout({ children }: Props) {
  return (
    <StyledLayout id="layout">
      <Header />
      {children}
      <Navigation />
    </StyledLayout>
  );
}

export default Layout;
