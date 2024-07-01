import styled from 'styled-components';
import {
  Clock,
  Layout,
  PriceLayoutType,
} from '@/components/Common/PriceBox/PriceBox.styled';

interface Props {
  color?: string;
  waitFreeTime: number;
}

const DiscountClock = styled(Clock)<PriceLayoutType>`
  margin-right: 2px;
  padding: 0 2px 0 22px;
  background-position: left 2px center;
  background-image: url('${process.env
    .APP_IMAGE_URL}/common/clock_000.svg');
`;

function ClockBox({ color, waitFreeTime }: Props) {
  return (
    <Layout>
      <DiscountClock isDiscount>{waitFreeTime}시간</DiscountClock>
      <Clock color={color || '#ffe055'}>0시간</Clock>
    </Layout>
  );
}

export default ClockBox;
