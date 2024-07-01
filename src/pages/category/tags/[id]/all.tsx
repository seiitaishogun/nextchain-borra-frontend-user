import styled from 'styled-components';
import { useRouter } from 'next/router';
import React from 'react';
import CategoryTabMenu from '@/components/Category/CategoryTabMenu';
import DetailList from '@/components/Common/List/DetailList';
import HistoryLayout from '@/components/Common/Layout/History';
import Banner from '@/components/Common/Banner';
import useInfiniteScrollList from '@/hooks/contents/useInfiniteScrollList';
import { fetchTagContents } from '@/api/content/list';

const Layout = styled.div`
  .nav-bar {
    height: 60px;
    display: flex;
  }
`;

function All() {
  const router = useRouter();
  const tagId = router.query.id ? Number(router.query.id) : 1;
  const { listData, handleFetchNext, isLoading } = useInfiniteScrollList({
    queryKey: 'TagDetailAll',
    fetchList: fetchTagContents,
    params: {
      tag_id: tagId,
    },
  });

  const imagePos = AD_BANNER_IMAGE_POS[tagId - 1];
  const image = `${process.env.APP_IMAGE_URL}/tags/ad_banner_${imagePos}.jpg`;
  const link = `/contents/${AD_BANNER_LINKS[imagePos - 1]}`;

  return (
    <Layout>
      <CategoryTabMenu isAll />

      <section className="ad">
        <Banner width="360px" height="202px" image={image} link={link} />
      </section>

      <section className="contents">
        <DetailList
          data={listData}
          isLoading={isLoading}
          emptyMessage="콘텐츠가 없습니다."
          handleFetchNext={handleFetchNext}
        />
      </section>
    </Layout>
  );
}

All.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="인기 콘텐츠">{page}</HistoryLayout>;
};

export default All;

const AD_BANNER_IMAGE_POS = [1, 2, 3, 1, 3, 2, 3, 1, 2, 3, 1];
const AD_BANNER_LINKS = [11, 17, 9];
