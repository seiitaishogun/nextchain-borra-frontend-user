import styled from 'styled-components';

const Layout = styled.header`
  position: fixed;
  top: 0;
  z-index: 1000;
  overflow: hidden;
  width: ${props => props.theme.deviceSize};
  height: 50px;
  padding: 0 16px 0 14px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
`;
const Search = styled.div`
  border: none;
  background: transparent;

  .icon {
    width: 23px;
    height: 23px;
    background: url('${process.env
        .APP_IMAGE_URL}/layout/header/search.svg')
      no-repeat center center;
    background-size: contain;
  }
`;
const Menu = styled.button`
  padding: 0;
  border: none;
  background: transparent;

  .icon {
    width: 26px;
    height: 26px;
    background: url('${process.env
        .APP_IMAGE_URL}/layout/header/menu.svg')
      no-repeat center center;
    background-size: 23px;
  }
`;

export { Layout, Wrap, Item, Search, Menu };
