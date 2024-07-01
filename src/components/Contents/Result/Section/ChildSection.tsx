import React from 'react';
import {
  ChildLayout,
  DataLayout,
} from '@/components/Contents/Result/Result.styled';
import ContentsTemplate from '@/components/Contents/Result/Template';

interface Props {
  data: any;
}

function ChildSection({ data }: Props) {
  return (
    <ChildLayout sign={data.sign}>
      {data.first_template_id !== 2 && data.name && (
        <h4 dangerouslySetInnerHTML={{ __html: data.name }} />
      )}
      <DataLayout>
        <ContentsTemplate key={data.id} data={data} isChildren />
      </DataLayout>
    </ChildLayout>
  );
}

export default ChildSection;
