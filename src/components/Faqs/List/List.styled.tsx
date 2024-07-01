import styled from 'styled-components';

const Layout = styled.button`
  width: 100%;
  text-align: left;
  border-bottom: solid 1px rgba(0, 32, 41, 0.12);

  .header {
    padding: 12px 16px;
    position: relative;
    height: 36px;
    display: flex;
    align-items: center;

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 50%;
      right: 16px;
      width: 16px;
      height: 16px;
      transform: translateY(-50%);
      background-image: url('${process.env
        .APP_IMAGE_URL}/common/arrow_up.svg');
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
    }

    span {
      display: none;
      //display: inline-block;
      margin-bottom: 4px;
    }

    &.active {
      &::after {
        background-image: url('${process.env
          .APP_IMAGE_URL}/common/arrow_down.svg');
      }
    }
  }

  .contents {
    height: fit-content;
    margin: 0 16px;
    padding: 16px 0;
    border-top: solid 1px rgba(0, 32, 41, 0.12);
    font-size: 16px;
    line-height: 1.75;
    word-break: normal;
    font-weight: 400;

    p {
      font-size: 16px;
      line-height: 1.75;
      word-break: normal;
      font-weight: 400;
    }
  }

  p {
    margin-right: 12px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.21px;
    color: #121212;
  }

  span {
    font-size: 12px;
    letter-spacing: -0.16px;
    color: rgba(0, 32, 41, 0.5);
  }

  .type {
    li {
      button {
        height: 33px;
        padding: 0 7px;
        border: solid 1px rgba(0, 0, 0, 0.08);
        border-radius: 100px;
      }
    }
  }
`;

export { Layout };
