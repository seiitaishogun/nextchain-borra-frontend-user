import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import {
  Layout,
  FeedbackTitle,
  FeedbackList,
} from '@/components/Contents/Feedback/Feedback.styled';
import FeedbackItem from '@/components/Contents/Feedback/FeedbackItem';
import Snackbar from '@/components/Common/Snackbar';
import { fetchFeedbacks, fetchFeedbackStore } from '@/api/content/feedback';
import useUpdateUserInfo from '@/hooks/auth/useUpdateUserInfo';
import { userInfoState } from '@/store/auth';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { FeedbackT } from '@/types/content/feedback';

interface Props {
  contentName: string;
  title?: string | React.ReactNode;
  isFeedbackAction?: boolean;
}

function ContentFeedback({ contentName, title, isFeedbackAction }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userInfo = useRecoilValue(userInfoState);
  const { handleContentFeedbackEvent } = useDataCollection();
  const { handleUpdateUserInfo } = useUpdateUserInfo();
  const content_id = Number(router.query.id);
  const purchase_id = router.query.purchaseId
    ? Number(router.query.purchaseId)
    : undefined;
  const [openSnackbar, setOpenSnackbar] = useState('');
  const { data } = useQuery(
    ['feedbacks', { purchase_id }],
    () => fetchFeedbacks({ content_id, purchase_id }),
    {
      enabled: router.isReady,
      initialData: {
        data: {
          feedback: [],
          status: null,
        },
      },
      select: res => res.data,
    }
  );

  const { mutate, isLoading, isSuccess } = useMutation(
    ['feedbackStore'],
    fetchFeedbackStore
  );

  const handleHideSnackbar = () => {
    setOpenSnackbar('');
  };

  const handleClickFeedback = (feedback: FeedbackT) => {
    if (isLoading || !isFeedbackAction || data.status || isSuccess) return;

    const params = {
      content_id,
      purchase_id: purchase_id ?? 0,
      feedback_id: feedback.id,
    };
    mutate(params, {
      onSuccess: ({ data: feedbackRes }) => {
        const { message, price } = feedbackRes;
        queryClient.refetchQueries(['feedbacks', { purchase_id }]);
        handleUpdateUserInfo();
        setOpenSnackbar(message);

        handleContentFeedbackEvent({
          content_id,
          content_name: contentName,
          user_id: userInfo?.id || null,
          user_name: userInfo?.name || null,
          feedback_id: feedback.id,
          feedback_name: feedback.name,
          price,
        });
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message || '오류가 발생했습니다.';
        alert(message);
      },
    });
  };

  return (
    <Layout>
      {title && <FeedbackTitle>{title}</FeedbackTitle>}
      <FeedbackList>
        {data.feedback.map(item => (
          <FeedbackItem
            key={item.id}
            feedback={item}
            status={data.status}
            isFeedbackAction={isFeedbackAction}
            handleClickFeedback={handleClickFeedback}
          />
        ))}
      </FeedbackList>

      <Snackbar
        isOpen={!!openSnackbar}
        setIsOpen={handleHideSnackbar}
        message={openSnackbar}
      />
    </Layout>
  );
}

export default ContentFeedback;
