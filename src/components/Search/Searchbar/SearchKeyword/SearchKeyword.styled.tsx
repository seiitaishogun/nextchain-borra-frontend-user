import styled from 'styled-components';

const Layout = styled.div`
  position: absolute;
  top: 118px;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  padding: 0 20px 20px;
  width: 360px;
  background: white;

  li {
    display: flex;
    justify-content: space-between;
    padding: 0 0 10px 0;
    margin-top: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);

    a:active,
    a:hover {
      color: black;
    }

    .item {
      display: flex;
      align-items: center;
      font-size: 14px;

      > svg {
        margin-right: 3px;
      }
    }

    .del {
      appearance: none;
      border: none;
      cursor: pointer;
      background: transparent;
      width: 12px;
      height: 12px;
      margin: 0;
      padding: 0;

      .icon {
        display: flex;
        width: 100%;
        height: 100%;
        background: url('${props => `${props.theme.imageUrl}/search/cancel.svg`}')
          no-repeat center;
        background-size: 8px;
      }
    }
  }
`;

const Best = styled.div`
  .label {
    padding: 4px 6px;
    margin-right: 2px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
  }
`;

export { Layout, Best };
