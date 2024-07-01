import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  padding-bottom: 26px;

  h4 {
    position: relative;
    padding-top: 40px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
    line-height: 17px;
    letter-spacing: -0.18px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:before {
      content: '“';
      position: absolute;
      top: 12px;
      left: 50%;
      margin-left: -7px;
      font-family: ${props => props.theme.fontFamilies.notoSans};
      font-weight: 500;
      font-size: 28px;
      color: rgba(0, 0, 0, 0.16);
    }
  }

  p {
    margin-top: 2px;
    font-weight: 600;
    font-size: 20px;
    color: #000000;
    line-height: 1.54;
    letter-spacing: -0.26px;
    text-align: center;
    word-break: keep-all;

    u {
      box-shadow: inset 0 -10px 0 rgba(137, 134, 255, 0.5);
      text-decoration: none;
    }
  }
`;

interface Props {
  name: string;
  summary: string;
}

function Summary({ name, summary }: Props) {
  return (
    <Layout>
      <h4 dangerouslySetInnerHTML={{ __html: name }} />
      <p dangerouslySetInnerHTML={{ __html: summary }} />
    </Layout>
  );
}

export default Summary;
