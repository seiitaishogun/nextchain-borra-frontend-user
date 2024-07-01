import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { CircularProgress } from '@mui/material';
import {
  EmptyList,
  Layout,
  SwipeLayout,
} from '@/components/Common/Card/Card.styled';
import CardItem from '@/components/Common/Card/CardItem';
import { CardProps, DataProps } from '@/components/Common/Card/Card.types';
import 'swiper/css';

function Card({
  isLoading,
  data = [],
  size = 'small',
  isSwipe = false,
  emptyMessage,
  isPurchaseLink,
  useLike,
}: CardProps) {
  const getLink = ({ id, purchaseId }: { id: number; purchaseId?: number }) => {
    if (isPurchaseLink) {
      return `/contents/${id}/result/${purchaseId}`;
    }
    return `/contents/${id}`;
  };

  if (isLoading) {
    return (
      <EmptyList>
        <p>
          <CircularProgress size={30} />
        </p>
      </EmptyList>
    );
  }

  if (!isLoading && data.length === 0) {
    return (
      <EmptyList>
        <p>{emptyMessage || '데이터가 없습니다.'}</p>
      </EmptyList>
    );
  }

  if (isSwipe) {
    return (
      <SwipeLayout size={size}>
        <Swiper
          freeMode
          slidesPerView="auto"
          spaceBetween={10}
          modules={[FreeMode]}
        >
          {data.length > 0 &&
            data.map((d: DataProps) => (
              <SwiperSlide key={d.id} className="contents">
                <CardItem
                  data={d}
                  size={size}
                  isLike={useLike}
                  getLink={getLink}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </SwipeLayout>
    );
  }

  return (
    <Layout>
      {data.length > 0 &&
        data.map((d: DataProps) => (
          <CardItem
            key={d.id}
            data={d}
            size={size}
            isLike={useLike}
            getLink={getLink}
          />
        ))}
    </Layout>
  );
}

Card.defaultProps = {
  useLike: true,
};

export default Card;
export type { CardProps };
