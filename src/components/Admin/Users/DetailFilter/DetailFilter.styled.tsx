import { DialogContent } from '@mui/material';
import styled from 'styled-components';

const Layout = styled.section`
  margin: 20px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(224, 224, 224, 1);
  background-color: rgba(255, 255, 255, 1);

  .buttonWrap {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const DialogContentLayout = styled(DialogContent)`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  margin: 0 auto;

  > div {
    margin: 0 auto;
  }

  span {
    display: block;
    color: red;
    line-height: normal;
  }
`;

const CoinFormLayout = styled.div`
  display: flex;

  button {
    margin-left: 10px;
  }

  span.error {
    margin-top: 5px;
    display: block;
    font-size: 10px;
    color: red;
  }
`;

export { Layout, DialogContentLayout, CoinFormLayout };
