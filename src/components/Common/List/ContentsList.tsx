import styled, { css } from 'styled-components';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { EmptyList } from '@/components/Common/Card/Card.styled';
import Loading from '@/components/Common/Popup/Loading';

interface Props {
  data: Array<any>;
  isLoading: boolean;
  emptyMessage?: string;
  handleFetchNext: () => void;
}

const Layout = styled.ul`
  margin-top: 16px;
  padding: 0 16px;
`;

const Card = styled.li`
  display: flex;
  position: relative;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }
`;

const Thumbnail = styled.div<{ image: string | null }>`
  margin-right: 20px;
  width: 84px;
  height: 84px;
  background: url('${({ image, theme }) =>
      image ||
      `${theme.imageUrl}/contents/thumbnail/default_thumbnail_square.png`}')
    no-repeat center;
  background-size: cover;
`;

const Info = styled.div`
  padding-top: 8px;
  width: calc(100% - 104px);
  font-size: 14px;
`;

const InfoTitle = styled.h4`
  width: 100%;
  padding-right: 20px;
  box-sizing: border-box;
  font-weight: 600;
  letter-spacing: -0.18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoDescription = styled.p`
  margin-top: 8px;
  max-height: 38px;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  line-height: 19px;
  overflow: hidden;
  white-space: pre-wrap;
`;

const LikeButton = styled.button<{ isActive: boolean }>`
  position: absolute;
  top: 24px;
  right: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: url('${process.env
      .APP_IMAGE_URL}/common/like_border_7f7f7f.svg')
    no-repeat center center transparent;
  background-size: 16px 16px;
  cursor: pointer;

  ${props =>
    props.isActive &&
    css`
      background-image: url('${process.env
        .APP_IMAGE_URL}/common/like_fill_fe021f.svg');
    `}
`;

function ContentsList({
  data,
  isLoading,
  emptyMessage,
  handleFetchNext,
}: Props) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      handleFetchNext();
    }
  }, [inView]);

  if (data.length === 0 && !isLoading) {
    return (
      <EmptyList>
        <p>{emptyMessage || '데이터가 없습니다.'}</p>
      </EmptyList>
    );
  }

  return (
    <Layout>
      {data.map(({ id, content_id, name, summary, thumbnail, isLike }: any) => (
        <Link key={id} href={`/contents/${content_id || id}`} legacyBehavior>
          <Card>
            <Thumbnail image={thumbnail} />
            <LikeButton type="button" isActive={isLike} />

            <Info>
              <InfoTitle>{name}</InfoTitle>
              <InfoDescription>{summary}</InfoDescription>
            </Info>
          </Card>
        </Link>
      ))}

      <div ref={ref} />
      <Loading isOpen={isLoading} />
    </Layout>
  );
}

export default ContentsList;
