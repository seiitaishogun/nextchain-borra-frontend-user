import styled from 'styled-components';

const Layout = styled.section`
  padding: 36px 16px 79px;
  background-color: #eaeef3;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.5px;
  line-height: 20px;

  button,
  a {
    color: #929294;
  }

  .footerInfo {
    padding-bottom: 20px;

    ul {
      display: flex;

      li {
        position: relative;
        margin-right: 20px;

        &:first-child button {
          font-weight: 600;
        }

        &::after {
          content: '';
          display: inline-block;
          position: absolute;
          height: 10px;
          width: 1px;
          background-color: #929294;
          top: 50%;
          right: -12px;
          transform: translateY(-50%);
        }

        &:last-child:after {
          display: none;
        }
      }
    }
  }

  .companyInfo {
    padding-top: 20px;
    margin: 0 auto;
    width: fit-content;
    border-top: 1px solid #92929475;
    color: #929294;
  }

  dl {
    display: flex;
  }

  dt {
    padding-right: 10px;
    min-width: 100px;
    text-align: left;
  }
`;

export { Layout };
