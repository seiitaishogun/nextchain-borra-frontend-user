import React from 'react';
import {
  SurveyItem as Layout,
  SurveyInput,
} from '@/components/Contents/Survey/ItemList/ItemList.styled';
import { ContentSurveyChildT } from '@/types/content/survey';

interface Props {
  childData: ContentSurveyChildT;
  index: number;
  isSelected: boolean;
  currentSurveyIndex: number;
  handleClickItem: (value: number) => void;
}

function SurveyItem({
  childData,
  index,
  isSelected,
  currentSurveyIndex,
  handleClickItem,
}: Props) {
  return (
    <Layout isSelected={isSelected}>
      <SurveyInput
        type="radio"
        name={`survey[${currentSurveyIndex}]`}
        value={currentSurveyIndex}
        checked={isSelected}
        onChange={() => handleClickItem(index + 1)}
      />
      <span>{childData.name}</span>
    </Layout>
  );
}

export default SurveyItem;
