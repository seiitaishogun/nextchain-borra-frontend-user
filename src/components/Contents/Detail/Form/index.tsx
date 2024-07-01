import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilValue } from 'recoil';
import JuyeogForm from '@/components/Contents/Detail/Form/Juyeog';
import TarotForm from '@/components/Contents/Detail/Form/Tarot';
import SajuFormContainer from '@/components/Contents/Detail/Form/Saju';
import {
  ContentGuideLayout,
  ContentLayout,
  Layout,
} from '@/components/Contents/Detail/Form/Form.styled';
import Title from '@/components/Common/Title';
import LikeButton, {
  LikeButtonProps,
} from '@/components/Contents/Detail/Form/ButtonBox/LikeButton';
import useContentsRecourse from '@/hooks/contents/useContentsRecourse';
import { ContentsTypeE } from '@/types/content';
import { ContentDetailT } from '@/types/content/detail';
import { userInfoState } from '@/store/auth';
import { getSplitDate } from '@/utils/date';
import { CalendarE, ReferrerPathE } from '@/types/users';
import useFormTrigger from '@/hooks/form/useFormTrigger';
import useAlert from '@/hooks/common/useAlert';
import {
  contentFormSelector,
  isContentFormSelector,
} from '@/store/content/form';
import useSaveContentForm from '@/hooks/contents/useSaveContentForm';
import useUpdateContentLike from '@/hooks/contents/useUpdateContentLike';
import useContentPurchase from '@/hooks/contents/useContentPurchase';
import withPurchaseButton from '@/hoc/content/withPurchaseButton';

const Loading = dynamic(() => import('@/components/Common/Popup/Loading'), {
  ssr: false,
});

interface Props {
  content: ContentDetailT;
  isLike: boolean;
  setPurchaseData: Dispatch<SetStateAction<any>>;
}

const CustomButtonBox = withPurchaseButton(LikeButton);

function ContentsForm({ content, isLike, setPurchaseData }: Props) {
  const userInfo = useRecoilValue(userInfoState);
  const contentForm = useRecoilValue(contentFormSelector(content.id));
  const isContentForm = useRecoilValue(isContentFormSelector(content.id));
  const { schema, defaultValues } = useContentsRecourse({
    type: content.type.name,
    isPartner: content.is_partner,
    tarotCount: content.tarot_count || 0,
  });
  const methods = useForm<any>({
    mode: 'all',
    resolver: yupResolver(schema as any),
    defaultValues,
  });
  const {
    trigger,
    getValues,
    setValue,
    reset,
    formState: { isDirty },
  } = methods;
  const { handleTrigger } = useFormTrigger({ trigger });
  const { renderMessage, setAlertOptions, handleReset } = useAlert();
  const { handleSubmit, purchasesMutate } = useContentPurchase({
    content,
    getValues,
    setAlertOptions,
    setPurchaseData,
  });
  const { handleUpdateLike } = useUpdateContentLike({
    content,
    setAlertOptions,
    handleReset,
  });
  const formValues = getValues();

  useSaveContentForm({
    contentId: content.id,
    isDirty,
    formValues,
  });

  useEffect(() => {
    if (isContentForm) {
      Object.entries(contentForm).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else if (
      content.type.name === ContentsTypeE.Saju ||
      content.type.name === ContentsTypeE.Jamidusu
    ) {
      const { year, month, day, hour, minute, second, ...birthed_at } =
        getSplitDate(userInfo?.birthed_at || null);

      setValue('user', {
        name: userInfo?.name || '',
        gender:
          typeof userInfo?.gender === 'number'
            ? userInfo.gender.toString()
            : '',
        marital: userInfo?.marital || '',
        calendar: userInfo?.calendar || CalendarE.Solar,
        year: year || 1990,
        month: month || 1,
        day: day || 1,
        hour: second ? '' : hour,
        minute: second ? '' : minute,
        is_birthed_time: userInfo?.is_birthed_time || false,
        ...birthed_at,
      });
    } else if (
      content.type.name === ContentsTypeE.Tarot ||
      content.type.name === ContentsTypeE.Juyeog
    ) {
      setValue('user', {
        name: userInfo?.name || '',
        gender:
          typeof userInfo?.gender === 'number'
            ? userInfo.gender.toString()
            : '',
      });
    }

    handleTrigger();

    return () => {
      reset();
    };
  }, []);

  const renderForm = useCallback(() => {
    switch (content.type.name) {
      case ContentsTypeE.Saju:
        return <SajuFormContainer isPartner={content.is_partner} />;
      case ContentsTypeE.Jamidusu:
        return (
          <SajuFormContainer
            type={content.type.name}
            isPartner={content.is_partner}
          />
        );
      case ContentsTypeE.Juyeog:
        return <JuyeogForm />;
      case ContentsTypeE.Tarot:
        return (
          <TarotForm
            tarot={content.tarot}
            maxCardCount={content.tarot_count || 0}
            isPartner={content.is_partner}
          />
        );
      default:
        return null;
    }
  }, [content]);

  return (
    <FormProvider {...methods}>
      <Layout>
        {renderForm()}

        {content?.site === ReferrerPathE.Nbt && (
          <ContentGuideLayout>
            <Title title="콘텐츠 안내" />

            <ContentLayout align="left">
              <span>
                제휴 콘텐츠는 구매 후 취소, 환불이 불가능합니다.
                <br />
                지정된 해당 콘텐츠를 조회해야만 리워드가 지급되며, 페이지에서
                이탈할 경우 리워드 지급이 불가합니다.
              </span>
            </ContentLayout>
          </ContentGuideLayout>
        )}

        <CustomButtonBox<LikeButtonProps>
          content={content}
          isLike={isLike}
          handleUpdateLike={handleUpdateLike}
          handleSubmit={handleSubmit}
        />

        {renderMessage()}

        <Loading isOpen={purchasesMutate.isLoading && content.price > 0} />
      </Layout>
    </FormProvider>
  );
}

export default ContentsForm;
