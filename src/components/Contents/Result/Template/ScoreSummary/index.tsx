import styled, { css } from 'styled-components';

interface Props {
  name: string;
  summary?: string;
  contents: string;
}

const Layout = styled.div<{ itemCount: number }>`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  padding: 10px 0;
  border: 0;
  border-radius: 450px;
  background-color: rgba(137, 134, 255, 0.12);
  font-size: 14px;
  letter-spacing: -0.18px;
  color: #000000;

  ${props =>
    props.itemCount === 3 &&
    css`
      grid-template-columns: 3fr 2fr 5fr;
    `}
  > div {
    position: relative;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    text-align: center;

    &:last-child {
      border-right: 0;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 16px;
      z-index: 10;
      background: rgba(0, 0, 0, 0.08);
    }

    &:last-child::after {
      display: none;
    }
  }

  > div:nth-child(3) {
    text-align: left;
  }
`;

function ScoreSummary({ name, summary, contents }: Props) {
  const itemCount = summary ? 3 : 2;
  return (
    <Layout itemCount={itemCount}>
      <div dangerouslySetInnerHTML={{ __html: name }} />
      {summary && <div dangerouslySetInnerHTML={{ __html: summary }} />}
      <div dangerouslySetInnerHTML={{ __html: contents }} />
    </Layout>
  );
}

export default ScoreSummary;
