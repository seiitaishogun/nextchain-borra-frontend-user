import { Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextFieldController from '@/components/Admin/Common/Form/TextField/TextFieldController';
import SurveyChildItem from '@/components/Admin/Survey/Form/SurveyInput/Child';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import { SurveyDataT } from '@/types/admin/survey/form';
import { SurveyCreateRequest } from '@/types/admin/survey';

interface Props {
  parentData: SurveyDataT;
  index: number;
}

function SurveyParentItem({ parentData, index }: Props) {
  const { control } = useFormContext<SurveyCreateRequest>();

  return (
    <LabelGroup label="답변 작성" xs={12}>
      <Grid container item direction="column" xs={6}>
        <TextFieldController
          control={control}
          name={`data.${index}.name`}
          placeholder="질문 입력 (필수)"
        />
        {parentData.children.map((c, ci) => (
          <SurveyChildItem
            key={`${parentData.order}${c.order}`}
            childData={c}
            parentIndex={index}
            index={ci}
          />
        ))}
      </Grid>
    </LabelGroup>
  );
}

export default SurveyParentItem;
