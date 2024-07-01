import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/css';
import classNames from 'classnames';
import {
  ActiveItemStyle,
  ItemStyle,
} from '@/components/Contents/Result/Type/Zodiac/Zodiac.styled';

interface Props {
  tabs: Array<string>;
  selectedTabIndex: number;
  handleClick: (i: number) => void;
  getIconImg: (num: number) => string | null;
}

const Layout = styled.div`
  position: relative;
  margin-top: 10px;
  --swiper-navigation-size: 20px;

  .swiper-slide {
    ${ItemStyle};
    width: auto !important;
    height: 33px;
  }

  .active {
    ${ActiveItemStyle};
  }
`;

function SwiperTabs({
  tabs,
  selectedTabIndex,
  handleClick,
  getIconImg,
}: Props) {
  const [slideTabIndex, setSlideTabIndex] = useState(selectedTabIndex);

  return (
    <Layout>
      <Swiper
        loop
        initialSlide={selectedTabIndex}
        slidesPerView="auto"
        spaceBetween={10}
        centeredSlides
        slideToClickedSlide
        onActiveIndexChange={swiper => {
          handleClick(swiper.activeIndex);
          swiper.slideTo(swiper.activeIndex);
        }}
        onClick={swiper => {
          setSlideTabIndex(swiper.clickedIndex % tabs.length);
          swiper.slideTo(swiper.clickedIndex);
        }}
      >
        {tabs.map((tab, i) => (
          <SwiperSlide
            key={i}
            style={{
              backgroundImage: `url(${getIconImg(i + 1)})`,
              padding: `${!getIconImg(i + 1) ? '0 8px' : '0 8px 0 28px'}`,
            }}
            className={classNames({
              active: i === slideTabIndex,
            })}
          >
            {tab}
          </SwiperSlide>
        ))}
      </Swiper>
    </Layout>
  );
}

export default SwiperTabs;
