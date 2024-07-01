import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Layout } from '@/components/Contents/Survey/ItemList/ItemList.styled';
import SurveyItem from '@/components/Contents/Survey/ItemList/Item';
import { ContentSurveyT } from '@/types/content/survey';

interface Props {
  surveyData: ContentSurveyT;
  currentSurveyIndex: number;
  handleClickItem: (value: number) => void;
}

function SurveyItemList({
  surveyData,
  currentSurveyIndex,
  handleClickItem,
}: Props) {
  const { getValues } = useFormContext();

  const getIsSelected = (index: number, value: number) => {
    const { survey } = getValues();
    return survey[index] === value;
  };

  return (
    <Layout>
      {surveyData.children.map((c, i) => (
        <SurveyItem
          key={c.id}
          index={i}
          childData={c}
          isSelected={getIsSelected(currentSurveyIndex, i + 1)}
          currentSurveyIndex={currentSurveyIndex}
          handleClickItem={handleClickItem}
        />
      ))}
    </Layout>
  );
}

export default SurveyItemList;
