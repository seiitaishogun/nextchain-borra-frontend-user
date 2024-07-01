import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Control, useController } from 'react-hook-form';

const Layout = styled.div`
  input {
    width: 100%;
    height: 19px;
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: normal;
    font-size: 16px;
    color: #000;
    letter-spacing: -0.21px;
    outline: none;

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
}

function TextField({ control, name, type, ...props }: Props) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });
  return (
    <Layout>
      <input
        type={type || 'text'}
        {...props}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Layout>
  );
}

export default TextField;
