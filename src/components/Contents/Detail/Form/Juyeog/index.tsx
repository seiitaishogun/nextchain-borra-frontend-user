import React, { useCallback, useEffect, useState } from 'react';
import { animated, useSprings } from '@react-spring/web';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import styled from 'styled-components';
import {
  HEIGHT,
  WIDTH,
} from '@/components/Contents/Detail/Form/Juyeog/Card/constants';
import Card from '@/components/Contents/Detail/Form/Juyeog/Card';
import {
  Board,
  SelectedCard,
} from '@/components/Contents/Detail/Form/Juyeog/JuyeogForm.styled';
import { MessageBox } from '@/components/Contents/Detail/Form/Form.styled';
import NormalDescription from '@/components/Contents/Result/Template/Description/Normal';
import TarotForm from '@/components/Contents/Detail/Form/Tarot/Form';
import useResetForm from '@/hooks/contents/useResetForm';

const Layout = styled.article`
  ${MessageBox} {
    margin-bottom: 16px;
  }
`;
const SelectedCardLayout = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

function JuyeogForm() {
  const [flag, setFlag] = useState(false);
  const [cards, setCards] = useState<Array<number>>([]);
  const [spreadStyles, spreadApi] = useSprings(8, idx => ({
    from: {
      x: 0,
      y: 0,
    },
    to: to(idx),
    delay: idx * 120,
    reset: true,
  }));
  const { control, watch } = useFormContext();
  const { handleOpenUserConfirm, renderResetConfirm } = useResetForm();
  const outer = watch('outer');

  const shuffleCards = useCallback(() => {
    const newCards: Array<number> = Array.from({ length: 8 }, (v, i) => i);
    return newCards.sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    const newCards = shuffleCards();
    setCards(newCards);

    spreadApi.start({
      from: {
        x: 0,
        y: 0,
      },
    });
    spreadApi.start(idx => ({
      to: to(idx),
      delay: idx * 120,
    }));
  }, [outer]);

  const getCardImg = (card: number | null) => {
    const cardType = typeof card === 'number' ? `single_${card}` : 'back';
    return `${process.env.APP_IMAGE_URL}/contents/juyeog/${cardType}.png`;
  };

  return (
    <Layout>
      <TarotForm
        isUser
        control={control}
        title="나의 사주 입력하기"
        linkConfig={{
          text: '다른 사주 입력하기',
          onClick: handleOpenUserConfirm,
        }}
      />

      <SelectedCardLayout>
        <SelectedCard cardImg={getCardImg(watch('outer'))}>
          <div className="type">외괘</div>
          <div className="card" />
        </SelectedCard>
        <SelectedCard cardImg={getCardImg(watch('inner'))}>
          <div className="type">내괘</div>
          <div className="card" />
        </SelectedCard>
      </SelectedCardLayout>

      <Board>
        <MessageBox>
          <span>
            당신의 운세가 어떨지 정성스러운 마음으로 점괘를 선택해주세요.
          </span>
        </MessageBox>

        <div className="card-types">
          <div className={classNames('type', { active: !outer })}>외괘</div>
          <div className={classNames('type', { active: outer })}>내괘</div>
        </div>
        <div className="board">
          {cards.map((card, i) => (
            <animated.div className="juyeog" style={spreadStyles[i]} key={card}>
              <Card card={card} flag={flag} setFlag={setFlag} />
            </animated.div>
          ))}
        </div>
      </Board>

      <NormalDescription
        name="주역이란"
        contents="팔괘를 외괘, 내괘의 조합으로 만들어 64괘의 상징과 그에 맞는 점괘를 풀이해드리는 것입니다. 천지만물은 모두 양과 음으로 이루어져 있다는 원칙에 기반해 인간의 삶에 적용하여 풀이합니다. 태극이 음, 양으로, 음, 양은 8괘(건, 태, 이, 진, 손, 감, 간, 곤)로, 이들의 조합으로 64괘가 되어 괘사를 붙이게 됩니다."
      />

      {renderResetConfirm()}
    </Layout>
  );
}

export default JuyeogForm;

function to(i: number) {
  return {
    x: -(Math.floor((8 - (i + 1)) % 4) * WIDTH),
    y: -(Math.floor((8 - (i + 1)) / 4) * HEIGHT),
  };
}
