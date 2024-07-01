import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import TextFieldController from '@/components/Admin/Common/Form/TextField/TextFieldController';
import { SurveyChildrenDataT } from '@/types/admin/survey/form';

interface Props {
  childData: SurveyChildrenDataT;
  parentIndex: number;
  index: number;
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

const ChildOrder = styled.div`
  width: 30px;
  text-align: center;
`;

function SurveyChildItem({ childData, parentIndex, index }: Props) {
  const { control } = useFormContext();

  return (
    <Layout key={`${parentIndex}${index}`}>
      <ChildOrder>{childData.order + 1}.</ChildOrder>
      <TextFieldController
        control={control}
        name={`data.${parentIndex}.children.${index}.name`}
        placeholder={`답변 입력 (${index < 2 ? '필수' : '선택'})`}
        fullWidth
      />
    </Layout>
  );
}

export default SurveyChildItem;
