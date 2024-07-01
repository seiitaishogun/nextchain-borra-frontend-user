import React from 'react';
import styled from 'styled-components';
import { EditorViewLayout } from '@/components/Common/Editor/EditorView.styled';

const Wrap = styled.div`
  &.ck-content {
    margin-top: 24px;
    margin-bottom: 50px;
    min-height: 600px;
    letter-spacing: -0.21px;
    color: #444;
    line-height: 1.4;
    font-size: 16px;
  }
`;

function EditorView({ html }: any) {
  return (
    <EditorViewLayout>
      <Wrap className="ck-content" dangerouslySetInnerHTML={{ __html: html }} />
    </EditorViewLayout>
  );
}

export default EditorView;
