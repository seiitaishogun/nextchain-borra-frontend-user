import styled, { css } from 'styled-components';
import { activeButtonStyle } from '@/components/Common/Button/Button.styled';

const Layout = styled.fieldset`
  width: 100%;
  padding: 35px 0 0;
  box-sizing: border-box;
`;

const SurveyItem = styled.label<{ isSelected: boolean }>`
  ${activeButtonStyle};
  margin-top: 20px;
  ${props =>
    props.isSelected &&
    css`
      background: ${props.theme.colors.primary};
    `};

  &:first-child {
    margin-top: 0;
  }
`;

const SurveyInput = styled.input`
  display: none;
`;

export { Layout, SurveyItem, SurveyInput };
