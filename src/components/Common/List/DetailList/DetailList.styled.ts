import styled from 'styled-components';

const Layout = styled.div`
  padding: 0 16px;
`;

const Card = styled.div`
  border-bottom: 1px solid #e0e0e0;

  &:first-child {
    margin-top: 0;
  }

  .card-link {
    display: flex;
    width: 328px;
    height: 122px;
    padding: 16px 0;
    cursor: pointer;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 122px);
  padding: 4px 0 4px 20px;
  box-sizing: border-box;
`;

const InfoTitle = styled.h4`
  overflow: hidden;
  font-size: 16px;
  font-weight: 500;
  color: #222;
  line-height: normal;
  letter-spacing: -0.21px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoSummary = styled.p`
  overflow: hidden;
  max-height: 38px;
  margin-top: 4px;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoStatusBox = styled.div`
  display: flex;
  margin-top: 6px;
  font-size: 12px;
  text-align: left;
  letter-spacing: -0.16px;
  color: rgba(0, 0, 0, 0.5);
`;

const InfoStatusIcon = styled.div`
  position: relative;
  margin-right: 8px;
  padding: 0 10px 0 15px;
  background-repeat: no-repeat;
  background-size: 11px 11px;
  background-position-x: left;
  line-height: 14px;

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    right: 0;
    z-index: 10;
    width: 1px;
    height: 10px;
    background: rgba(0, 0, 0, 0.3);
  }

  &:last-child {
    margin-right: 0;
    padding-right: 0;

    &:after {
      display: none;
    }
  }
`;

const InfoStatusLikeIcon = styled(InfoStatusIcon)`
  background-image: url('${process.env
    .APP_IMAGE_URL}/common/like_fill_fe021f.svg');
  background-position-y: 2px;
  color: #fe032f;
`;

const InfoStatusViewIcon = styled(InfoStatusIcon)`
  background-image: url('${props => `${props.theme.imageUrl}/common/view.svg`}');
  background-position-y: 1px;
`;

export {
  Layout,
  Card,
  Info,
  InfoTitle,
  InfoSummary,
  InfoStatusBox,
  InfoStatusIcon,
  InfoStatusLikeIcon,
  InfoStatusViewIcon,
};
