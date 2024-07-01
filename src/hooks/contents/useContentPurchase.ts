import { Dispatch, SetStateAction } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { getRegisterPath } from '@/utils/user';
import { ReferrerPathE } from '@/types/users';
import { ContentsTypeE } from '@/types/content';
import useContentPurchaseMutate from '@/hooks/contents/useContentPurchaseMutate';
import { ContentDetailT } from '@/types/content/detail';
import { contentFormSelector } from '@/store/content/form';
import { isAdvertiseAtom } from '@/store/content/step';

interface Props {
  content: ContentDetailT;
  getValues: UseFormGetValues<any>;
  setPurchaseData: Dispatch<SetStateAction<any>>;
  setAlertOptions: (options: any) => void;
}

function useContentPurchase({
  content,
  getValues,
  setPurchaseData,
  setAlertOptions,
}: Props) {
  const router = useRouter();
  const [contentForm, setContentForm] = useRecoilState(
    contentFormSelector(content.id)
  );

  const setIsAdvertise = useSetRecoilState(isAdvertiseAtom);

  const purchasesMutate = useContentPurchaseMutate({
    content,
    setPurchaseData,
    setAlertOptions,
  });

  const getUserRequest = (user: any) => {
    const {
      name,
      gender,
      marital,
      calendar,
      year,
      month,
      day,
      hour,
      minute,
      is_birthed_time,
    } = user;
    const birthed_at = format(
      new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        is_birthed_time ? Number(hour) : 0,
        is_birthed_time ? Number(minute) : 0
      ),
      'yyyy-MM-dd HH:mm:00'
    );

    return {
      name,
      gender: Number(gender),
      marital,
      birthed_at,
      is_birthed_time,
      calendar,
      value: null,
    };
  };

  const handleSubmit = () => {
    if (purchasesMutate.isLoading) return;
    const formData = {
      ...contentForm,
      ...getValues(),
    };
    setContentForm(formData);

    const register_path = getRegisterPath() || null;
    const referrer_path = router.query?.utm_source || ReferrerPathE.BORRA;
    const params: any = {
      id: content.id,
      data: [],
      register_path,
      referrer_path,
    };

    if (content.type.name === ContentsTypeE.Saju) {
      const { user } = formData;
      const userData = getUserRequest(user);
      params.data.push(userData);

      if (content.is_partner) {
        const { partner } = formData;
        const partnerData = getUserRequest(partner);
        params.data.push(partnerData);
      }
    } else if (content.type.name === ContentsTypeE.Juyeog) {
      const { user, inner, outer } = formData;
      params.data.push({
        ...user,
        value: `${outer},${inner}`,
      });
    } else if (content.type.name === ContentsTypeE.Tarot) {
      const { user, tarot } = formData;
      params.data.push({
        ...user,
        value: tarot.join(','),
      });

      if (content.is_partner) {
        const { partner } = formData;
        params.data.push({
          ...partner,
          value: tarot.join(','),
        });
      }
    } else if (content.type.name === ContentsTypeE.Jamidusu) {
      const { user } = formData;
      const userData = getUserRequest(user);
      params.data.push(userData);

      if (content.is_partner) {
        const { partner } = formData;
        const partnerData = getUserRequest(partner);
        params.data.push(partnerData);
      }
    }

    if (content.price === 0) {
      setIsAdvertise(true);
    }

    if (content.is_survey) {
      const { survey } = formData;
      params.survey_value = survey.join('');
    }

    purchasesMutate.mutate(params);
  };

  return { handleSubmit, purchasesMutate };
}

export default useContentPurchase;
