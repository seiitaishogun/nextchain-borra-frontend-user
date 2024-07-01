import React from 'react';
import {
  Layout,
  SurveyCount,
  SurveyTitle,
} from '@/components/Contents/Survey/Header/Header.styled';

interface Props {
  name: string;
  currentSurveyCount: number;
  maxSurveyCount: number;
}

function SurveyHeader({ name, currentSurveyCount, maxSurveyCount }: Props) {
  return (
    <Layout>
      <SurveyCount>
        <strong>{currentSurveyCount}</strong>/{maxSurveyCount}
      </SurveyCount>

      <SurveyTitle>{name}</SurveyTitle>
      <div />
    </Layout>
  );
}

export default SurveyHeader;
