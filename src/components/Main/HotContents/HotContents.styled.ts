import styled from 'styled-components';

const Layout = styled.section`
  margin-top: 40px;

  > .title {
    padding: 0 16px;
  }

  .swiper {
    margin-top: 16px;
    padding: 0 16px;

    .swiper-slide {
      width: 235px;
      height: 280px;
    }
  }
`;

const Card = styled.div`
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0) 10%,
    rgba(20, 20, 20, 0) 25%,
    rgba(20, 20, 20, 0.3) 50%,
    rgba(20, 20, 20, 0.6) 75%,
    rgba(0, 0, 0, 0.8) 100%
  );
  cursor: pointer;

  img {
    position: absolute;
    z-index: -1;
  }

  .label {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 21px;
    width: 37px;
    height: 59px;
    background: url('${props => `${props.theme.imageUrl}/main/label.svg`}')
      no-repeat;
    background-size: 37px 59px;

    .label-text {
      margin-top: 18px;
      height: fit-content;
      color: ${({ theme }) => theme.colors.white};
      letter-spacing: -0.16px;
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    min-height: 80px;
    padding: 20px 24px 20px;

    .title {
      overflow: hidden;
      width: 100%;
      max-height: 49px; // TODO 1줄일 때 디자인 기획 확인 필요
      color: ${({ theme }) => theme.colors.white};
      font-size: 18px;
      font-weight: 500;
      line-height: 1.34;
      letter-spacing: -0.23px;
      word-break: break-all;
      // TODO ellipse
    }

    .sub {
      position: absolute;
      bottom: 20px;
      margin-top: 12px;
      color: ${({ theme }) => theme.colors.white};
      font-size: 12px;
      letter-spacing: -0.16px;
    }
  }
`;
export { Layout, Card };
