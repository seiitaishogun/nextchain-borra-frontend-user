import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

interface Props {
  isLike: boolean;
  handleUpdateLike: () => void;
}

const Layout = styled.button`
  background: url('${process.env
      .APP_IMAGE_URL}/common/like_border_7f7f7f.svg')
    no-repeat center center #ffffff;

  &.active {
    background-image: url('${process.env
      .APP_IMAGE_URL}/common/like_fill_fe021f.svg');
  }
`;

function LikeButton({ isLike, handleUpdateLike }: Props) {
  return (
    <Layout
      type="button"
      className={classNames('btn-left', 'btn-like', { active: isLike })}
      onClick={handleUpdateLike}
    >
      좋아요
    </Layout>
  );
}

export default LikeButton;
export type { Props as LikeButtonProps };
