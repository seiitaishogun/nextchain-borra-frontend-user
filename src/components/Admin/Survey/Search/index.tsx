import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Grid } from '@mui/material';
import Template from '@/components/Admin/Common/Search/Template';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import SearchBar from '@/components/Admin/Common/Search/SearchBar';
import MultiPicker from '@/components/Admin/Common/Datepicker/MultiPicker';
import { searchFiltersState } from '@/store/admin/survey/search';

interface Props {
  setPage: React.Dispatch<number>;
}

function Search({ setPage }: Props) {
  const [filters, setFilters] = useRecoilState(searchFiltersState);
  const [searchFilters, setSearchFilters] = useState(filters);

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
    setFilters(searchFilters);
    setPage(1);
  };

  return (
    <Template
      handleSearch={handleSearch}
      Top={
        <Grid container>
          <LabelGroup label="검색" xs={12}>
            <SearchBar
              name="name"
              defaultValue={searchFilters.name}
              handleSearch={handleSearch}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({
                  name,
                  value,
                });
              }}
            />
          </LabelGroup>
          <LabelGroup label="등록일자" xs={12}>
            <MultiPicker
              startDate={searchFilters.started_at}
              startDateName="started_at"
              setStartDate={({ value, name }) => {
                handleSearchFilters({
                  name,
                  value,
                });
              }}
              endDate={searchFilters.ended_at}
              endDateName="ended_at"
              setEndDate={({ value, name }) => {
                handleSearchFilters({
                  name,
                  value,
                });
              }}
            />
          </LabelGroup>
        </Grid>
      }
    />
  );
}

export default Search;
