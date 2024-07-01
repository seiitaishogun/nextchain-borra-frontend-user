import Image from 'next/image';
import {
  FeedbackIconBox,
  FeedbackItem as Layout,
  FeedbackItemCount,
  FeedbackItemName,
} from '@/components/Contents/Feedback/Feedback.styled';
import { FeedbackT } from '@/types/content/feedback';

interface Props {
  feedback: FeedbackT;
  status: number | null;
  isFeedbackAction?: boolean;
  handleClickFeedback: (feedback: FeedbackT) => void;
}

function FeedbackItem({
  feedback,
  status,
  isFeedbackAction,
  handleClickFeedback,
}: Props) {
  const feedbackImg = `/contents/feedback/feedback_icon_${feedback.id}.svg`;
  const isSelected = status === feedback.id;
  const isCount = feedback.count > 0;

  return (
    <Layout
      isFeedbackAction={isFeedbackAction}
      onClick={() => handleClickFeedback(feedback)}
    >
      <FeedbackIconBox isSelected={isSelected}>
        <Image src={feedbackImg} width={50} height={50} alt="" />
      </FeedbackIconBox>
      {feedback.count > 0 && (
        <FeedbackItemCount>{feedback.count}</FeedbackItemCount>
      )}
      <FeedbackItemName isCount={isCount}>{feedback.name}</FeedbackItemName>
    </Layout>
  );
}

export default FeedbackItem;
