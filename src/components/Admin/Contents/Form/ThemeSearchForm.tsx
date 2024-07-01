import { Button, Grid } from '@mui/material';
import styled from 'styled-components';
import { useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import TextField from '@/components/Admin/Common/Form/TextField';
import Select from '@/components/Admin/Common/Form/Select';
import useTags from '@/hooks/admin/useTags';

interface Props {
  searchFiltersState: RecoilState<any>; // TODO 검색 유지 기능 확정시, 타입 보완
  setPage: React.Dispatch<number>;
}

const Layout = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(224, 224, 224, 1);
  background-color: rgba(255, 255, 255, 1);
`;

function ThemeSearchForm({ searchFiltersState, setPage }: Props) {
  const [filters, setFilters] = useRecoilState(searchFiltersState);
  const [searchFilters, setSearchFilters] = useState(filters);
  const tags = useTags();

  const handleSearchFilters = ({
    name,
    value,
  }: {
    name: string;
    value: unknown;
  }) => {
    setSearchFilters((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const { name: search_value } = searchFilters;
    if (search_value.length === 1 || search_value.length > 100) {
      window.alert('검색어는 최소 2글자 이상 100글자 이하로 입력해주세요.');
      return;
    }

    setFilters(searchFilters);
    setPage(1);
  };

  return (
    <Layout>
      <Grid container alignItems="center">
        <LabelGroup label="해시태그" xs={5}>
          <Select
            id="tag_id"
            name="tag_id"
            minWidth="100%"
            selected={[searchFilters.tag_id]}
            defaultConfig={{ value: '', text: '전체' }}
            onChange={e => {
              const { name, value } = e.target;
              handleSearchFilters({ name, value });
            }}
            options={tags}
          />
        </LabelGroup>
        <LabelGroup label="테마명" xs={7}>
          <TextField
            fullWidth
            name="name"
            value={searchFilters.name}
            onChange={e => {
              const { name, value } = e.target;
              handleSearchFilters({ name, value });
            }}
          />
          <Button
            variant="contained"
            size="medium"
            onClick={handleSearch}
            style={{ marginLeft: '10px' }}
          >
            검색
          </Button>
        </LabelGroup>
      </Grid>
    </Layout>
  );
}

export default ThemeSearchForm;
