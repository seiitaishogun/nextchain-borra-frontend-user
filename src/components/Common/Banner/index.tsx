import styled from 'styled-components';
import { useRouter } from 'next/router';

interface Props {
  width: string;
  height: string;
  image: string; // TODO: 광고 등록시 제거
  link: string; // TODO: 광고 등록시 제거
}

const Layout = styled.div<{ width: string; height: string; image: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  height: ${props => props.height};
  background: url(${props => props.image}) no-repeat center center;
  background-size: cover;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.18;
  letter-spacing: normal;
  color: #000;
`;

function Banner({ width, height, image, link }: Props) {
  const router = useRouter();
  return (
    <Layout
      width={width}
      height={height}
      image={image}
      onClick={() => router.push(link)}
    />
  );
}

export default Banner;
