import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 252px;
  padding: 13px 0 18px;
  box-sizing: border-box;
  background: url('${process.env
      .APP_IMAGE_URL}/contents/survey/header_bg.png')
    no-repeat center center;
  background-size: cover;
`;

const SurveyCount = styled.div`
  display: flex;
  justify-content: center;
  font-family: ${props => props.theme.fontFamilies.notoSans};
  font-size: 20px;
  line-height: 33px;
  color: #aeaeae;

  strong {
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.theme.colors.primary};
  }
`;

const SurveyTitle = styled.h4`
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  font-size: 25px;
  line-height: 35px;
  text-align: center;
  letter-spacing: -0.023em;
  word-break: break-word;
`;

export { Layout, SurveyCount, SurveyTitle };
