import styled from 'styled-components';
import Link from 'next/link';

const Layout = styled.ul`
  .item {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top: 6px;
    padding: 12px 16px;
    height: 66px;
    align-items: center;

    cursor: pointer;

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    &:first-child {
      margin-top: 0px;
    }

    .info {
      display: flex;
      align-items: center;

      .thumb {
        width: 42px;
        height: 42px;
        margin-right: 12px;
        border-radius: 100%;
        background: url('${props => `${props.theme.imageUrl}/main/blur.png`}')
          no-repeat center;
        background-size: cover;
      }

      .title {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.18px;
      }
    }

    .arrow {
      width: 16px;
      height: 16px;
      background: url('${props =>
          `${props.theme.imageUrl}/common/arrow-right.svg`}')
        no-repeat center;
      background-size: contain;
    }
  }
`;

function ThemeList() {
  return (
    <Layout>
      <li className="item">
        <Link href="/category/themes/1" legacyBehavior>
          <div className="wrapper">
            <div className="info">
              <div className="thumb" />
              <div className="title">그 사람의 진심은?</div>
            </div>
            <div className="arrow" />
          </div>
        </Link>
      </li>
      <li className="item">
        <div className="info">
          <div className="thumb" />
          <div className="title">싫어하는 사람이 생겼어요</div>
        </div>
        <div className="arrow" />
      </li>
      <li className="item">
        <div className="info">
          <div className="thumb" />
          <div className="title">넷플봐도 될까요?</div>
        </div>
        <div className="arrow" />
      </li>
    </Layout>
  );
}

export default ThemeList;
