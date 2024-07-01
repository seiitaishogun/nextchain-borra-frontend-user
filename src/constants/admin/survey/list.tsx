import React from 'react';
import Link from 'next/link';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import { SurveyListDataT } from '@/types/admin/survey/list';

const columns: Array<TableColumns<SurveyListDataT>> = [
  {
    id: 'id',
    label: '제목',
    maxWidth: 140,
    format: ({ id, name }) => <Link href={`/admin/survey/${id}`}>{name}</Link>,
  },
  {
    id: 'content_name',
    label: '연결된 콘텐츠',
    maxWidth: 140,
    format: ({ content_id, content_name }) =>
      content_name ? (
        <Link href={`/admin/contents/${content_id}`}>{content_name}</Link>
      ) : (
        '-'
      ),
  },
  {
    id: 'created_at',
    label: '등록일',
    maxWidth: 120,
  },
];

export { columns };
