import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Layout = styled.section`
  margin-top: 38px;

  .swiper-slide {
    height: 96.5px;
  }

  .swiper-pagination {
    bottom: 0px;

    .swiper-pagination-bullet {
      width: 5px;
      height: 5px;
      background-color: #9e9e9e;
      margin: 0 2px;
    }

    .swiper-pagination-bullet-active {
      width: 6px;
      height: 6px;
      background-color: #000;
    }
  }

  .contents-banner {
    height: 72px;
    background: gray;
  }
`;

function BottomBanner() {
  return (
    <Layout>
      <Swiper
        pagination
        modules={[Autoplay, Navigation, Pagination]}
        loop
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className="contents-banner" style={{ background: 'red' }} />
        </SwiperSlide>
        <SwiperSlide>
          <div className="contents-banner" style={{ background: 'blue' }} />
        </SwiperSlide>
        <SwiperSlide>
          <div className="contents-banner" style={{ background: 'green' }} />
        </SwiperSlide>
        <SwiperSlide>
          <div className="contents-banner" style={{ background: 'black' }} />
        </SwiperSlide>
      </Swiper>
    </Layout>
  );
}

export default BottomBanner;
