import React from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  labelText: string;
  children: React.ReactNode;
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  height: 33px;
  padding: 23px 0 18px;
  border-bottom: 1px solid #e0e0e0;
  line-height: 19px;

  > label {
    width: 80px;
    font-weight: normal;
    font-size: 14px;
    color: #999;
    letter-spacing: -0.18px;
  }

  > div {
    display: flex;
    align-items: center;
    width: calc(100% - 80px);
  }
`;

function LabelGroup({ id, labelText, children }: Props) {
  return (
    <Layout>
      <label htmlFor={id}>{labelText}</label>
      <div>{children}</div>
    </Layout>
  );
}

export default LabelGroup;
