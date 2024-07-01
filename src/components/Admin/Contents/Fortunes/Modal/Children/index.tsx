import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Table from '@/components/Admin/Common/Table';
import DNDTable from '@/components/Admin/Common/Table/DND';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Search from '@/components/Admin/Fortunes/Search';
import Modal from '@/components/Admin/Common/Modal';
import { fetchFortunes, fetchFortunesResource } from '@/api/admin/fortunes';
import { ChildrenDataT } from '@/types/admin/contents/contents';
import { searchFiltersState, searchRequest } from '@/store/admin/fortunes';
import { IS_OPEN_OPTIONS } from '@/constants/admin/fortunes';
import useListData from '@/hooks/admin/useListData';

interface Props {
  open: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleComplete: (selectFortunes: Array<ChildrenDataT>) => void;
  fortunes: Array<ChildrenDataT>; // TODO fortunes -> childrenData 이름 변경
}

function ModalChildren({
  open,
  fortunes,
  setModalOpen,
  handleComplete,
}: Props) {
  const searchFilters = useRecoilValue(searchRequest);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);
  const [selectFortunes, setSelectFortunes] = useState(fortunes);

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

  const { data: create } = useQuery(
    ['adminCreateFortunes'],
    fetchFortunesResource
  );

  const {
    paginate,
    counts: { search_count },
  } = useListData(data?.data);

  useEffect(() => {
    resetSearchFilters();
  }, [open]);

  const handleSelect = (row: ChildrenDataT) => {
    if (selectFortunes.some(f => f.id === row.id)) {
      alert('이미 선택된 항목입니다.');
    } else {
      const newSelectFortunes = [
        ...selectFortunes,
        { ...row, order: selectFortunes.length },
      ];
      setSelectFortunes(newSelectFortunes);
    }
  };

  const handleDelete = (row: ChildrenDataT) => {
    const newSelectFortunes = selectFortunes
      .filter(f => f.id !== row.id)
      .map((f, i) => ({ ...f, order: i }));
    setSelectFortunes(newSelectFortunes);
  };

  const fortuneColumns = getTableColumns({
    text: '선택',
    handleEvent: handleSelect,
  });

  const selectColumns = getOrderTableColumns({
    text: '삭제',
    handleEvent: handleDelete,
  });

  const handleMoveFortune = (dragOrder: number, hoverOrder: number) => {
    const newSelectFortunes = [...selectFortunes];
    [newSelectFortunes[dragOrder], newSelectFortunes[hoverOrder]] = [
      newSelectFortunes[hoverOrder],
      newSelectFortunes[dragOrder],
    ];
    setSelectFortunes(newSelectFortunes.map((f, i) => ({ ...f, order: i })));
  };

  return (
    <Modal open={open}>
      <>
        <Grid item xs={12} component="header">
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              운세 풀이 데이터
            </Typography>
            <Button onClick={() => setModalOpen(false)}>X</Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Search
            data={create?.data}
            searchFiltersState={searchFiltersState}
            setPage={setPage}
          />

          <Typography variant="h5" component="h4" sx={{ marginTop: 5 }}>
            검색결과 {search_count}건
          </Typography>

          {!isLoading && (
            <Table<ChildrenDataT>
              columns={fortuneColumns}
              rows={data?.data?.list || []}
              isLoading={isLoading}
              page={page}
              setPage={setPage}
              totalPage={paginate}
            />
          )}

          <Typography
            variant="h5"
            component="h4"
            sx={{
              marginTop: 5,
            }}
          >
            선택한 데이터
          </Typography>

          <DNDTable
            columns={selectColumns}
            rows={selectFortunes}
            handleMoveFortune={handleMoveFortune}
          />

          <Button
            variant="contained"
            onClick={() => handleComplete(selectFortunes)}
          >
            완료
          </Button>
        </Grid>
      </>
    </Modal>
  );
}

export default ModalChildren;

const getTableColumns = ({
  text,
  handleEvent,
}: {
  text: string;
  handleEvent: (row: ChildrenDataT) => void;
}) =>
  [
    {
      id: 'type',
      label: '분류',
      maxWidth: 150,
      format({ type }) {
        return type?.name;
      },
    },
    {
      id: 'template',
      label: '템플릿',
      maxWidth: 150,
      format({ template }) {
        return template?.name;
      },
    },
    {
      id: 'name',
      label: '데이터 설명',
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
      format: ({ is_open }) => <span>{IS_OPEN_OPTIONS[is_open].label}</span>,
    },
    {
      id: '',
      label: '선택',
      maxWidth: 150,
      format: row => (
        <Button variant="outlined" onClick={() => handleEvent(row)}>
          {text}
        </Button>
      ),
    },
  ] as Array<TableColumns<ChildrenDataT>>;

// TODO order column refectoring

const getOrderTableColumns = ({
  text,
  handleEvent,
}: {
  text: string;
  handleEvent: (row: ChildrenDataT) => void;
}) =>
  [
    {
      id: 'order',
      label: 'No.',
      maxWidth: 50,
      format({ order }) {
        return Number(order) + 1;
      },
    },
    {
      id: 'type',
      label: '분류',
      maxWidth: 150,
      format({ type }) {
        return type?.name;
      },
    },
    {
      id: 'template',
      label: '템플릿',
      maxWidth: 150,
      format({ template }) {
        return template?.name;
      },
    },
    {
      id: 'name',
      label: '데이터 설명',
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
      format: ({ is_open }) => <span>{IS_OPEN_OPTIONS[is_open].label}</span>,
    },
    {
      id: '',
      label: '선택',
      maxWidth: 150,
      format: row => (
        <Button variant="outlined" onClick={() => handleEvent(row)}>
          {text}
        </Button>
      ),
    },
  ] as Array<TableColumns<ChildrenDataT>>;
