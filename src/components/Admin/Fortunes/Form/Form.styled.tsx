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

  > div {
    margin: 20px 0 30px;
    background-color: #fff;
  }
`;
const FormGroup = styled.div`
  display: flex;
  align-items: center;

  > label {
    max-width: 150px;
    height: 42px;
    line-height: 42px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    background-color: rgba(224, 224, 224, 1);
  }

  input {
    width: 100%;
  }

  .formGroupLabel {
    display: inline-block;
    width: 36%;
    max-width: 150px;

    &.condition {
      height: 200px;
      line-height: 200px;
    }
  }
`;
const FormGroupColumn = styled.div`
  flex-direction: column;
`;

const FormLayout = styled.form`
  > button {
    display: block;
    margin-top: 20px;
    margin-left: auto;
  }
`;

export { Layout, FormGroup, FormGroupColumn, FormLayout };
