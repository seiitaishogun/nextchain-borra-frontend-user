import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import Title from '@/components/Common/Title';
import CounselorList from '@/components/Counselor/List';
import { fetchCounselors } from '@/api/counselor/list';

const Layout = styled.div`
  margin-top: 16px;

  > .title {
    padding: 0 16px;
  }
`;

function Counselor() {
  const { data, isLoading } = useQuery(['counselors'], fetchCounselors, {
    initialData: {
      data: [],
    },
    select: res => res.data,
  });

  return (
    <Layout>
      <Title title="전화 상담 하기" className="title" />
      <CounselorList data={data} isLoading={isLoading} />
    </Layout>
  );
}

export default Counselor;
