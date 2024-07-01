import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import Card from '@/components/Contents/Detail/Form/Tarot/Card';
import {
  CardSection,
  ContentLayout,
  FormBox,
  MessageBox,
} from '@/components/Contents/Detail/Form/Form.styled';
import TarotForm from '@/components/Contents/Detail/Form/Tarot/Form';
import useResetForm from '@/hooks/contents/useResetForm';

import 'swiper/css';
import 'swiper/css/effect-cards';
import { ContentTarotT } from '@/types/content/detail';

interface Props {
  tarot: ContentTarotT[];
  maxCardCount: number;
  isPartner: boolean;
}

const Layout = styled.article`
  ${MessageBox} {
    margin-top: 5px;
  }
`;

function TaroForm({ tarot, maxCardCount, isPartner }: Props) {
  const swiperRef = useRef<any>(null);
  const [tarotCards, setTarotCards] = useState<Array<number>>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const { control, watch } = useFormContext();
  const {
    handleOpenUserConfirm,
    handleOpenPartnerConfirm,
    renderResetConfirm,
  } = useResetForm();
  const selectedCard = watch('tarot') || [];
  const cardCount = selectedCard?.length || 0;

  const shuffleCards = useCallback(() => {
    const formatSelectedCard = selectedCard.map((card: string) =>
      Number(card.slice(0, -1))
    );

    const selectedTarot = tarot[cardCount];
    const { is_straight } = selectedTarot;

    const cards = Array.from(
      { length: is_straight ? 11 : 22 },
      (v, i) => i + 1
    );
    return cards
      .filter(c => !formatSelectedCard.includes(c))
      .sort(() => Math.random() - 0.5);
  }, [selectedCard]);

  useEffect(() => {
    setTarotCards(shuffleCards());
  }, []);

  useLayoutEffect(() => {
    if (tarotCards.length > 0) {
      const slidePosition = tarot[cardCount]?.is_straight ? 5 : 10;
      swiperRef.current.update();
      swiperRef.current.slideTo(slidePosition); // 카드 중앙 위치
      setFlag(false);

      if (cardCount === maxCardCount) {
        swiperRef.current.enabled = false;
      }
    }
  }, [tarotCards]);

  const handleUpdateCards = () => {
    if (cardCount === maxCardCount) {
      return;
    }
    setTarotCards(shuffleCards());
  };

  return (
    <Layout>
      <FormBox>
        <TarotForm
          isUser
          control={control}
          title="나의 사주 입력하기"
          linkConfig={{
            text: '다른 사주 입력하기',
            onClick: handleOpenUserConfirm,
          }}
        />

        {isPartner && (
          <TarotForm
            isUser={false}
            control={control}
            title="상대방 사주 입력하기"
            linkConfig={{
              text: '다른 사주 입력하기',
              onClick: handleOpenPartnerConfirm,
            }}
          />
        )}
      </FormBox>

      {/* 타로 고정 텍스트 영역 */}
      <ContentLayout>
        <span>편안한 마음으로 집중하여 카드를 선택해주세요.</span>
      </ContentLayout>

      <CardSection className={cardCount === maxCardCount ? 'end' : ''}>
        <MessageBox>
          {cardCount === maxCardCount ? (
            <span>
              카드를 모두 선택 하셨습니다.
              <br /> 결과를 확인해 주세요.
            </span>
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html:
                  tarot[cardCount].name !== 'null'
                    ? tarot[cardCount].name
                    : '타로 카드를 선택해 주세요.',
              }}
            />
          )}
        </MessageBox>
        <Swiper
          onInit={swiper => {
            swiperRef.current = swiper;
          }}
          effect="cards"
          grabCursor
          modules={[EffectCards]}
          className="mySwiper"
          cardsEffect={{
            perSlideOffset: 60,
            perSlideRotate: 5,
            slideShadows: false,
          }}
          centeredSlides
          slideToClickedSlide
        >
          {tarotCards.map(card => (
            <SwiperSlide key={card}>
              <Card
                card={card}
                maxCardCount={maxCardCount}
                selectedTarot={tarot[cardCount]}
                flag={flag}
                setFlag={setFlag}
                handleUpdateCards={handleUpdateCards}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </CardSection>

      {renderResetConfirm()}
    </Layout>
  );
}

export default TaroForm;
