import React from 'react';
import { useFormContext } from 'react-hook-form';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import SelectController from '@/components/Admin/Common/Form/Select/SelectController';
import { SURVEY_TOTAL_COUNT_ITEMS } from '@/constants/admin/survey';
import { SurveyCreateRequest } from '@/types/admin/survey';

function SurveyTotalCountInput() {
  const { control } = useFormContext<SurveyCreateRequest>();
  return (
    <LabelGroup label="분류" xs={12}>
      <SelectController
        control={control}
        name="total_count"
        isDefault
        defaultConfig={{ text: '분류 선택', value: '0' }}
        options={SURVEY_TOTAL_COUNT_ITEMS}
        sx={{
          width: '50%',
        }}
      />
    </LabelGroup>
  );
}

export default SurveyTotalCountInput;
