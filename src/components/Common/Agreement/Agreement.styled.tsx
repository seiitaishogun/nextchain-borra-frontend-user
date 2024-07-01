import styled from 'styled-components';

const AgreementBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
  padding-left: 4px;
  font-size: 14px;
  color: #9b9b9b;
  line-height: 15px;

  &:first-child {
    margin-top: 0;
  }

  > div {
    display: flex;
    align-items: center;
  }
`;

const AgreementAll = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  cursor: pointer;

  input {
    width: 20px;
    height: 20px;

    &:checked::after {
      top: 4px;
      left: 4px;
      width: 10px;
      height: 10px;
    }
  }

  label {
    padding-left: 4px;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.21px;
  }
`;

const AgreementLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 0 6px;
  cursor: pointer;
`;

const AgreementLabelSpan = styled.span`
  margin-right: 4px;
  font-size: 12px;
`;

const AgreementButton = styled.button`
  font-size: 14px;
  color: #9b9b9b;
  text-decoration: underline;
`;

export {
  AgreementAll,
  AgreementBox,
  Layout,
  AgreementLabel,
  AgreementLabelSpan,
  AgreementButton,
};
