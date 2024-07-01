import styled, { css } from 'styled-components';

const TagStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33px;
  padding: 0 10px;
  border: solid 1px rgba(0, 0, 0, 0.08);
  border-radius: 100px;
  box-sizing: border-box;
  background: #fff;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  letter-spacing: -0.18px;
  white-space: nowrap;
  cursor: pointer;

  &.selected {
    background-color: rgba(137, 134, 255, 0.12);
    border: solid 1px rgba(137, 134, 255, 0.12);
    font-weight: 600;
    color: #8986ff;
  }

  button {
    color: rgba(0, 0, 0, 0.8);
  }

  &.selected button {
    color: #8986ff;
  }
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

const TagItem = styled.li`
  ${TagStyle};
  cursor: auto;
`;

export { TagStyle, TagList, TagItem };
