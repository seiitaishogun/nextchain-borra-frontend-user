import React from 'react';
import styled from 'styled-components';
import { MyeongbanDetailT } from '@/api/content';

interface Props {
  data: MyeongbanDetailT;
}

const Layout = styled.div`
  position: relative;
  min-height: 107px;
  border-bottom: 1px solid #71a0b4;
  border-right: 1px solid #71a0b4;

  /**
  TODO 기획 확인 후 추후 수정
   */

  &:nth-of-type(2),
  &:nth-of-type(4),
  &:nth-of-type(5),
  &:nth-of-type(9),
  &:nth-of-type(10),
  &:nth-of-type(12) {
    background: #d9e5b5;
  }
`;

function Item({ data }: Props) {
  return (
    <Layout className="item">
      <p className="gung">{data.gung}</p>
      <p className="jami">{data.jami}</p>
      <p className="cheonbu">{data.cheonbu}</p>
      <p className="cheongan">{data.cheongan}</p>
    </Layout>
  );
}

export default Item;
