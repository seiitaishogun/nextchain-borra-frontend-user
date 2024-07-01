import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextFieldController from '@/components/Admin/Common/Form/TextField/TextFieldController';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import { SurveyCreateRequest } from '@/types/admin/survey';

function SurveyNameInput() {
  const { control } = useFormContext<SurveyCreateRequest>();
  return (
    <LabelGroup label="제목" xs={12}>
      <TextFieldController
        control={control}
        name="name"
        placeholder="제목 입력 (필수)"
        sx={{
          width: '50%',
        }}
      />
    </LabelGroup>
  );
}

export default SurveyNameInput;
