import React from 'react';
import styled from 'styled-components';
import Title from '@/components/Common/Title';
import DetailList from '@/components/Common/List/DetailList';
import HistoryLayout from '@/components/Common/Layout/History';
import useInfiniteScrollList from '@/hooks/contents/useInfiniteScrollList';
import { fetchFreeContents } from '@/api/content/list';

const Layout = styled.div`
  padding-top: 20px;

  > .title {
    margin: 0 16px;
  }
`;

function Free() {
  const { listData, handleFetchNext, isLoading } = useInfiniteScrollList({
    queryKey: 'categoryContentsFree',
    fetchList: fetchFreeContents,
  });

  return (
    <Layout>
      <Title className="title" title="여기서만 무료" />
      <DetailList
        data={listData}
        isLoading={isLoading}
        emptyMessage="콘텐츠가 없습니다."
        handleFetchNext={handleFetchNext}
      />
    </Layout>
  );
}

Free.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="무료 콘텐츠">{page}</HistoryLayout>;
};

export default Free;
