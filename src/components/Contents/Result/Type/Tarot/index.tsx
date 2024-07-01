import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import {
  ContentLayout,
  PaddingBox,
} from '@/components/Contents/Result/Result.styled';
import ContentsPage from '@/components/Contents/Result/Section/ContentsPage';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Tab = styled.div<{ tabCount: number }>`
  display: grid;
  grid-template-columns: repeat(${({ tabCount }) => tabCount}, 1fr);
  width: 100%;
  height: 58px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    padding: 0 8px;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    background: #ffffff;
    color: rgba(0, 0, 0, 0.32);
    font-size: 15px;
    letter-spacing: -0.2px;
    overflow: hidden;

    &.active {
      border-bottom: 2px solid #8986ff;
      font-weight: 600;
      color: #000;
    }

    > div {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const TarotCardSection = styled(PaddingBox)`
  margin-top: 16px;

  .swiper-button-prev,
  .swiper-button-next {
    color: #8986ff;
  }

  .swiper:hover {
    .swiper-button-prev,
    .swiper-button-next {
      display: block;
    }
  }

  .swiper-pagination-div {
    margin-top: 10px;
    text-align: center;

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
`;

const TarotCard = styled.div<{ cardImg: string }>`
  width: 100%;
  min-height: 645px;
  height: auto;
  display: flex;
  box-sizing: border-box;
  padding: 16px 0;
  border-radius: 8px;
  background: url(${({ cardImg }) => cardImg}) no-repeat center center;
  background-size: cover;
`;

const BottomNavigation = styled.div`
  display: flex;
  gap: 12px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 52px;
    margin-top: 12px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    background: #ffffff;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.21px;
  }
`;

function TarotResult({ data, purchase }: any) {
  const swiperRef = useRef<any>(null);
  const [tab, setTab] = useState(0);
  const menus = data.map((p: any) => p.children[0]);
  const selectedCards = purchase.value.trim().split(',');

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideTo(tab);
  }, [tab]);

  const handleTabPrev = () => {
    if (tab === 0) return;
    setTab(tab - 1);
    window.scrollTo(0, 0);
  };

  const handleTabNext = () => {
    if (tab === menus.length - 1) return;
    setTab(tab + 1);
    window.scrollTo(0, 0);
  };

  const isSingle = menus.length === 1;

  return (
    <>
      <Tab tabCount={data.length}>
        {menus.map((menu: any, i: number) => (
          <button
            key={i}
            type="button"
            className={classNames('item', { active: i === tab })}
            onClick={() => setTab(i)}
          >
            <div>Card {i + 1}</div>
          </button>
        ))}
      </Tab>

      <TarotCardSection>
        <Swiper
          onInit={swiper => {
            swiperRef.current = swiper;
          }}
          spaceBetween={10}
          grabCursor
          longSwipes
          navigation={!isSingle}
          pagination={{
            el: '.swiper-pagination-div',
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          onSlideChange={swiper => setTab(swiper.activeIndex)}
          onSwiper={swiper => swiper.slideTo(tab)}
        >
          {selectedCards.map((card: string) => (
            <SwiperSlide key={card}>
              <ContentLayout>
                <TarotCard
                  cardImg={`${process.env.APP_IMAGE_URL}/contents/tarot/result/${card}.jpg`}
                />
              </ContentLayout>
            </SwiperSlide>
          ))}
        </Swiper>
        {!isSingle && <div className="swiper-pagination-div" />}

        <ContentsPage
          data={data}
          selectedTabIndex={tab}
          useParentName={false}
        />

        {!isSingle && (
          <BottomNavigation>
            <button type="button" onClick={handleTabPrev}>
              이전 카드
            </button>
            <button type="button" onClick={handleTabNext}>
              다음 카드
            </button>
          </BottomNavigation>
        )}
      </TarotCardSection>
    </>
  );
}

export default TarotResult;
