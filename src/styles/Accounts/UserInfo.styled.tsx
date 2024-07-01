import styled, { css } from 'styled-components';

const Layout = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 24px;
  padding-bottom: 4px;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    font-weight: bold;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: -0.29px;
    color: #000000;
  }
`;

const Favorite = styled.div<{ is_favorite?: boolean }>`
  overflow: hidden;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  background-image: url(${props =>
    props.is_favorite
      ? `${props.theme.imageUrl}/common/like_fill_fe021f.svg`
      : `${props.theme.imageUrl}/common/like_border_7f7f7f.svg`});
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #ffffff;
  background-size: 20px 20px;
  text-indent: -9999px;
`;

const DetailBox = styled.div`
  display: flex;
  margin-top: 8px;
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  letter-spacing: -0.18px;
  color: rgba(0, 0, 0, 0.5);

  > div {
    position: relative;
    margin-right: 8px;
    padding-right: 10px;

    &:before {
      content: '';
      position: absolute;
      top: 2px;
      right: 0;
      z-index: 10;
      width: 1px;
      height: 12px;
      background: rgba(0, 0, 0, 0.3);
    }

    &:last-child {
      margin-right: 0;
      padding-right: 0;

      &:before {
        display: none;
      }
    }
  }

  span {
    &::after {
      content: '·';
      margin: 0 3px;
    }

    &:last-child::after {
      display: none;
    }
  }
`;

const UnknownButton = styled.button<{ is_birthed_time: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 33px;
  padding: 0 9px 0 6px;
  border: 1px solid rgba(0, 32, 41, 0.12);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.18px;
  color: #121212;

  ${props =>
    !props.is_birthed_time &&
    css`
      border: 0;
      background-color: rgba(137, 134, 255, 0.12);
      color: #8986ff;
    `}
  svg {
    width: 19px;
    height: 19px;
    color: ${props => (!props.is_birthed_time ? '#8986ff' : 'rgba(0,0,0,0.3)')};
  }
`;

export { Layout, TopBox, DetailBox, Favorite, UnknownButton };
