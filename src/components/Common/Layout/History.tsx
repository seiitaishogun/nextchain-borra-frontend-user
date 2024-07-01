import styled from 'styled-components';
import React from 'react';
import Navigation from '@/components/Common/Layout/Navigation';
import HistoryHeader from '@/components/Common/Layout/HistoryHeader';

interface Props {
  name: string;
  children?: React.ReactNode;
  isNavigation?: boolean;
}

const Layout = styled.div`
  position: relative;
  width: 360px;
  margin: 0 auto;
  padding: 60px 0 84px;
`;

function HistoryLayout({ name, children, isNavigation }: Props) {
  return (
    <Layout id="layout">
      <HistoryHeader name={name} size="large" />
      {children}
      {isNavigation && <Navigation />}
    </Layout>
  );
}

HistoryLayout.defaultProps = {
  isNavigation: true,
};

export default HistoryLayout;
