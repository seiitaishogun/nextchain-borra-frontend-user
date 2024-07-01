import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  align-items: center;
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
    border-radius: 50%;

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
      border-radius: 50%;
      background: #8986ff;
    }
  }
`;

function RadioBox({ name, checked, onChange, children }: any) {
  return (
    <Layout>
      <label>
        <input type="radio" name={name} checked={checked} onChange={onChange} />
        {children}
      </label>
    </Layout>
  );
}

export default RadioBox;
