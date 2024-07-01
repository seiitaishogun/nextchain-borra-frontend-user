import React from 'react';
import styled from 'styled-components';

interface Props {
  items: Array<any>;
}

const Layout = styled.div<{ itemCount: number }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(${props => props.itemCount}, 1fr);
  grid-template-rows: repeat(2, 41px);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  font-size: 14px;
  letter-spacing: -0.18px;
  color: #000000;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div:nth-child(odd) {
    background: rgba(137, 134, 255, 0.12);
  }
`;

function ScoreItems({ items }: Props) {
  return (
    <Layout itemCount={items.length}>
      {items.map(item => (
        <>
          <div dangerouslySetInnerHTML={{ __html: item.name }} />
          <div dangerouslySetInnerHTML={{ __html: item.summary }} />
        </>
      ))}
    </Layout>
  );
}

export default ScoreItems;
