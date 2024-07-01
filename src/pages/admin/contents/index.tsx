import React, { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { Grid } from '@mui/material';
import AdminLayout from '@/components/Admin/Layout';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Search from '@/components/Admin/Contents/Search';
import ExcelDownload from '@/components/Admin/Common/ExcelDownload';
import { PageLayout, Util } from '@/styles/Admin/PageLayout.styled';
import { fetchContents, fetchExcelDownload } from '@/api/admin/contents';
import { searchFiltersState, searchRequest } from '@/store/admin/contents';
import { ContentsList } from '@/types/admin/contents/list';
import useListData from '@/hooks/admin/useListData';

function Contents() {
  const searchFilters = useRecoilValue(searchRequest);
  const setSearchFilters = useSetRecoilState(searchFiltersState);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ['adminContents', { page, ...searchFilters }],
    () =>
      fetchContents({
        page: Number(page),
        ...searchFilters,
      })
  );
  const {
    list,
    counts: { total_count, search_count, total_sum },
    paginate,
  } = useListData<ContentsList>(data?.data);

  useEffect(
    () => () => {
      resetSearchFilters();
    },
    []
  );

  return (
    <PageLayout>
      <h1>콘텐츠 조회/관리</h1>
      <Search setPage={setPage} />
      <Util>
        <span>
          검색결과 총 {search_count}건 / 전체 {total_count}개 / 총 조회수{' '}
          {total_sum}회
        </span>
        <ExcelDownload
          text="콘텐츠 목록 다운로드"
          downloadFunction={() => fetchExcelDownload({ ...searchFilters })}
        />
      </Util>

      <Table<ContentsList>
        columns={columns}
        rows={list}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        totalPage={paginate}
        setSearchSort={setSearchFilters}
        isPagination
      />
    </PageLayout>
  );
}

Contents.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Contents;

const columns: Array<TableColumns<ContentsList>> = [
  {
    id: 'open_status',
    label: '상태',
    maxWidth: 60,
  },
  {
    id: 'category',
    label: '카테고리',
    maxWidth: 100,
    isSort: true,
    orderColumn: 'category_id',
  },
  {
    id: 'name',
    label: '콘텐츠명',
    isSort: true,
    maxWidth: 300,
    format: ({ id, name }) => (
      <Link href={`/admin/contents/${id}`} legacyBehavior>
        {name}
      </Link>
    ),
  },
  {
    id: 'site',
    label: '콘텐츠 제휴',
    maxWidth: 80,
  },
  {
    id: 'price',
    label: '가격',
    maxWidth: 100,
    isSort: true,
    format: ({ price, is_discount, discount_price }) => (
      <Grid container direction="column">
        {is_discount && (
          <>
            <del>{price}</del>
            <span>{discount_price}</span>
          </>
        )}
        {!is_discount && <span>{price}</span>}
      </Grid>
    ),
  },
  {
    id: 'created_at',
    label: '등록일',
    isSort: true,
    maxWidth: 150,
  },
  {
    id: 'visible_date',
    label: '노출 기간',
    maxWidth: 200,
    format: ({ visible_started_at, visible_ended_at }) => (
      <div>
        {visible_started_at} ~ {visible_ended_at}
      </div>
    ),
  },
];
