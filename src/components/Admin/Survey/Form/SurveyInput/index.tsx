import React, { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import SurveyParentItem from '@/components/Admin/Survey/Form/SurveyInput/Parent';
import { SurveyCreateRequest } from '@/types/admin/survey';

function SurveyInput() {
  const { control, watch, getValues } = useFormContext<SurveyCreateRequest>();
  const { fields, replace } = useFieldArray({
    control,
    name: 'data',
  });
  const total_count = watch('total_count');
  const surveyData = useMemo(() => {
    const data = getValues('data');

    return Array.from({ length: total_count || 0 }, (_p, pi) => ({
      name: data[pi]?.name || '',
      order: pi,
      children: Array.from({ length: 4 }, (_c, ci) => ({
        name: data[pi]?.children[ci]?.name || '',
        order: ci,
      })),
    }));
  }, [total_count]);

  useEffect(() => {
    replace(surveyData);
  }, [total_count]);

  return (
    <>
      {fields.map((p, pi) => (
        <SurveyParentItem key={p.order} parentData={p} index={pi} />
      ))}
    </>
  );
}

export default SurveyInput;
