import React from 'react';
import { ContentLayout } from '@/components/Contents/Result/Result.styled';
import ChildSection from '@/components/Contents/Result/Section/ChildSection';

interface Props {
  selectedTabIndex?: number;
  data: Array<any>;
  useParentName?: boolean;
}

function ContentsPage({ selectedTabIndex, data, useParentName }: Props) {
  if (selectedTabIndex !== undefined) {
    const currentData = data[selectedTabIndex];
    return (
      <ContentLayout>
        {currentData?.name && useParentName && (
          <h3 dangerouslySetInnerHTML={{ __html: currentData?.name }} />
        )}
        {currentData?.children
          .filter((child: any) => child.children_data.length > 0)
          .map((child: any) => (
            <ChildSection key={child.id} data={child} />
          ))}
      </ContentLayout>
    );
  }

  return (
    <>
      {data.map((parent: any) => (
        <ContentLayout key={parent.id}>
          {parent.name && useParentName && (
            <h3 dangerouslySetInnerHTML={{ __html: parent.name }} />
          )}
          {parent.children.map((child: any) => (
            <ChildSection key={child.id} data={child} />
          ))}
        </ContentLayout>
      ))}
    </>
  );
}

ContentsPage.defaultProps = {
  useParentName: true,
};

export default ContentsPage;
