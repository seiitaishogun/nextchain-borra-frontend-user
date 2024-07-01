import React from 'react';
import {
  ContentLabel,
  ContentLabelText,
  Layout,
} from '@/components/Common/List/Common/Thumbnail/Thumbnail.styled';

interface Props {
  image: string;
  is_new?: boolean;
  is_hot?: boolean;
  size?: number;
}

function Thumbnail({ image, is_hot, is_new, size }: Props) {
  return (
    <Layout src={image} size={size}>
      {!!(is_new || is_hot) && (
        <ContentLabel>
          <ContentLabelText>
            {is_new ? 'NEW' : ''}
            {!is_new && is_hot ? 'HOT' : ''}
          </ContentLabelText>
        </ContentLabel>
      )}
    </Layout>
  );
}

export default Thumbnail;
