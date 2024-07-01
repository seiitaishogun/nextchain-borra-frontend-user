import React from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';

interface Props {
  id?: string;
  label?: string;
  useLabel?: boolean;
  xs?: number;
  children: React.ReactNode;
}

const Layout = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 40px;
  padding: 0 !important;
  border: 1px solid rgba(224, 224, 224, 1);
  box-sizing: border-box;

  .groupLabel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    padding: 8px 10px;
    background: rgba(224, 224, 224, 0.8);
    text-align: center;
    line-height: 1.2;
    word-break: keep-all;
    box-sizing: border-box;
  }

  .groupContent {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 12px;
    box-sizing: border-box;
    background: #ffffff;
  }

  .groupLabel + .groupContent {
    width: calc(100% - 120px);
  }
`;

function LabelGroup({ id, label, useLabel, xs, children }: Props) {
  return (
    <Layout item xs={xs}>
      {id && useLabel && (
        <label htmlFor={id} className="groupLabel">
          {label}
        </label>
      )}
      {!id && useLabel && <div className="groupLabel">{label}</div>}
      <div className="groupContent">{children}</div>
    </Layout>
  );
}

LabelGroup.defaultProps = {
  label: '',
  useLabel: true,
  xs: 6,
};

export default LabelGroup;
