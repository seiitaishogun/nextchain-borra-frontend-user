import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Control, useController } from 'react-hook-form';

interface Props extends HTMLAttributes<HTMLSelectElement> {
  control: Control;
  name: string;
  disabled?: boolean;
  isDefault?: boolean;
  defaultConfig?: {
    text?: string;
    value?: string | number;
  };
  options: Array<{ text: string | number; value: string | number }>;
}

const Layout = styled.select<{ selectedDefault: boolean }>`
  appearance: none;
  width: auto;
  height: 19px;
  border: 0;
  padding-right: 13px;
  background: url('${props => `${props.theme.imageUrl}`}/common/select_arrow.svg') no-repeat right 3px center;
  background-size: 6px 4px;
  color: ${props => (props.selectedDefault ? 'rgba(0, 0, 0, 0.3)' : '#000000')};
  outline: none;

  &:disabled {
    color: rgba(0, 0, 0, 0.3);
  }
`;

function Select({
  control,
  name,
  disabled,
  isDefault,
  defaultConfig,
  options,
  ...props
}: Props) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });
  return (
    <Layout
      selectedDefault={value === defaultConfig?.value}
      {...props}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {isDefault && (
        <option className="default-option" value={defaultConfig?.value || ''}>
          {defaultConfig?.text || '선택'}
        </option>
      )}
      {options.map(({ text, value: optionValue }) => (
        <option key={optionValue} value={optionValue}>
          {text}
        </option>
      ))}
    </Layout>
  );
}

Select.defaultProps = {
  isDefault: false,
};

export default Select;
