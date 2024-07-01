import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { RecoilState, useRecoilState } from 'recoil';
import Select from '@/components/Admin/Common/Form/Select';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import Template from '@/components/Admin/Common/Search/Template';
import SearchBar from '@/components/Admin/Common/Search/SearchBar';
import MultiPicker from '@/components/Admin/Common/Datepicker/MultiPicker';
import { DATE_TYPE_OPTIONS } from '@/constants/admin/fortunes';
import { CreateT } from '@/types/admin/fortunes';

interface Props {
  searchFiltersState: RecoilState<any>; // TODO 검색 유지 기능 확정시, 타입 보완
  setPage: React.Dispatch<number>;
  data: CreateT;
}

function Search({ searchFiltersState, setPage, data }: Props) {
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

  const getCategorySelectOptions = (arr: Array<any>) =>
    arr.map(item => ({
      value: item.id,
      label: item.name,
    }));

  const types = data?.types || [];
  const templates = data?.templates || [];

  return (
    <Template
      handleSearch={handleSearch}
      Top={
        <Grid container>
          <LabelGroup label="분류" xs={6}>
            <Select
              id="type_id"
              name="type_id"
              selected={[searchFilters.type_id]}
              defaultConfig={{ value: '', text: '분류선택' }}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
              options={getCategorySelectOptions(types)}
            />
          </LabelGroup>
          <LabelGroup label="템플릿" xs={6}>
            <Select
              id="template_id"
              name="template_id"
              selected={[searchFilters.template_id]}
              defaultConfig={{ value: '', text: '템플릿선택' }}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
              options={getCategorySelectOptions(templates)}
            />
          </LabelGroup>
          <LabelGroup label="검색어" xs={12}>
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
          <LabelGroup label="날짜" xs={12}>
            <Select
              id="date_type"
              name="date_type"
              options={DATE_TYPE_OPTIONS}
              selected={[searchFilters.date_type]}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
            />
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
