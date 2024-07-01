import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import { EmptyList } from '@/components/Common/Card/Card.styled';
import { fetchMainBanner } from '@/api/main';

const Layout = styled.section`
  height: 202px;

  .swiper .swiper-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 16px;
    left: 301px;
    box-sizing: border-box;
    width: 43px;
    height: 26px;
    padding-top: 2px;
    border-radius: 100px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1.4px;
  }
`;

const BannerItem = styled.div`
  height: 202px;
  cursor: pointer;
  background-size: 100%;
  background-image: url('${process.env
    .APP_IMAGE_URL}/contents/thumbnail/default_thumbnail_rectangle.png');
`;

const BannerEmptyList = styled(EmptyList)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 202px;
`;

interface TopBannerProps {
  id: number;
  name: string;
  link: string;
  thumbnail: string | null;
}

function TopBanner() {
  const router = useRouter();
  const { data, isFetching } = useQuery(['mainBanner'], fetchMainBanner, {
    initialData: {
      data: [],
    },
    select: res => res.data,
  });

  if (isFetching) {
    return (
      <BannerEmptyList>
        <CircularProgress size={30} />
      </BannerEmptyList>
    );
  }

  return (
    <Layout>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
        }}
        loop
      >
        {!isFetching &&
          (data.length > 0 ? data : BANNER_ITEMS).map(
            (props: TopBannerProps) => {
              const { id, name, link, thumbnail } = props;
              return (
                <SwiperSlide key={id}>
                  <BannerItem onClick={() => router.push(link)}>
                    <Image
                      src={
                        thumbnail ||
                        '/contents/thumbnail/default_thumbnail_rectangle.png'
                      }
                      fill
                      alt={name}
                    />
                  </BannerItem>
                </SwiperSlide>
              );
            }
          )}
      </Swiper>
    </Layout>
  );
}

export default TopBanner;

const BANNER_ITEMS = [
  {
    id: 1,
    name: '4월의 소개팅 운세 알아보기',
    thumbnail: '/main/banner/top_2.webp',
    link: '/contents/88',
  },
  {
    id: 2,
    name: '4월의 재물운 알아보기',
    thumbnail: '/main/banner/top_3.webp',
    link: '/contents/87',
  },
  {
    id: 3,
    name: '계모년 신년운세 모아보기',
    thumbnail: '/main/banner/top_1.webp',
    link: '/category/6',
  },
];
