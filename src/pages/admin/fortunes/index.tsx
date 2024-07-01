import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Search from '@/components/Admin/Fortunes/Search';
import Table from '@/components/Admin/Common/Table';
import AdminLayout from '@/components/Admin/Layout';
import Select from '@/components/Admin/Common/Form/Select';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import ModalLinkedContents from '@/components/Admin/Fortunes/LinkedContents/Modal';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import {
  fetchFortunes,
  fetchFortunesResource,
  fetchFortunesUpdateOpen,
} from '@/api/admin/fortunes';
import { IS_OPEN_OPTIONS } from '@/constants/admin/fortunes';
import { searchFiltersState, searchRequest } from '@/store/admin/fortunes';
import { numberWithCommas } from '@/utils/number';
import useListData from '@/hooks/admin/useListData';
import { FortunesList } from '@/types/admin/fortunes/list';

const Util = styled.div`
  p {
    padding: 5px 0;
  }

  span {
    &:after {
      content: ',';
      display: inline-block;
    }

    &:last-of-type:after {
      display: none;
    }
  }
`;

function Fortunes() {
  const queryClient = useQueryClient();
  const searchFilters = useRecoilValue(searchRequest);
  const setSearchFilters = useSetRecoilState(searchFiltersState);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);
  const [contents, setContents] = useState<
    Array<{
      label: string;
      value: string | number;
    }>
  >([] || '');
  const [selectedContents, setSelectedContents] = useState<number>(0);
  const [contentsModalOpen, setContentsModalOpen] = useState<boolean>(false);

  const { data, isLoading } = useQuery(
    ['adminFortunes', { page, ...searchFilters }],
    () =>
      fetchFortunes({
        page: Number(page),
        ...searchFilters,
      }),
    {
      enabled: !!page,
    }
  );

  const {
    list: fortunes,
    counts: { search_count, total_count, type_count },
    paginate,
  } = useListData<FortunesList>(data?.data);

  const { data: create } = useQuery(
    ['adminCreateFortunes'],
    fetchFortunesResource
  );
  const updateIsOpenMutation = useMutation(fetchFortunesUpdateOpen);

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
          'adminFortunes',
          { page, ...searchFilters },
        ]);
        setContentsModalOpen(false);
        setSelectedContents(0);
      },
    });
  };

  const creates: Array<{
    id: number;
    name: string;
    description: string;
  }> = create?.data.types || [];

  const columns: Array<TableColumns<FortunesList>> = [
    {
      id: 'content',
      label: '콘텐츠명',
      maxWidth: 150,
      format(row) {
        return row.contents.length > 0 ? (
          <Button
            variant="text"
            color="inherit"
            type="button"
            onClick={() => {
              setContentsModalOpen(true);
              const convertedContents = row.contents.map(({ id, name }) => ({
                label: name,
                value: id,
              }));
              setContents(convertedContents);
              setSelectedContents(convertedContents[0].value);
            }}
          >
            {row.content}
          </Button>
        ) : (
          '-'
        );
      },
    },
    {
      id: 'type',
      label: '분류',
      maxWidth: 100,
      format: ({ type }) => type.name,
    },
    {
      id: 'template',
      label: '템플릿',
      maxWidth: 150,
      format: ({ template }) => template.name,
    },
    {
      id: 'name',
      label: '소제목',
      maxWidth: 150,
    },
    {
      id: 'created_at',
      label: '등록일',
      maxWidth: 150,
    },
    {
      id: 'updated_at',
      label: '수정일',
      maxWidth: 150,
    },
    {
      id: 'is_open',
      label: '사용여부',
      maxWidth: 150,
      format: ({ id, is_open }) => (
        <Select
          options={IS_OPEN_OPTIONS}
          selected={[is_open]}
          onChange={e => {
            if (window.confirm('선택하신 DB 사용여부를 변경하시겠습니까?')) {
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
      id: '',
      label: '관리',
      maxWidth: 150,
      format: ({ id }) => <Link href={`/admin/fortunes/${id}`}>수정</Link>,
    },
  ];

  return (
    <PageLayout>
      <h1>운세 풀이 데이터 조회</h1>
      <Search
        searchFiltersState={searchFiltersState}
        data={create?.data}
        setPage={setPage}
      />

      <Util>
        <strong>
          검색결과 총 {search_count}개 (전체 {total_count}개)
        </strong>
        {Object.keys(type_count).length > 0 && (
          <p>
            (
            {creates.map(t => (
              <span>
                {t.description} {numberWithCommas(type_count[t.id] || 0)}건
              </span>
            ))}
            )
          </p>
        )}
      </Util>

      <Table<FortunesList>
        columns={columns}
        rows={fortunes}
        isLoading={isLoading}
        isPagination
        page={page}
        setPage={id => {
          setPage(id);
        }}
        totalPage={paginate}
        setSearchSort={setSearchFilters}
      />

      <ModalLinkedContents
        open={contentsModalOpen}
        onClose={() => setContentsModalOpen(false)}
        contents={contents}
        selectedContents={selectedContents}
        setSelectedContents={setSelectedContents}
      />
    </PageLayout>
  );
}

export default Fortunes;

Fortunes.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
