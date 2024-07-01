import styled, { css } from 'styled-components';

const Layout = styled.div`
  h1 {
    padding: 0 ${props => props.theme.deviceMargin};
    font-size: 24px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.31px;
    text-align: left;
    color: #000;
  }

  section {
    margin-bottom: 50px;
  }

  span {
    font-size: 12px;
    letter-spacing: -0.16px;
    color: rgba(0, 32, 41, 0.5);
  }

  .ad {
    margin: 52px 0 0;
  }
`;

// FAQ 카테고리 스타일
const TypeStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px;
  border-radius: 6px;
  border: solid 1px rgba(0, 32, 41, 0.12);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.18px;
  color: #121212;
  white-space: nowrap;
  cursor: pointer;
  box-sizing: border-box;

  &.selected {
    border: 1px solid transparent;
    background-color: rgba(137, 134, 255, 0.12);

    button {
      color: #8986ff;
    }
  }
`;

const TypeUl = styled.ul`
  margin: 16px 0 24px;
  padding: 0 16px;
  display: none;
  //display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TypeItem = styled.li`
  ${TypeStyle};
  cursor: auto;
`;

export { Layout, TypeStyle, TypeUl, TypeItem };
