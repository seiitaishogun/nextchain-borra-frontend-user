import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Title from '@/components/Common/Title';
import DetailList from '@/components/Common/List/DetailList';
import HistoryLayout from '@/components/Common/Layout/History';
import useInfiniteScrollList from '@/hooks/contents/useInfiniteScrollList';
import useCategories from '@/hooks/useCategories';
import useAlert from '@/hooks/common/useAlert';
import { CategoryE } from '@/types/category';
import { CATEGORY_LIST_AD } from '@/constants/adsense';
import { fetchCategoryContents } from '@/api/content/list';

const Layout = styled.div`
  > .title {
    margin: 0 16px;
  }
`;

function CategoryDetail() {
  const router = useRouter();
  const id = Number(router.query.id || 0);
  const [check, setCheck] = useState(false);
  const categories = useCategories();
  const { renderMessage, setAlertOptions } = useAlert();
  const { listData, handleFetchNext, isLoading } = useInfiniteScrollList({
    queryKey: 'categoryContents',
    fetchList: fetchCategoryContents,
    enabled: router.isReady && check,
    params: {
      category_id: id,
    },
    advertiseProps: id === CategoryE.Free ? CATEGORY_LIST_AD : undefined,
  });

  useEffect(() => {
    if (!router.isReady || categories?.length === 0) return;

    const checkCategory = categories?.some(category => category.id === id);
    if (!checkCategory) {
      setAlertOptions({
        isOpen: true,
        description: '잘못된 접근입니다.',
        handleConfirm: () => {
          router.replace('/category');
        },
      });
    } else {
      setCheck(true);
    }
  }, [router.isReady, categories]);

  const name = categories?.find(category => category.id === id)?.name || '';
  const title = `${name} 콘텐츠 모아보기`;

  if (router.isReady && !check) return renderMessage();

  return (
    <Layout>
      <Title title={title} className="title" />
      <DetailList
        data={listData}
        isLoading={isLoading}
        emptyMessage="콘텐츠가 없습니다."
        handleFetchNext={handleFetchNext}
      />
    </Layout>
  );
}

CategoryDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="카테고리 콘텐츠">{page}</HistoryLayout>;
};

export default CategoryDetail;

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;
  if (!id) {
    return {
      props: {},
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['categoryContents', id], () =>
    fetchCategoryContents({
      page: 1,
      category_id: Number(id),
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
