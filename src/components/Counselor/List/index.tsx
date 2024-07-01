import React from 'react';
import dynamic from 'next/dynamic';
import { EmptyList } from '@/components/Common/Card/Card.styled';
import { Layout } from '@/components/Common/List/DetailList/DetailList.styled';
import ListItem from '@/components/Counselor/List/ListItem';
import { CounselorListT } from '@/types/counselor/list';

const Loading = dynamic(() => import('@/components/Common/Popup/Loading'), {
  ssr: false,
});

interface Props {
  data: CounselorListT[];
  isLoading: boolean;
}

function CounselorList({ data, isLoading }: Props) {
  if (data.length === 0 && !isLoading) {
    return (
      <EmptyList>
        <p>데이터가 없습니다.</p>
      </EmptyList>
    );
  }

  return (
    <Layout>
      {data.map(item => (
        <ListItem key={item.id} counselor={item} />
      ))}

      <Loading isOpen={isLoading} />
    </Layout>
  );
}

export default CounselorList;
