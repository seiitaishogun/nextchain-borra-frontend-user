import styled from 'styled-components';

const Layout = styled.div`
  width: 100%;
  margin: 20px 0;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);

  .searchAll {
    display: inline-flex;
    align-items: center;
  }

  .spanSpace {
    margin: 0 4px;
  }

  .checkboxPosition {
    margin-left: auto;
    width: fit-content;
  }

  h2 {
    padding: 30px 10px 20px;
  }
`;

export { Layout };
