import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { numberWithCommas } from '@/utils/number';
import { checkPlatform } from '@/utils/agent';

interface Props {
  product: {
    id: number;
    name: string;
    content: string;
    price: number;
    price_ios: number;
    price_aos: number;
    code: string;
  };
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;

  span {
    font-size: 14px;
  }

  .arrow-icon {
    display: inline-block;
    margin: 0 2px;
    width: 14px;
    height: 14px;
    background: url('${process.env
        .APP_IMAGE_URL}/common/arrow_right_8985FF.png')
      no-repeat center;
    background-size: cover;
  }

  .after {
    color: #8985ff;
  }
`;

function LabelText({ product }: Props) {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const agent = checkPlatform();
    if (agent === 'ios') {
      setPrice(product.price_ios);
    } else if (agent === 'aos') {
      setPrice(product.price_aos);
    } else {
      setPrice(product.price);
    }
  }, [product]);

  return (
    <Layout>
      <span>{numberWithCommas(price)}원</span>
      <span className="arrow-icon" />
      <span className="after">{product.content}</span>
    </Layout>
  );
}

export default LabelText;
