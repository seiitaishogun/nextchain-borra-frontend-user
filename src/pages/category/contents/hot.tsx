import styled from 'styled-components';
import React from 'react';
import Title from '@/components/Common/Title';
import DetailList from '@/components/Common/List/DetailList';
import HistoryLayout from '@/components/Common/Layout/History';
import useInfiniteScrollList from '@/hooks/contents/useInfiniteScrollList';
import { fetchHotContents } from '@/api/content/list';

const Layout = styled.div`
  padding-top: 20px;

  > .title {
    margin: 0 16px;
  }
`;

function Hot() {
  const { listData, handleFetchNext, isLoading } = useInfiniteScrollList({
    queryKey: 'hotContents',
    fetchList: fetchHotContents,
  });

  return (
    <Layout>
      <Title title="지금 가장 핫한" className="title" />
      <DetailList
        data={listData}
        isLoading={isLoading}
        emptyMessage="콘텐츠가 없습니다."
        handleFetchNext={handleFetchNext}
      />
    </Layout>
  );
}

Hot.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="인기 콘텐츠">{page}</HistoryLayout>;
};

export default Hot;
