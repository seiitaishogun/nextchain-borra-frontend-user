import styled, { css } from 'styled-components';

const Layout = styled.div`
  display: flex;
  margin-top: 16px;
`;

const SwipeLayout = styled.div<{ size: string }>`
  margin-top: 16px;

  .swiper-slide {
    min-width: ${({ size }) => ThumbnailSize[size]}px;
    max-width: ${({ size }) => ThumbnailSize[size]}px;
  }
`;

const Content = styled.div<{ size: string }>`
  ${({ size }) => ContentStyle[size]}
  list-style: none;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

const Thumbnail = styled.div<{ size: string }>`
  width: ${({ size }) => ThumbnailSize[size]}px;
  height: ${({ size }) => ThumbnailSize[size]}px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;

  ${({ size }) => ThumbStyle[size]}
  .like-btn {
    position: absolute;
    overflow: hidden;
    border: none;
    background: url('${process.env
        .APP_IMAGE_URL}/common/like_border_ffffff.svg')
      no-repeat center center;
    text-indent: -9999px;
    cursor: pointer;

    &.active {
      background-image: url('${process.env
        .APP_IMAGE_URL}/common/like_fill_fe021f.svg');
    }
  }
`;

const Title = styled.div<{ size: string }>`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  letter-spacing: -0.18px;
  font-weight: 500;
  color: #222;
  word-break: break-all;
  ${({ size }) => TitleStyle[size]}
`;

const Meta = styled.div<{ size: string }>`
  color: rgba(0, 0, 0, 0.5);

  ${({ size }) => MetaStyle[size]}
  .hit {
    display: flex;
    align-items: center;

    .view {
      width: 12px;
      height: 12px;
      background: url('${props => `${props.theme.imageUrl}/main/view.svg`}')
        no-repeat center center;
      background-size: 12px 12px;
    }

    .cnt {
      margin-left: 4px;
      font-size: 14px;
      letter-spacing: -0.16px;
    }
  }
`;

const ContentStyle: Record<string, any> = {
  small: css`
    margin-right: 10px;
  `,
  medium: css`
    margin-right: 15px;
  `,
  large: css``,
};

const ThumbnailSize: Record<string, any> = {
  small: 103,
  medium: 125,
};

const ThumbStyle: Record<string, any> = {
  small: css`
    .like-btn {
      top: 8px;
      right: 6px;
      width: 20px;
      height: 20px;
      background-size: 12px;
    }
  `,
  medium: css`
    .like-btn {
      width: 20px;
      height: 20px;
      top: 8px;
      right: 8px;
      padding: 2px;
      background-size: 15px;
    }
  `,
  large: css``,
};

const TitleStyle: Record<string, any> = {
  small: css`
    margin-top: 12px;
    width: 103px;
    max-height: 36px;
    font-size: 15px;
    line-height: 18px;
  `,

  medium: css`
    width: 120px;
    max-height: 36px;
    margin-top: 13px;
    font-size: 15px;
    line-height: 18px;
  `,
  large: css``,
};

const MetaStyle: Record<string, any> = {
  small: css`
    margin-top: 6px;
  `,
  medium: css`
    margin-top: 4px;
  `,
  large: css``,
};

const EmptyList = styled.div`
  padding: 40px 0 20px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
  line-height: normal;
  letter-spacing: -0.18px;
`;

export { Layout, SwipeLayout, Content, Thumbnail, Title, Meta, EmptyList };
