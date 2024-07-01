import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  p {
    margin-top: 12px;
    line-height: 1.75;
    word-break: normal;
    font-weight: 500;
  }

  p:first-child {
    margin-top: 0;
  }
`;

interface Props {
  contents: string;
}

function FortuneDescription({ contents }: Props) {
  return (
    <Layout>
      <p dangerouslySetInnerHTML={{ __html: contents }} />
    </Layout>
  );
}

export default FortuneDescription;
