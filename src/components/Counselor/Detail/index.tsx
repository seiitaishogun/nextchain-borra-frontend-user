import React from 'react';
import CounselorHeader from '@/components/Counselor/Detail/Header';
import CounselorInfo from '@/components/Counselor/Detail/Info';
import { Layout } from '@/components/Counselor/Detail/Detail.styled';
import CounselorButtonBox from 'src/components/Counselor/Detail/ButtonBox';
import { CounselorDetailT } from '@/types/counselor/detail';

interface Props {
  data: CounselorDetailT;
  isLike: boolean;
}

function CounselorDetail({ data, isLike }: Props) {
  return (
    <Layout>
      <CounselorHeader data={data} isLike={isLike} />
      <CounselorInfo data={data} />
      <CounselorButtonBox data={data} isLike={isLike} />
    </Layout>
  );
}

export default CounselorDetail;
