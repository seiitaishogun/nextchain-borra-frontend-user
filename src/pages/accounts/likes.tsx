import styled from 'styled-components';
import React from 'react';
import Title from '@/components/Common/Title';
import AuthCheck from '@/components/Auth/AuthCheck';
import DetailList from '@/components/Common/List/DetailList';
import HistoryLayout from '@/components/Common/Layout/History';
import useInfiniteScrollList from '@/hooks/contents/useInfiniteScrollList';
import { CATEGORY_LIST_AD } from '@/constants/adsense';
import { fetchAccountLikes } from '@/api/account/list';

const Layout = styled.div`
  padding-top: 10px;

  .title {
    margin: 0 16px;
  }
`;

function Likes() {
  const { listData, handleFetchNext, isLoading } = useInfiniteScrollList({
    queryKey: 'accountsLikes',
    fetchList: fetchAccountLikes,
    advertiseProps: CATEGORY_LIST_AD,
  });

  return (
    <AuthCheck>
      <Layout>
        <Title className="title" title="좋아요" />
        <DetailList
          data={listData}
          isLoading={isLoading}
          emptyMessage="좋아요를 누른 콘텐츠가 없습니다."
          handleFetchNext={handleFetchNext}
        />
      </Layout>
    </AuthCheck>
  );
}

Likes.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="마이페이지">{page}</HistoryLayout>;
};

export default Likes;
