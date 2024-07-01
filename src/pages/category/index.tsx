import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import HistoryLayout from '@/components/Common/Layout/History';
import MenuList from '@/components/Category/MenuList';
import Advertise from '@/components/Common/Advertise';
import { fetchCategories } from '@/api/common';
import useCategories from '@/hooks/useCategories';
import { CATEGORY_AD } from '@/constants/adsense';

const Layout = styled.div`
  position: relative;
  padding-bottom: 20px;

  .banner {
    height: 202px;
    background: url('${props =>
        `${props.theme.imageUrl}/category/banner_2024.jpg`}')
      no-repeat center;
    background-size: contain;
    cursor: pointer;
  }
`;
const CategoryBox = styled.div`
  margin-top: 24px;
  padding: 0 16px;

  h1 {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.21px;
  }
`;

function Category() {
  const router = useRouter();
  const categories = useCategories();

  return (
    <Layout>
      {/* TODO 공통 배너로 추후 작업 */}
      <div className="banner" onClick={() => router.push('/contents/178')} />
      <CategoryBox className="categoryBox">
        <h1>카테고리별로 콘텐츠 보기</h1>
        <MenuList data={categories} />
      </CategoryBox>

      <Advertise
        style={{
          marginTop: 40,
          padding: '0px 16px',
        }}
        {...CATEGORY_AD}
      />
    </Layout>
  );
}

Category.getLayout = function getLayout(page: React.ReactNode) {
  return <HistoryLayout name="카테고리">{page}</HistoryLayout>;
};

export default Category;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['categories'], fetchCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
