import styled, { css } from 'styled-components';

const Layout = styled.article`
  margin-top: 40px;
  padding: 0 20px;
`;

const FeedbackTitle = styled.h4`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
`;

const FeedbackList = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const FeedbackItem = styled.li<{ isFeedbackAction?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  cursor: ${props => (props.isFeedbackAction ? 'pointer' : 'default')};
`;

const FeedbackIconBox = styled.div<{ isSelected: boolean }>`
  position: relative;
  border-radius: 50%;
  ${props =>
    props.isSelected &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: url('${process.env
            .APP_IMAGE_URL}/contents/feedback/feedback_selected_bg.svg')
          no-repeat center center rgba(121, 73, 255, 0.5);
        filter: blur(5px);
      }
    `}
`;

const FeedbackItemName = styled.span<{ isCount: boolean }>`
  margin-top: 7px;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
`;

const FeedbackItemCount = styled.span`
  margin-top: 4px;
  font-size: 12px;
  line-height: 15px;
  color: ${props => props.theme.colors.primary800};

  + ${FeedbackItemName} {
    margin-top: 4px;
  }
`;

export {
  Layout,
  FeedbackTitle,
  FeedbackList,
  FeedbackItem,
  FeedbackIconBox,
  FeedbackItemCount,
  FeedbackItemName,
};
