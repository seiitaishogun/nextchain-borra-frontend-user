import React from 'react';
import styled from 'styled-components';
import { Control, useController } from 'react-hook-form';

interface Props {
  name: string;
  control: Control<any>;
  handleChange?: () => void;
}

const Layout = styled.label`
  display: flex;
  align-items: center;
  height: 19px;
  line-height: 19px;
  cursor: pointer;

  input {
    appearance: none;
    position: relative;
    width: 16px;
    height: 16px;
    background: #fff;
    margin-right: 4px;
    border: 1px solid rgba(0, 0, 0, 0.16);

    &:checked {
      border-color: #8986ff;
    }

    &:checked::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      z-index: 10;
      width: 8px;
      height: 8px;
      background: #8986ff;
    }
  }

  span {
    font-weight: normal;
    font-size: 16px;
    color: #000;
    letter-spacing: -0.21px;
  }
`;

function Checkbox({ name, control, handleChange }: Props) {
  const {
    field: { onChange, value: checkedValue },
  } = useController({
    name,
    control,
  });

  return (
    <Layout>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checkedValue}
        onChange={value => {
          if (handleChange) handleChange();
          onChange(value);
        }}
      />
    </Layout>
  );
}

export default Checkbox;
