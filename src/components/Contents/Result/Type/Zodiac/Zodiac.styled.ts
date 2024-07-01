import styled, { css } from 'styled-components';

const ItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  background-color: #fff;
  background-position: center left 8px;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.18px;
  white-space: nowrap;
  cursor: pointer;
`;

const ActiveItemStyle = css`
  background-color: rgba(137, 134, 255, 0.12);
  border: solid 1px rgba(137, 134, 255, 0.12);
  font-weight: 600;
  color: #8986ff;
`;

const TagItem = styled.button<{ iconImg: string | null }>`
  ${ItemStyle};
  background-image: url(${props => props.iconImg});
  padding: ${props => (props.iconImg ? '0 8px 0 28px' : '0 8px')};

  &.selected {
    ${ActiveItemStyle};
  }
`;

export { ItemStyle, ActiveItemStyle, TagItem };
