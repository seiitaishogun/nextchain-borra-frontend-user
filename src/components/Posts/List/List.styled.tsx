import styled from 'styled-components';

const Layout = styled.ul`
  li {
    list-style: none;
    padding: 16px;
    position: relative;
    border-bottom: solid 1px rgba(0, 32, 41, 0.12);

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 50%;
      right: 8px;
      width: 16px;
      height: 16px;
      transform: translateY(-50%);
      background-image: url('${process.env
        .APP_IMAGE_URL}/common/arrow-right.svg');
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
    }
  }

  p {
    margin-bottom: 8px;
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
`;

export { Layout };
