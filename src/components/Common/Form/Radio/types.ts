import React, { InputHTMLAttributes } from 'react';
import { Control } from 'react-hook-form';

interface SingleRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  value: string | number;
  labelText: string | React.ReactNode | JSX.Element;
}

interface MultiRadioProps {
  name: string;
  control: Control<any>;
  radios: Array<{
    value: string | number;
    labelText: string | React.ReactNode | JSX.Element;
  }>;
}

export type { SingleRadioProps, MultiRadioProps };
