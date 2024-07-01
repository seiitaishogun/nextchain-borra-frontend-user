import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import {
  Content,
  Meta,
  Thumbnail,
  Title as ContentTitle,
} from '@/components/Common/Card/Card.styled';
import LazyImage from '@/components/Common/LazyImage';
import { CardItemProps } from '@/components/Common/Card/Card.types';
import { numberWithCommas } from '@/utils/number';

function CardItem({ data, size, isLike, getLink }: CardItemProps) {
  const {
    id,
    content_id,
    thumbnail,
    name,
    view_count,
    isLike: isActiveLike,
  } = data;
  return (
    <Content size={size}>
      <Link key={id} href={getLink({ id: content_id || id, purchaseId: id })}>
        <Thumbnail size={size}>
          <LazyImage
            lazy
            src={
              thumbnail ||
              `${process.env.APP_IMAGE_URL}/contents/thumbnail/default_thumbnail_square.png`
            }
            alt={name}
          />
          {isLike && (
            <button
              type="button"
              className={classNames('like-btn', {
                active: isActiveLike,
              })}
            >
              좋아요
            </button>
          )}
        </Thumbnail>
        <ContentTitle size={size}>{name}</ContentTitle>
        <Meta size={size}>
          <span className="hit">
            <span className="view" />
            <span className="cnt">{numberWithCommas(view_count)}</span>
          </span>
        </Meta>
      </Link>
    </Content>
  );
}

export default CardItem;
