import React, { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import AdminLayout from '@/components/Admin/Layout';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Search from '@/components/Admin/Posts/Search';
import Select from '@/components/Admin/Common/Form/Select';
import EditorView from '@/components/Common/Editor/EditorView';
import { EditorViewLayout, PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchPosts, fetchPostUpdateOpen } from '@/api/admin/posts';
import useListData from '@/hooks/admin/useListData';
import { searchFiltersState, searchRequestSelector } from '@/store/admin/posts';
import { PostsList } from '@/types/admin/posts';
import { IS_OPEN_OPTIONS } from '@/constants/admin/posts/search';

function Posts() {
  const queryClient = useQueryClient();
  const searchFilters = useRecoilValue(searchRequestSelector);
  const setSearchFilters = useSetRecoilState(searchFiltersState);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    ['adminPosts', { page, ...searchFilters }],
    () =>
      fetchPosts({
        page: Number(page),
        ...searchFilters,
      })
  );

  const { list, paginate } = useListData<PostsList>(data?.data);

  const updateIsOpenMutation = useMutation(fetchPostUpdateOpen);

  useEffect(
    () => () => {
      resetSearchFilters();
    },
    []
  );

  const handleUpdate = ({ ...params }: { id: number; is_open: 0 | 1 }) => {
    updateIsOpenMutation.mutate(params, {
      onSuccess: ({ message }) => {
        window.alert(message);
        queryClient.invalidateQueries([
          'adminPosts',
          { page, ...searchFilters },
        ]);
      },
    });
  };

  const columns: Array<TableColumns<PostsList>> = [
    {
      id: 'type',
      label: '분류',
      maxWidth: 40,
      isSort: true,
      format: row => (
        <Link href={`/admin/posts/${row.id}`} legacyBehavior>
          {row.type}
        </Link>
      ),
    },
    {
      id: 'name',
      label: '제목',
      maxWidth: 150,
      isSort: true,
    },
    {
      id: 'contents',
      label: '내용',
      maxWidth: 350,
      isSort: true,
      format: row => (
        <EditorViewLayout>
          <EditorView html={row.contents} />
        </EditorViewLayout>
      ),
    },
    {
      id: 'is_open',
      label: '공개여부',
      maxWidth: 150,
      format: ({ id, is_open }) => (
        <Select
          options={IS_OPEN_OPTIONS}
          selected={[is_open]}
          onChange={e => {
            if (window.confirm('선택하신 공개여부를 변경하시겠습니까?')) {
              handleUpdate({
                id,
                is_open: e.target.value ? 1 : 0,
              });
            }
          }}
        />
      ),
    },
    {
      id: 'created_at',
      label: '가입일',
      maxWidth: 150,
    },
    {
      id: '',
      label: '관리',
      maxWidth: 150,
      format: ({ id }) => <Link href={`/admin/posts/${id}`}>수정</Link>,
    },
  ];

  return (
    <PageLayout>
      <h1>게시글 조회</h1>
      <Search searchFiltersState={searchFiltersState} setPage={setPage} />

      <Table<PostsList>
        columns={columns}
        rows={list}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        setSearchSort={setSearchFilters}
        totalPage={paginate}
      />
    </PageLayout>
  );
}

export default Posts;

Posts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
