import styled from 'styled-components';

const Layout = styled.div`
  position: relative;
  width: 100%;

  h2 {
    margin-bottom: 20px;
    font-size: ${({ theme }) => theme.fontSizes.lg_x};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  > button {
    position: absolute;
    right: 0;
    top: 0;
  }
`;
const FormGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;

  > label {
    max-width: 150px;
    height: 58px;
    line-height: 58px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    background-color: rgba(244, 244, 244, 1);
  }

  input {
    width: 100%;
  }

  .formGroupLabel {
    display: inline-block;
    width: 36%;
    max-width: 150px;

    &.theme {
      height: 100px;
      line-height: 100px;
    }
  }
`;
const FormGroupColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;
const LabelGroup = styled.div`
  label {
    background-color: #ffffff;
  }
`;

export { Layout, FormGroup, FormGroupColumn, LabelGroup };
