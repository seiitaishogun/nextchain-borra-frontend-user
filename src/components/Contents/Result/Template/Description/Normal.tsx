import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: block;
  margin: 32px 0;
  padding: ${props => props.theme.deviceMargin};
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.05);
  background: ${({ theme }) => theme.colors.white};

  p {
    margin-top: 12px;
    letter-spacing: -0.18px;
    word-break: keep-all;
    font-size: 15px;
    line-height: 1.75;
    font-weight: 500;
  }

  p:first-child {
    margin-top: 0;
  }
`;

interface Props {
  name?: string;
  contents: string;
}

function NormalDescription({ name, contents }: Props) {
  return (
    <Layout>
      {name && (
        <h4>
          <strong dangerouslySetInnerHTML={{ __html: name }} />
        </h4>
      )}
      <p dangerouslySetInnerHTML={{ __html: contents }} />
    </Layout>
  );
}

export default NormalDescription;
