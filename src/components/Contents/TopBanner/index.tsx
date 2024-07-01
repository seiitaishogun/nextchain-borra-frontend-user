import styled from 'styled-components';

interface Props {
  bg?: string | null;
}

const Layout = styled.div<{ bg: string }>`
  width: 100%;
  height: 202px;
  background: url(${props => props.bg}) no-repeat center center;
  background-size: cover;
  cursor: pointer;
`;

function TopBanner({ bg }: Props) {
  if (!bg) return <div />;
  return <Layout bg={bg} />;
}

export default TopBanner;
