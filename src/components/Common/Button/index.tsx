import React, { ButtonHTMLAttributes } from 'react';
import { ButtonLayout } from '@/components/Common/Button/Button.styled';

interface ButtonProps extends ButtonHTMLAttributes<any> {
  label?: string | React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  primary?: boolean;
  shadow?: boolean;
  border?: boolean;
}

function Button({
  type,
  onClick,
  label,
  primary,
  shadow,
  border,
}: ButtonProps) {
  return (
    <ButtonLayout
      type={type}
      onClick={onClick}
      primary={primary}
      shadow={shadow}
      border={border}
    >
      {label}
    </ButtonLayout>
  );
}

export default Button;
