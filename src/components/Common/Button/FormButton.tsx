import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { buttonStyle } from '@/components/Common/Button/Button.styled';

interface Props {
  isValid: boolean;
  activeText?: string | React.ReactNode;
  disabledText?: string | React.ReactNode;
  onClick: () => void;
  bgColor?: string;
}

const Layout = styled.button<{ bgColor?: string }>`
  ${buttonStyle};
  background: ${props => props.bgColor || props.theme.colors.primary};

  &.disabled {
    background: rgba(0, 0, 0, 0.5);
  }
`;

function FormButton({
  isValid,
  activeText,
  disabledText,
  onClick,
  bgColor,
}: Props) {
  return (
    <Layout
      type="button"
      className={classNames('btn-submit', { disabled: !isValid })}
      disabled={!isValid}
      onClick={onClick}
      bgColor={bgColor}
    >
      {isValid && (activeText || '저장')}
      {!isValid && (disabledText || '정보를 입력해주세요')}
    </Layout>
  );
}

export default FormButton;
