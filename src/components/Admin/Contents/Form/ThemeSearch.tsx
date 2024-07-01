import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Search from '@/components/Admin/Contents/Form/ThemeSearchForm';
import Modal from '@/components/Admin/Common/Modal';
import {
  searchThemeFiltersState,
  searchThemeRequest,
} from '@/store/admin/contents';
import { fetchThemes } from '@/api/admin/themes';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  selected: Array<{
    id: number;
    name: string;
  }>;
  handleSelected: (
    data: Array<{
      id: number;
      name: string;
    }>
  ) => void;
}

function ThemeSearch({
  open,
  setOpen,
  selected: selectedItem,
  handleSelected,
}: Props) {
  const searchFilters = useRecoilValue(searchThemeRequest);
  const resetSearchFilters = useResetRecoilState(searchThemeFiltersState);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<
    Array<{
      id: number;
      name: string;
    }>
  >(selectedItem);

  const { data, isLoading } = useQuery(
    ['adminContentsThemes', { page, ...searchFilters }],
    () => fetchThemes({ page, ...searchFilters })
  );

  useEffect(() => {
    resetSearchFilters();
  }, [open]);

  useEffect(() => {
    setSelected(selectedItem);
  }, [open]);

  const paginate = data?.data.paginate || 1;
  const themes = data?.data.list || [];

  const THEME_COLUMN: Array<TableColumns<any>> = [
    {
      id: 'id',
      label: '선택',
      maxWidth: 10,
      format: ({ id, name }) => (
        <Checkbox
          checked={selected.some(s => s.id === id)}
          onChange={() => {
            let newSelected;
            if (selected.find(s => s.id === id)) {
              newSelected = selected.filter(s => s.id !== id);
            } else {
              newSelected = [...selected, { id, name }];
            }
            setSelected(newSelected);
          }}
        />
      ),
    },
    {
      id: 'is_open',
      label: '사용여부',
      format: ({ is_open }) => <span>{is_open ? '사용' : '중단'}</span>,
    },
    { id: 'tag', label: '해시태그' },
    { id: 'name', label: '하위테마명' },
    { id: 'description', label: '테마설명' },
  ];

  return (
    <Modal open={open}>
      <>
        <Grid item xs={12} component="header">
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              테마 검색
            </Typography>
            <Button onClick={() => setOpen(false)}>X</Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Search
            searchFiltersState={searchThemeFiltersState}
            setPage={setPage}
          />
          <Table
            columns={THEME_COLUMN}
            rows={themes}
            isLoading={isLoading}
            page={page}
            setPage={id => {
              setPage(id);
            }}
            totalPage={paginate}
            isPagination
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            onClick={e => {
              e.preventDefault();
              handleSelected(selected);
              setOpen(false);
            }}
          >
            선택완료
          </Button>
        </Grid>
      </>
    </Modal>
  );
}

export default ThemeSearch;
