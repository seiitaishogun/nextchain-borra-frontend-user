import styled from 'styled-components';
import React from 'react';
import Title from '@/components/Common/Title';
import DetailList from '@/components/Common/List/DetailList';
import AuthCheck from '@/components/Auth/AuthCheck';
import HistoryLayout from '@/components/Common/Layout/History';
import useInfiniteScrollList from '@/hooks/contents/useInfiniteScrollList';
import { fetchAccountReplays } from '@/api/account/list';

const Layout = styled.div`
  padding-top: 10px;

  .title {
    margin: 0 16px;
  }
`;

function Replays() {
  const { listData, handleFetchNext, isLoading } = useInfiniteScrollList({
    queryKey: 'accountsReplays',
    fetchList: fetchAccountReplays,
  });

  return (
    <AuthCheck>
      <Layout>
        <Title className="title" title="콘텐츠 다시보기" />
        <DetailList
          data={listData}
          isLoading={isLoading}
          isPurchaseLink
          emptyMessage="최근 조회 콘텐츠가 없습니다."
          handleFetchNext={handleFetchNext}
        />
      </Layout>
    </AuthCheck>
  );
}

Replays.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="마이페이지">{page}</HistoryLayout>;
};

export default Replays;
