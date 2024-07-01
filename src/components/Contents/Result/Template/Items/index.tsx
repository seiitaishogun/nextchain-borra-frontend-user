import React from 'react';
import styled from 'styled-components';

interface Props {
  items: Array<any>;
}

const Layout = styled.div<{ itemCount: number }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(${props => props.itemCount}, 1fr);
  width: 100%;
  height: 71px;
  padding: 0 27px;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: rgba(137, 134, 255, 0.12);

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h5 {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: -0.16px;
  }

  p {
    margin-top: 6px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.21px;
    color: #000;
  }
`;

function Items({ items }: Props) {
  return (
    <Layout itemCount={items.length}>
      {items.map(item => (
        <div key={item.id}>
          <h5 dangerouslySetInnerHTML={{ __html: item.name }} />
          <p dangerouslySetInnerHTML={{ __html: item.contents }} />
        </div>
      ))}
    </Layout>
  );
}

export default Items;
