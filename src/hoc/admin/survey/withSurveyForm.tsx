import React from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObject, ObjectSchema } from 'yup';
import { errorAlert } from '@/utils/yupMessage';
import { SurveyT } from '@/types/admin/survey/detail';

interface Props<Req, Res> {
  defaultValues: DefaultValues<Req & FieldValues>;
  schema: ObjectSchema<AnyObject>;
  formMutation: UseMutationResult<Res, unknown, Req, unknown>;
  confirmText: string;
  data?: SurveyT;
}

function withSurveyForm(SurveyFormComponent: React.ComponentType<any>) {
  return function CustomFormComponent<Req, Res>({
    defaultValues,
    schema,
    formMutation,
    confirmText,
    ...props
  }: Props<Req, Res>) {
    const methods = useForm<Req & FieldValues>({
      resolver: yupResolver(schema),
      defaultValues,
    });
    const { handleSubmit } = methods;

    const handleFormSubmit = (formData: Req) => {
      const confirm = window.confirm(confirmText);
      if (!confirm || formMutation.isLoading) return;
      formMutation.mutate(formData);
    };

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit, errorAlert)}>
          <SurveyFormComponent {...props} />
        </form>
      </FormProvider>
    );
  };
}

export default withSurveyForm;
