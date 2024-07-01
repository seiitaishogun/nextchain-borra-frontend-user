import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Grid } from '@mui/material';
import Template from '@/components/Admin/Common/Search/Template';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import Select from '@/components/Admin/Common/Form/Select';
import SearchBar from '@/components/Admin/Common/Search/SearchBar';
import MultiPicker from '@/components/Admin/Common/Datepicker/MultiPicker';
import Radio from '@/components/Admin/Common/Form/Radio';
import {
  IS_OPEN_OPTIONS,
  SEARCH_TYPE_OPTIONS,
} from '@/constants/admin/banner/search';
import { searchFiltersState } from '@/store/admin/banner';

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
        <LabelGroup label="검색" xs={12}>
          <Select
            id="search_type"
            name="search_type"
            selected={[searchFilters.search_type]}
            options={SEARCH_TYPE_OPTIONS}
            onChange={e => {
              const { name, value } = e.target;
              handleSearchFilters({ name, value });
            }}
          />

          <SearchBar
            name="search_value"
            defaultValue={searchFilters.search_value}
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
      }
      Detail={
        <Grid container>
          <LabelGroup label="노출 상태" xs={12}>
            <Radio
              labels={IS_OPEN_OPTIONS}
              checked={searchFilters.is_open}
              onChange={e => {
                handleSearchFilters({
                  name: 'is_open',
                  value: e.target.value,
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
