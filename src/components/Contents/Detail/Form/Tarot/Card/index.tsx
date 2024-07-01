import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { Dispatch, SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import {
  HEIGHT,
  WIDTH,
} from '@/components/Contents/Detail/Form/Tarot/Card/constants';
import useAlert from '@/hooks/common/useAlert';
import { ContentTarotT } from '@/types/content/detail';

interface Props {
  card: number;
  maxCardCount: number;
  selectedTarot: ContentTarotT;
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
  handleUpdateCards: () => void;
}

const Layout = styled.div<{ cardImg: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  transform-style: preserve-3d;

  &.isReverse .card {
    transform: rotateZ(180deg);
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: all 0.5s;
    transition-timing-function: linear;
    transform-style: preserve-3d;
    // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .card {
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    backface-visibility: hidden;

    &.front {
      background-image: ${({ cardImg }) => `url(${cardImg})`};
      background-size: cover;
    }

    &.back {
      transform: rotateY(180deg);
      background-image: url('${process.env
        .APP_IMAGE_URL}/contents/tarot/back.png');
    }
  }
`;

function Card({
  card,
  maxCardCount,
  selectedTarot,
  flag,
  setFlag,
  handleUpdateCards,
}: Props) {
  const [picked, setPicked] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const pickStyle = useSpring({
    top: picked ? -80 : 0,
    transform: picked ? 'rotateY(0deg)' : 'rotateY(180deg)',
    onRest: () => {
      setTimeout(() => {
        handleUpdateCards();
      }, 1000);
    },
  });
  const { watch, setValue, trigger } = useFormContext();
  const { handleReset, renderMessage, setAlertOptions } = useAlert();

  const getRandomDirection = () => {
    const directions = ['s', 'r'];
    const isStraight = selectedTarot.is_straight;

    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[isStraight ? 0 : randomIndex];
  };

  const handleSelectCard = async () => {
    if (flag) return;
    setFlag(true);

    if (maxCardCount === cardCount) {
      setAlertOptions({
        isOpen: true,
        description: '더 이상 카드를 선택할 수 없습니다.',
        handleConfirm: handleReset,
      });
      return;
    }

    if (picked || selectedCards.includes(card)) {
      setAlertOptions({
        isOpen: true,
        description: '이미 선택한 카드입니다.',
        handleConfirm: handleReset,
      });
      return;
    }

    const direction = getRandomDirection();
    const newCard = `${card}${direction}`;

    setValue('tarot', [...selectedCards, newCard], {
      shouldDirty: true,
    });
    await trigger();
    setIsReverse(direction === 'r');
    setPicked(true);
  };

  const selectedCards = watch('tarot');
  const cardCount = selectedCards?.length || 0;
  const cardImg = `${process.env.APP_IMAGE_URL}/contents/tarot/${card}.jpg`;

  return (
    <>
      <Layout
        className={classNames({ isReverse })}
        cardImg={cardImg}
        onClick={handleSelectCard}
      >
        <animated.div className="card-inner" style={pickStyle}>
          <animated.div className="card front" />
          <animated.div className="card back" />
        </animated.div>
      </Layout>
      {renderMessage()}
    </>
  );
}

export default Card;
