import styled from 'styled-components';
import { TagItem, TagList } from '@/components/Common/Tag/Tag.styled';

const Layout = styled.div`
  margin-top: 16px;
  padding: 0 16px;
`;

const Description = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #000;
  letter-spacing: -0.18px;
  white-space: pre-wrap;
`;

const BottomContents = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 12px;
`;

const TagBox = styled(TagList)`
  width: 195px;
  margin-top: 0;

  ${TagItem} {
    &:nth-child(1n) {
      order: 1;
    }

    &:nth-child(2n) {
      order: 1;
    }

    &:nth-child(3n) {
      order: 1;
    }
  }
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  height: 33px;

  .item {
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 12px;
    padding-right: 12px;
    font-weight: 500;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
    letter-spacing: -0.16px;

    &::before {
      content: '';
      position: absolute;
      top: 9px;
      right: 0;
      width: 1px;
      height: 9px;
      background: rgba(0, 0, 0, 0.2);
    }

    &:last-child {
      margin-right: 0;
      padding-right: 0;

      &::before {
        display: none;
      }
    }

    .icon {
      width: 28px;
      height: 28px;
      margin-right: 4px;
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 50%;
      box-sizing: border-box;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 14px 14px;

      &.like {
        background-image: url('${process.env
          .APP_IMAGE_URL}/common/like_border_7f7f7f.svg');

        &.active {
          background-image: url('${process.env
            .APP_IMAGE_URL}/common/like_fill_fe021f.svg');
        }
      }

      &.share {
        background-image: url('${process.env
          .APP_IMAGE_URL}/common/share.svg');
        background-size: 14px 14px;
      }

      &.view {
        background-image: url('${process.env
          .APP_IMAGE_URL}/common/view.svg');
        background-size: 14px 14px;
      }
    }

    .count {
      font-weight: 500;
      font-size: 12px;
      letter-spacing: -0.16px;
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;

export { Layout, Description, BottomContents, TagBox, CountBox };
