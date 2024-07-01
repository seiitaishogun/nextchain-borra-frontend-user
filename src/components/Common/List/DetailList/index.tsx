import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Layout,
  Card,
  Info,
  InfoStatusBox,
  InfoStatusLikeIcon,
  InfoStatusViewIcon,
  InfoSummary,
  InfoTitle,
} from '@/components/Common/List/DetailList/DetailList.styled';
import CoinBox from '@/components/Common/PriceBox/CoinBox';
import { EmptyList } from '@/components/Common/Card/Card.styled';
import Loading from '@/components/Common/Popup/Loading';
import Advertise, { AdvertiseProps } from '@/components/Common/Advertise';
import Thumbnail from '@/components/Common/List/Common/Thumbnail';
import { numberWithCommas } from '@/utils/number';

interface Props {
  data: Array<any | AdvertiseProps>;
  isLoading: boolean;
  emptyMessage?: string | React.ReactNode;
  handleFetchNext: () => void;
  isPurchaseLink?: boolean;
  handleClick?: (data: any) => void;
}

function DetailList({
  data,
  isLoading,
  emptyMessage,
  handleFetchNext,
  isPurchaseLink,
  handleClick,
}: Props) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      handleFetchNext();
    }
  }, [inView]);
  const handleClickCard = ({
    id,
    purchaseId,
  }: {
    id: number;
    purchaseId?: number;
  }) => {
    if (isPurchaseLink) {
      return `/contents/${id}/result/${purchaseId}`;
    }
    return `/contents/${id}`;
  };

  if (data.length === 0 && !isLoading) {
    return (
      <EmptyList>
        <p>{emptyMessage || '데이터가 없습니다.'}</p>
      </EmptyList>
    );
  }

  return (
    <Layout>
      {data.map(
        (
          {
            id,
            content_id,
            thumbnail,
            summary,
            is_discount,
            is_new,
            is_hot,
            discount_price,
            price,
            name,
            like_count,
            view_count,
            ...advertiseProps
          },
          i
        ) =>
          advertiseProps.slot ? (
            <Card key={`${advertiseProps.slot}/${i}`}>
              <Advertise {...advertiseProps} />
            </Card>
          ) : (
            <Card key={id}>
              <Link
                className="card-link"
                href={handleClickCard({ id: content_id || id, purchaseId: id })}
                onClick={() => {
                  if (handleClick) {
                    handleClick({
                      content_id: content_id || id,
                      content_name: name,
                    });
                  }
                }}
              >
                <Thumbnail image={thumbnail} is_new={is_new} is_hot={is_hot} />

                <Info>
                  <div>
                    <InfoTitle>{name}</InfoTitle>
                    {summary && <InfoSummary>{summary}</InfoSummary>}

                    <InfoStatusBox>
                      <InfoStatusLikeIcon>
                        {numberWithCommas(like_count || 0)}
                      </InfoStatusLikeIcon>
                      <InfoStatusViewIcon>
                        {numberWithCommas(view_count || 0)}
                      </InfoStatusViewIcon>
                    </InfoStatusBox>
                  </div>

                  <CoinBox
                    color="#FBB701"
                    isDiscount={is_discount}
                    price={price}
                    discountPrice={discount_price}
                  />
                </Info>
              </Link>
            </Card>
          )
      )}

      <div ref={ref} />
      <Loading isOpen={isLoading} />
    </Layout>
  );
}

export default DetailList;
