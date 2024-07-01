import styled from 'styled-components';
import useIsImgLoaded from '@/hooks/lazyImage/useIsImgLoaded';

interface ImgProps {
  src: string;
  alt: string;
  lazy: boolean;
  className?: string;
}

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
`;

function LazyImage(props: ImgProps) {
  const { src, alt, lazy, className } = props;
  const { elementRef, isLoaded } = useIsImgLoaded(lazy);

  return (
    <StyledImg
      className={className}
      ref={elementRef}
      alt={alt}
      src={
        isLoaded
          ? src
          : `${process.env.APP_IMAGE_URL}/contents/thumbnail/default_thumbnail_rectangle.png`
      }
    />
  );
}

export default LazyImage;
