import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import SurveyHeader from '@/components/Contents/Survey/Header';
import BackButton, {
  BackButtonProps,
} from '@/components/Contents/Detail/Form/ButtonBox/BackButton';
import SurveyItemList from 'src/components/Contents/Survey/ItemList';
import { ContentDetailT } from '@/types/content/detail';
import useSaveContentForm from '@/hooks/contents/useSaveContentForm';
import useAlert from '@/hooks/common/useAlert';
import useContentPurchase from '@/hooks/contents/useContentPurchase';
import { contentFormSelector } from '@/store/content/form';
import { ContentStepE } from '@/types/content/step';
import { contentStepAtom } from '@/store/content/step';
import withPurchaseButton from '@/hoc/content/withPurchaseButton';
import { fetchContentSurvey } from '@/api/content/survey';

const Loading = dynamic(() => import('@/components/Common/Popup/Loading'), {
  ssr: false,
});

const Layout = styled.article`
  width: ${props => props.theme.deviceSize};
  background: #ffffff;
`;

interface Props {
  content: ContentDetailT;
  setPurchaseData: Dispatch<SetStateAction<any>>;
}

const CustomButtonBox = withPurchaseButton(BackButton);

const schema = (maxSurveyLength: number) =>
  yup.object().shape({
    survey: yup.array().length(maxSurveyLength),
  });

function ContentSurvey({ content, setPurchaseData }: Props) {
  const router = useRouter();
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const contentForm = useRecoilValue(contentFormSelector(content.id));
  const setContentStep = useSetRecoilState(contentStepAtom);

  const { data, isLoading, isFetching } = useQuery(
    ['contentSurvey', content.id],
    () =>
      fetchContentSurvey({
        content_id: content.id,
      }),
    {
      initialData: {
        data: [],
      },
      select: res => res.data,
      onSuccess: res => {
        const max = res.length - 1;
        const survey = contentForm?.survey || [];
        const surveyIndex = Math.min(Math.max(survey.length, 0), max);
        setCurrentSurveyIndex(surveyIndex);
        reset();
      },
      onError: () => {
        router.back();
      },
    }
  );
  const maxSurveyCount = data.length;

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(schema(maxSurveyCount)),
    defaultValues: {
      ...contentForm,
      survey: contentForm?.survey || [],
    },
  });
  const {
    control,
    getValues,
    reset,
    formState: { isDirty },
  } = methods;
  const { update, remove } = useFieldArray({
    control,
    name: 'survey',
  });
  const formValues = getValues();

  const { renderMessage, setAlertOptions } = useAlert();
  const { handleSubmit, purchasesMutate } = useContentPurchase({
    content,
    getValues,
    setAlertOptions,
    setPurchaseData,
  });

  useSaveContentForm({
    contentId: content.id,
    isDirty,
    formValues,
  });

  useEffect(() => {
    router.beforePopState(() => {
      setContentStep(ContentStepE.Detail);
      return true;
    });

    return () => router.beforePopState(() => true);
  }, [router]);

  const handleRemoveSurvey = (index: number) => {
    if (index === -1) {
      setContentStep(ContentStepE.Detail);
      return;
    }

    setCurrentSurveyIndex(prev => prev - 1);
    remove(index);
  };

  const handleBack = () => {
    if (currentSurveyIndex > 0) {
      handleRemoveSurvey(currentSurveyIndex);
    } else {
      setContentStep(ContentStepE.Detail);
      router.back();
    }
  };

  const handleClickItem = (value: number) => {
    update(currentSurveyIndex, value);
    setCurrentSurveyIndex(prev => Math.min(prev + 1, maxSurveyCount - 1));
  };

  if (isLoading || isFetching) {
    return <Loading isOpen />;
  }

  const currentSurvey = data[currentSurveyIndex] || {};

  return (
    <FormProvider {...methods}>
      <Layout>
        <SurveyHeader
          name={currentSurvey.name}
          currentSurveyCount={currentSurveyIndex + 1}
          maxSurveyCount={maxSurveyCount}
        />

        {currentSurveyIndex >= 0 && currentSurveyIndex < maxSurveyCount && (
          <SurveyItemList
            surveyData={currentSurvey}
            currentSurveyIndex={currentSurveyIndex}
            handleClickItem={handleClickItem}
          />
        )}
        <Box
          sx={{
            marginTop: '35px',
          }}
        >
          <CustomButtonBox<BackButtonProps>
            content={content}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
          />
        </Box>
      </Layout>

      {renderMessage()}

      <Loading isOpen={purchasesMutate.isLoading && content.price > 0} />
    </FormProvider>
  );
}

export default ContentSurvey;
