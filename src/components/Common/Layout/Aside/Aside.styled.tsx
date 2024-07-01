import styled from 'styled-components';

const Layout = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 288px;
  height: 100%;
  box-sizing: border-box;
`;

const Close = styled.button`
  width: 32px;
  height: 32px;
  display: block;
  margin-top: 30px;
  margin-left: auto;
  margin-right: 16px;
  border: none;
  background: url('${props => `${props.theme.imageUrl}`}/layout/aside/cancel.svg') no-repeat center;
  background-size: 16px;
  appearance: none;
  cursor: pointer;
`;

const Condition = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 50.5px 20px 0;
  box-sizing: border-box;
`;

const Welcome = styled(Condition)`
  .account {
    display: flex;
    justify-content: space-between;
    position: relative;

    .message {
      font-weight: 600;
      font-size: 24px;
      line-height: 130.84%;

      .name {
        color: #8886ff;
      }

      .date {
        color: rgba(0, 0, 0, 0.5);
        font-weight: 400;
        font-size: 14px;
        letter-spacing: -0.013em;
      }
    }
  }

  .event-list {
    display: flex;
    margin-top: 12px;

    .event {
      margin-right: 8px;
      padding: 6px 8px;
      background: rgba(137, 134, 255, 0.12);
      border-radius: 6px;

      &:last-child {
        margin-right: 0;
      }

      img {
        margin-right: 4px;
      }

      .text {
        color: #8986ff;
        letter-spacing: -0.013em;
        font-size: 14px;
      }
    }
  }
`;

const User = styled(Condition)`
  align-items: flex-start;
  justify-content: space-between;

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;

    .text {
      margin-right: 9.9px;
      font-size: 18px;
      font-weight: bold;
      color: #000;
    }

    .arrow {
      width: 9px;
      height: 15px;
      background: url('${process.env
          .APP_IMAGE_URL}/layout/aside/arrow_cccccc.svg')
        no-repeat;
      background-size: contain;
    }
  }

  .message {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 30px;
    margin-top: 9.5px;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.04);
    vertical-align: middle;

    .text {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      line-height: 16px;
    }
  }
`;

const MenuList = styled.ul`
  margin-top: 18px;
  border-top: 1px solid rgba(195, 210, 234, 0.5);

  li {
    padding: 38px 20px 0;

    &:first-child {
      padding-top: 23.5px;
    }

    a,
    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border: none;
      background-color: transparent;
      cursor: pointer;

      .menu {
        display: flex;
        align-items: center;
      }

      .arrow {
        width: 5.7px;
        height: 10px;
        background: url('${process.env
            .APP_IMAGE_URL}/layout/aside/arrow_808080.svg')
          no-repeat;
        background-size: contain;
      }
    }

    span {
      display: inline-block;
      margin-left: 13px;
      font-size: 16px;
      color: #222;
    }
  }
`;

const BottomButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 60px;
  padding: 0 20px 80px 0;
`;

const BottomButton = styled.button`
  position: relative;
  appearance: none;
  margin-right: 12px;
  padding-right: 12px;
  border: none;
  background: transparent;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:last-child {
    margin-right: 0;
    padding-right: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    right: 0;
    z-index: 10;
    width: 1px;
    height: 12px;
    background: rgba(0, 0, 0, 0.3);
  }

  &:last-child::after {
    display: none;
  }
`;

export {
  MenuList,
  Close,
  User,
  Welcome,
  Layout,
  BottomButtonBox,
  BottomButton,
};
