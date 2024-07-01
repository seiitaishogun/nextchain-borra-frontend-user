import React, { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Admin/Layout';
import Search from '@/components/Admin/Themes/Search';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Table from '@/components/Admin/Common/Table';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { searchFiltersState, searchRequest } from '@/store/admin/themes';
import { fetchThemes } from '@/api/admin/themes';
import useListData from '@/hooks/admin/useListData';

function Theme() {
  const router = useRouter();
  const searchFilters = useRecoilValue(searchRequest);
  const setSearchFilters = useSetRecoilState(searchFiltersState);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    ['adminThemes', { page, ...searchFilters }],
    () => fetchThemes({ page: Number(page), ...searchFilters })
  );
  const { paginate, list: themes } = useListData<any>(data?.data);

  useEffect(
    () => () => {
      resetSearchFilters();
    },
    []
  );

  return (
    <PageLayout>
      <Typography variant="h4" component="h1" mb={2}>
        테마 검색
      </Typography>
      <Search searchFiltersState={searchFiltersState} setPage={setPage} />
      <Box
        mt={2}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          onClick={() => router.push(`${router.pathname}/create`)}
        >
          신규 등록
        </Button>
      </Box>
      <Table<any>
        columns={THEME_COLUMN}
        rows={themes}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        totalPage={paginate}
        setSearchSort={setSearchFilters}
      />
    </PageLayout>
  );
}

Theme.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Theme;

const THEME_COLUMN: Array<TableColumns<any>> = [
  {
    id: 'is_open',
    label: '사용여부',
    format: ({ is_open }) => <span>{is_open ? '사용' : '중단'}</span>,
  },
  {
    id: 'tag',
    label: '해시태그',
    isSort: true,
    orderColumn: 'tag_id',
  },
  {
    id: 'name',
    label: '테마명',
    isSort: true,
    format: ({ id, name }: any) => (
      <Link href={`/admin/themes/${id}`} legacyBehavior>
        {name}
      </Link>
    ),
  },
  {
    id: 'description',
    label: '테마설명',
    isSort: true,
  },
];
