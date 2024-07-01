import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  HEIGHT,
  WIDTH,
} from '@/components/Contents/Detail/Form/Juyeog/Card/constants';
import useAlert from '@/hooks/common/useAlert';

interface Props {
  card: number;
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
}

const Layout = styled.div<{ cardImg: string }>`
  position: relative;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .card {
    width: ${WIDTH - 10}px;
    height: ${HEIGHT - 10}px;
    position: absolute;
    border-radius: 2px;
    backface-visibility: hidden;

    &.front {
      background: ${({ cardImg }) => `url(${cardImg})`} no-repeat center;
      background-size: contain;
    }

    &.back {
      background: url('${process.env
          .APP_IMAGE_URL}/contents/juyeog/back.png')
        no-repeat center center;
      background-size: cover;
    }
  }
`;

function Card({ card, flag, setFlag }: Props) {
  const [flipped, setFlipped] = useState(false);
  const flipStyle = useSpring({
    transform: `perspective(1000px) rotateY(${flipped ? 180 : 0}deg) `,
    config: { mass: 5, tension: 500, friction: 80 },
    onStart: () => {
      setTimeout(() => {
        handleSelectCard();
      }, 500);
    },
  });
  const { renderMessage, setAlertOptions, handleReset } = useAlert();

  const { getValues, setValue, trigger } = useFormContext();

  const validationCard = () => {
    const outer = getValues('outer');
    const inner = getValues('inner');

    return outer !== null && inner !== null;
  };

  const handleSelectCard = async () => {
    if (flag) return;

    setFlag(true);
    const outer = getValues('outer');
    if (outer === null) {
      setValue('outer', card, { shouldDirty: true });
    } else {
      setValue('inner', card, { shouldDirty: true });
    }
    setFlag(false);
    setFlipped(false);
    await trigger();
  };

  const cardImg = `${process.env.APP_IMAGE_URL}/contents/juyeog/single_${card}.png`;

  return (
    <>
      <Layout
        cardImg={cardImg}
        onClick={() => {
          if (validationCard()) {
            setAlertOptions({
              isOpen: true,
              description: '더 이상 카드를 선택할 수 없습니다.',
              handleConfirm: handleReset,
            });
            return;
          }
          setFlipped(true);
        }}
      >
        <animated.div
          className="card front"
          style={{ ...flipStyle, rotateY: '180deg' }}
        />
        <animated.div className="card back" style={flipStyle} />
      </Layout>

      {renderMessage()}
    </>
  );
}

export default Card;
