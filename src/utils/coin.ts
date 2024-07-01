import { numberWithCommas } from '@/utils/number';

const coinCalculator = (price: string | number | null) => {
  if (!price) return 0;
  const numberPrice = Number(price.toString().replace(/,/g, ''));
  return Math.floor(numberPrice / 100);
};

const coinWithCommas = (coin: number) => numberWithCommas(coinCalculator(coin));

interface CoinProps {
  price: number;
  discount_price: number;
  is_discount: boolean;
}

const getUsedCoin = ({ price, discount_price, is_discount }: CoinProps) => {
  const coin = is_discount ? discount_price : price;
  return coinCalculator(coin);
};

export { coinCalculator, coinWithCommas, getUsedCoin };
