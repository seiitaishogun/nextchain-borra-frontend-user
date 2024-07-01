import React from 'react';
import Link from 'next/link';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import { CounselorListDataT } from '@/types/admin/counselor/list';

const columns: Array<TableColumns<CounselorListDataT>> = [
  {
    id: 'name',
    label: '상담사 명',
    maxWidth: 140,
    format: ({ id, name }) => (
      <Link href={`/admin/counselor/${id}`}>{name}</Link>
    ),
  },
];

export { columns };
