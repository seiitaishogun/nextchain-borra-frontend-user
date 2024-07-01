import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Radio as MuiRadio,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Modal from '@/components/Admin/Common/Modal';
import Table from '@/components/Admin/Common/Table';
import SearchBar from '@/components/Admin/Common/Search/SearchBar';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import { fetchContents } from '@/api/admin/contents';
import { SearchType } from '@/types/admin/contents/contents';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  selected: number;
  handleSelected: (data: any) => void;
}

function ContentSearch({
  open,
  setOpen,
  selected: selectedItem,
  handleSelected,
}: Props) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<any>(selectedItem || null);
  const [searchValue, setSearchValue] = useState('');
  const [searchFilters, setSearchFilters] = useState<any>({
    search_type: SearchType.All,
    search_value: searchValue || null,
    page,
  });

  const { data, isLoading } = useQuery(['adminContents', searchFilters], () =>
    fetchContents(searchFilters)
  );

  const paginate = data?.data.paginate || 1;
  const contents = data?.data.list || [];

  useEffect(() => {
    if (selectedItem) {
      setSelected(selectedItem);
    }
  }, [selectedItem]);

  useEffect(() => {
    setSearchFilters((prev: any) => ({
      ...prev,
      page,
    }));
  }, [page]);

  const handleSearch = () => {
    if (searchValue.length === 1 || searchValue.length > 100) {
      window.alert('검색어는 최소 2글자 이상 100글자 이하로 입력해주세요.');
      return;
    }

    setPage(1);
    setSearchFilters({
      ...searchFilters,
      search_value: searchValue,
    });
  };

  const CONTENTS_COLUMN: Array<TableColumns<any>> = [
    {
      id: 'id',
      label: '선택',
      maxWidth: 30,
      format: content => (
        <MuiRadio
          name="selected_content_id"
          value={content.id}
          checked={selected?.id === content.id}
          onChange={() => {
            setSelected(content);
          }}
        />
      ),
    },
    {
      id: 'name',
      label: '콘텐츠명',
      maxWidth: 300,
    },
  ];

  return (
    <Modal open={open}>
      <Grid container>
        <Grid item xs={12} component="header">
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              콘텐츠 검색
            </Typography>
            <Button onClick={() => setOpen(false)}>X</Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <LabelGroup label="검색" xs={12}>
            <SearchBar
              name="search_value"
              placeholder="콘텐츠명을 입력해주세요."
              defaultValue={searchValue}
              handleSearch={handleSearch}
              onChange={e => {
                setSearchValue(e.target.value);
              }}
            />
          </LabelGroup>
        </Grid>

        <Grid item xs={12}>
          <Table
            columns={CONTENTS_COLUMN}
            rows={contents}
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
      </Grid>
    </Modal>
  );
}

export default ContentSearch;
