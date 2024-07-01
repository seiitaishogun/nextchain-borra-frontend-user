import styled from 'styled-components';

const Layout = styled.div`
  position: relative;
  z-index: 10;
  box-sizing: border-box;
  padding: 0 16px 12px;
  width: 100%;
  background: #fff;

  .search-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;

    // TextField
    > div {
      width: 100%;

      input {
        background: transparent;
      }
    }

    > button {
      padding: 0;
      margin: 0;
      width: 20px;
      height: 20px;
      border: none;
      background: transparent;

      .icon {
        width: 100%;
        height: 100%;
        display: inline-block;
        background: url('${process.env
            .APP_IMAGE_URL}/layout/header/search.svg')
          no-repeat center;
        background-size: contain;
      }
    }
  }
`;

export { Layout };
