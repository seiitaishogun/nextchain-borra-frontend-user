import React from 'react';
import styled from 'styled-components';
import Summary from '@/components/Contents/Result/Template/Summary';
import { ChildLayout } from '@/components/Contents/Result/Result.styled';

const SubBox = styled(ChildLayout)`
  margin-top: 0;
  padding-top: 26px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  p {
    margin-top: 8px;
    line-height: 1.75;
    word-break: normal;
    font-weight: 500;
  }
`;

interface Props {
  sign?: string | null;
  subName: string;
  name: string;
  summary: string;
  contents: string;
}

function Description({ sign, subName, name, summary, contents }: Props) {
  return (
    <div>
      <Summary name={name} summary={summary} />

      <SubBox sign={sign}>
        <h4 dangerouslySetInnerHTML={{ __html: subName }} />
        <p dangerouslySetInnerHTML={{ __html: contents }} />
      </SubBox>
    </div>
  );
}

export default Description;
