import styled from 'styled-components';
import {
  Layout,
  PriceLayout,
  PriceLayoutType,
} from '@/components/Common/PriceBox/PriceBox.styled';
import { coinCalculator } from '@/utils/coin';

interface Props {
  color?: string;
  coinText?: string | number;
  price: number;
  discountPrice: number | null;
  isDiscount: boolean;
}

const CoinLayout = styled(PriceLayout)<PriceLayoutType>`
  background-image: url(${props =>
    props.isDiscount
      ? `${props.theme.imageUrl}/common/coin_gray.svg`
      : `${props.theme.imageUrl}/common/coin.svg`});
`;

function CoinBox({ color, coinText, price, discountPrice, isDiscount }: Props) {
  const coin = coinCalculator(isDiscount ? discountPrice : price);

  return (
    <Layout>
      {isDiscount && (
        <CoinLayout isDiscount>{coinCalculator(price)}</CoinLayout>
      )}
      <CoinLayout color={color || '#ffe055'}>{coinText || coin}</CoinLayout>
    </Layout>
  );
}

export default CoinBox;
