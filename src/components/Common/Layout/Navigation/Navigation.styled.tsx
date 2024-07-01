import styled from 'styled-components';

const Layout = styled.footer`
  position: fixed;
  bottom: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 360px;
  height: 50px;
  padding: 0 10px;
  border-top: solid 0.5px rgba(60, 60, 67, 0.36);
  background-color: rgba(249, 249, 249, 0.94);

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 9.5px;
    height: 100%;
  }
`;

const Menu = styled.li<{ src: string }>`
  position: relative;
  width: 75px;
  height: 100%;
  text-align: center;

  a {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }

  .text {
    padding-top: 4px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 10px;
    font-weight: 500;
  }

  .icon {
    width: 24px;
    height: 20px;
    background: ${({ src }) => `url("${src}")`} no-repeat center;
  }

  &.isActive {
    a::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -2px;
      left: 0;
      overflow: hidden;
      width: 100%;
      height: 4px;
    }

    span {
      color: #8986ff;
    }
  }
`;
export { Layout, Menu };
