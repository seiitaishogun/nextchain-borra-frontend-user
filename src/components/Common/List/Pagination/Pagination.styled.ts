import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  justify-content: center;
  margin: 14px 0;

  .MuiPaginationItem-root {
    width: 25px;
    min-width: 25px;
    height: 25px;
    box-sizing: border-box;
    padding: 0;
    border: 1px solid #e1e8f4;
    background-color: #fff;
    color: #aab7ce !important;
    font-size: 12px;

    &.Mui-selected {
      border: 1px solid #8986ff;
      background-color: #fff;
      color: #8986ff;
    }
  }
`;

export { Layout };
