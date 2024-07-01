import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  box-sizing: border-box;

  button {
    line-height: 19px;
    cursor: pointer;
  }

  button.btn-left {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 52px;
    height: 52px;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    box-sizing: border-box;
    text-indent: -9999px;
  }

  .btn-submit {
    width: calc(100% - 60px);

    div + span {
      margin-left: 12px;
    }
  }
`;

const WaitFreeDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 30px 0 10px;

  p {
    margin-left: 10px;
    padding-right: 20px;

    &.active {
      font-size: 14px;
      padding-right: 0;
    }
  }
`;

const FirstFreeDescription = styled.div`
  display: flex;

  p {
    margin-left: 10px;
    font-size: 14px;
  }
`;

const FirstFreeClockDescription = styled(FirstFreeDescription)`
  justify-content: flex-start;
  width: 100%;

  p {
    margin-left: 18px;
  }
`;

export {
  Layout,
  WaitFreeDescription,
  FirstFreeDescription,
  FirstFreeClockDescription,
};
