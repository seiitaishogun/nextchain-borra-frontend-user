import styled, { css } from 'styled-components';

const PaddingBox = styled.div`
  padding: 0 16px;
`;

const DataLayout = styled.div`
  margin-top: 8px;

  &:first-child {
    margin-top: 0;
  }

  > div {
    margin-top: 20px;

    &:first-child {
      margin-top: 0;
    }
  }
`;

const ChildLayout = styled.div<{ sign?: string | null }>`
  margin-top: 26px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  > h4 {
    font-weight: 600;
    font-size: 17px;
    line-height: 19px;
    letter-spacing: -0.18px;
    color: #000000;

    ${props =>
      props.sign &&
      css`
        padding-left: 24px;
        background: url('${process.env
            .APP_IMAGE_URL}/contents/icons/${props.sign}.svg')
          no-repeat left top;
        background-size: 18px 18px;
      `}
  }

  p {
    line-height: 1.75;
    word-break: normal;
    font-weight: 500;
  }
`;

const ContentLayout = styled.section`
  padding: ${props => props.theme.deviceMargin};
  margin: 16px 0;
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.05);
  font-size: 15px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: -0.18px;
  color: rgba(0, 0, 0, 0.8);
  word-break: break-all;

  > h3 {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.23px;
    line-height: 21px;
    color: #000000;
  }
`;

const ContentBox = styled.article`
  padding: 0 0 10px;
  background: #ffffff;
`;

const ShareBox = styled.div`
  margin-top: 48px;
  padding: 0 16px;

  p {
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.18px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 52px;
    margin-top: 12px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.21px;

    &.btn-share {
      border: 1px solid rgba(0, 0, 0, 0.08);
      background: #ffffff;
    }

    &.btn-flag {
      border: 0;
      background: #8986ff;
      color: #ffffff;
    }
  }
`;

const TabBox = styled.div`
  margin-top: 24px;

  h4 {
    margin-top: 12px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.23px;
    color: #000000;
  }
`;

const RecommendContent = styled.div`
  margin-top: 80px;
  padding: 0 16px;
`;

export {
  PaddingBox,
  DataLayout,
  ChildLayout,
  ContentLayout,
  ContentBox,
  ShareBox,
  TabBox,
  RecommendContent,
};
