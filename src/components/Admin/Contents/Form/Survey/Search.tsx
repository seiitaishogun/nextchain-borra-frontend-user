import { Box, Button, Grid, Radio, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Table from '@/components/Admin/Common/Table';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Search from '@/components/Admin/Contents/Form/ThemeSearchForm';
import Modal from '@/components/Admin/Common/Modal';
import { searchFiltersState, searchRequest } from '@/store/admin/survey/search';
import { fetchSurveyList } from '@/api/admin/survey';
import { SurveyListResponse } from '@/types/admin/survey';
import { SurveyListDataT } from '@/types/admin/survey/list';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  selected: { id: number; name: string } | null;
  handleSelected: (data: { id: number; name: string } | null) => void;
}

function SurveySearch({
  open,
  setOpen,
  selected: selectedItem,
  handleSelected,
}: Props) {
  const searchFilters = useRecoilValue(searchRequest);
  const resetSearchFilters = useResetRecoilState(searchFiltersState);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<{ id: number; name: string } | null>(
    selectedItem
  );

  const { data, isLoading } = useQuery(
    ['adminSurveys', { page, ...searchFilters }],
    () => fetchSurveyList({ page, ...searchFilters }),
    {
      initialData: {} as SurveyListResponse,
      select: res => res.data,
    }
  );

  useEffect(() => {
    resetSearchFilters();
    setSelected(selectedItem);
  }, [open]);

  const paginate = data?.paginate || 1;
  const surveys = data?.list || [];

  const SURVEY_COLUMN: Array<TableColumns<SurveyListDataT>> = [
    {
      id: 'id',
      label: '선택',
      maxWidth: 10,
      format: ({ id, name }) => (
        <Radio
          checked={selected?.id === id}
          onChange={() => {
            setSelected({
              id,
              name,
            });
          }}
        />
      ),
    },
    {
      id: 'name',
      label: '제목',
      maxWidth: 120,
    },
  ];

  return (
    <Modal open={open}>
      <>
        <Grid item xs={12} component="header">
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              설문 데이터 검색
            </Typography>
            <Button onClick={() => setOpen(false)}>X</Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Search searchFiltersState={searchFiltersState} setPage={setPage} />
          <Table
            columns={SURVEY_COLUMN}
            rows={surveys}
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
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              ml: 2,
            }}
            onClick={e => {
              e.preventDefault();
              setSelected(null);
            }}
          >
            초기화
          </Button>
        </Grid>
      </>
    </Modal>
  );
}

export default SurveySearch;
