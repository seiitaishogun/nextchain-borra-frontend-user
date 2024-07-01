import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import Title from '@/components/Common/Title';
import LazyImage from '@/components/Common/LazyImage';
import { Card, Layout } from '@/components/Main/HotContents/HotContents.styled';
import { EmptyList } from '@/components/Common/Card/Card.styled';
import { fetchMainHot } from '@/api/main';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface HotContentsProps {
  id: number;
  is_new: boolean;
  name: string;
  thumbnail: string | null;
}

function HotContents() {
  const { data, isFetching } = useQuery(['mainHot'], fetchMainHot, {
    initialData: {
      data: [],
    },
    select: res => res.data,
    staleTime: 10 * 1000,
  });

  return (
    <Layout>
      <Title
        className="title"
        title="지금 가장 핫한"
        linkConfig={{
          href: '/category/contents/hot',
        }}
        size={24}
      />
      <Swiper
        freeMode
        slidesPerView="auto"
        spaceBetween={20}
        modules={[FreeMode]}
      >
        {isFetching && (
          <EmptyList>
            <p>
              <CircularProgress size={30} />
            </p>
          </EmptyList>
        )}

        {!isFetching &&
          data.length > 0 &&
          data.map((props: HotContentsProps) => {
            const { id, is_new, name, thumbnail } = props;
            return (
              <SwiperSlide className="contents" key={id}>
                <Link href={`/contents/${id}`}>
                  <Card>
                    <LazyImage
                      className="thumbnail"
                      alt={name}
                      src={
                        thumbnail ||
                        '/contents/thumbnail/default_thumbnail_rectangle.png'
                      }
                      lazy
                    />
                    <div className="label">
                      <div className="label-text">{is_new ? 'NEW' : 'HOT'}</div>
                    </div>
                    <div className="info">
                      <div className="title">{name}</div>
                      <div className="sub">보라 ONLY</div>
                    </div>
                  </Card>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Layout>
  );
}

export default HotContents;
