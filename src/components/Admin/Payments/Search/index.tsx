import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Grid } from '@mui/material';
import Select from '@/components/Admin/Common/Form/Select';
import MultiPicker from '@/components/Admin/Common/Datepicker/MultiPicker';
import TextField from '@/components/Admin/Common/Form/TextField';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import SearchBar from '@/components/Admin/Common/Search/SearchBar';
import Template from '@/components/Admin/Common/Search/Template';
import { SEARCH_TYPE_OPTIONS } from '@/constants/admin/payments/search';
import { searchFiltersState } from '@/store/admin/payments';

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
    const { search_value } = searchFilters;
    if (search_value.length === 1 || search_value.length > 100) {
      window.alert('검색어는 최소 2글자 이상 100글자 이하로 입력해주세요.');
      return;
    }

    setFilters(searchFilters);
    setPage(1);
  };

  return (
    <Template
      handleSearch={handleSearch}
      Top={
        <Grid container>
          <LabelGroup label="검색" useLabel xs={12}>
            <Select
              id="search_type"
              name="search_type"
              selected={[searchFilters.search_type]}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
              options={SEARCH_TYPE_OPTIONS}
            />
            <SearchBar
              name="search_value"
              defaultValue={searchFilters.search_value}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({
                  name,
                  value,
                });
              }}
              handleSearch={handleSearch}
            />
          </LabelGroup>
          <LabelGroup id="date_type" label="조회기간" xs={12}>
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
          <LabelGroup label="충전금액" xs={12}>
            <TextField
              type="number"
              name="min_coin"
              defaultValue={searchFilters.min_coin}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({
                  name,
                  value,
                });
              }}
            />
            <span className="spanSpace"> - </span>
            <TextField
              type="number"
              name="max_coin"
              defaultValue={searchFilters.max_coin}
              onChange={e => {
                const { name, value } = e.target;
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
