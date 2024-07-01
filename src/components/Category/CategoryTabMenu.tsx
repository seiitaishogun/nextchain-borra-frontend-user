import Link from 'next/link';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import { useRouter } from 'next/router';
import useTags from '@/hooks/useTags';

interface Props {
  isAll?: boolean;
}

const Layout = styled.div`
  display: flex;
  height: 53px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;

  .swiper {
    padding: 0 16px 0 16px;
  }

  .swiper-slide {
    padding: 0 16px;
    width: fit-content;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
    }
  }

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    font-size: 18px;
    letter-spacing: -0.23px;

    a {
      color: rgba(0, 0, 0, 0.6);
    }

    &.active {
      border-bottom: 2px solid #8986ff;

      a {
        color: #000;
      }
    }
  }
`;

function CategoryTabMenu({ isAll }: Props) {
  const router = useRouter();
  const { id } = router.query || '1';
  const tags = useTags();

  return (
    <Layout>
      <Swiper freeMode slidesPerView="auto" modules={[FreeMode]}>
        {tags.map(({ label, value }) => (
          <SwiperSlide key={value}>
            <span className={`item ${value === id && 'active'}`}>
              {/* item active */}
              <Link
                href={
                  isAll
                    ? `/category/tags/${value}/all`
                    : `/category/tags/${value}`
                }
                legacyBehavior
              >
                {label}
              </Link>
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </Layout>
  );
}

export default CategoryTabMenu;
