import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import TopBanner from '@/components/Contents/TopBanner';
import DetailInfo from '@/components/Contents/Detail/Info';
import Form from '@/components/Contents/Detail/Form';
import ContentFeedback from '@/components/Contents/Feedback';
import { ContentDetailT } from '@/types/content/detail';

const Layout = styled.section`
  padding-bottom: 20px;
`;

interface Props {
  content: ContentDetailT;
  isLike: boolean;
  setPurchaseData: Dispatch<SetStateAction<any>>;
}

function ContentsDetail({ content, isLike, setPurchaseData }: Props) {
  return (
    <Layout>
      <TopBanner bg={content.banner} />
      <DetailInfo content={content} isLike={isLike} />
      <Form
        content={content}
        isLike={isLike}
        setPurchaseData={setPurchaseData}
      />

      <ContentFeedback contentName={content.name} />
    </Layout>
  );
}

export default ContentsDetail;
