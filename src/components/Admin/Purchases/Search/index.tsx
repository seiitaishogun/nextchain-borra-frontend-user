import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Grid } from '@mui/material';
import Select from '@/components/Admin/Common/Form/Select';
import MultiPicker from '@/components/Admin/Common/Datepicker/MultiPicker';
import TextField from '@/components/Admin/Common/Form/TextField';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import Checkbox from '@/components/Admin/Common/Form/Checkbox';
import SearchBar from '@/components/Admin/Common/Search/SearchBar';
import Template from '@/components/Admin/Common/Search/Template';
import { searchFiltersState } from '@/store/admin/purchases';
import {
  GENDER_OPTIONS,
  MARITAL_OPTIONS,
  REFERRER_PATH_OPTIONS,
  REGISTER_PATH_OPTIONS,
} from '@/constants/admin/users/search';
import { SEARCH_TYPE_OPTIONS } from '@/constants/admin/purchases/search';
import useTags from '@/hooks/admin/useTags';
import useTypes from '@/hooks/admin/useTypes';

function Search() {
  const [filters, setFilters] = useRecoilState(searchFiltersState);
  const [searchFilters, setSearchFilters] = useState(filters);
  const tags = useTags();
  const types = useTypes();

  const handleSearchFilters = ({
    name,
    value,
  }: {
    name: string;
    value: unknown;
  }) => {
    setSearchFilters(prev => ({
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
  };

  return (
    <Template
      handleSearch={handleSearch}
      Top={
        <LabelGroup label="검색" useLabel xs={12}>
          <Select
            id="search_type"
            name="search_type"
            selected={[searchFilters.search_type]}
            onChange={e => {
              const { value, name } = e.target;
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
      }
      Detail={
        <Grid container>
          <LabelGroup id="date" label="사용일자" xs={12}>
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
          <LabelGroup id="coin" label="나이" xs={12}>
            <TextField
              name="min_age"
              defaultValue={searchFilters.min_age}
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
              name="max_age"
              defaultValue={searchFilters.max_age}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({
                  name,
                  value,
                });
              }}
            />
          </LabelGroup>
          <LabelGroup id="coin" label="금액" xs={12}>
            <TextField
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
    >
      <>
        <LabelGroup id="gender" label="성별">
          <Checkbox
            labels={GENDER_OPTIONS}
            checked={searchFilters.gender}
            setChecked={value => {
              handleSearchFilters({
                name: 'gender',
                value,
              });
            }}
          />
        </LabelGroup>
        <LabelGroup id="marital" label="결혼여부">
          <Checkbox
            labels={MARITAL_OPTIONS}
            checked={searchFilters.marital}
            setChecked={value => {
              handleSearchFilters({
                name: 'marital',
                value,
              });
            }}
          />
        </LabelGroup>
        <LabelGroup id="types" label="분류">
          <Checkbox
            labels={types}
            checked={searchFilters.types}
            setChecked={value => {
              handleSearchFilters({
                name: 'category',
                value,
              });
            }}
          />
        </LabelGroup>
        <LabelGroup id="tags" label="태그">
          <Checkbox
            labels={tags}
            checked={searchFilters.tags}
            setChecked={value => {
              handleSearchFilters({
                name: 'tags',
                value,
              });
            }}
          />
        </LabelGroup>

        <LabelGroup id="coin_event" label="결제방식">
          {/* <ToggleBox */}
          {/*  labels={COIN_EVENT_OPTIONS} */}
          {/*  checked={searchFilters.coin_event} */}
          {/*  setChecked={value => { */}
          {/*    handleSearchFilters({ */}
          {/*      name: 'coin_event', */}
          {/*      value, */}
          {/*    }); */}
          {/*  }} */}
          {/* /> */}
        </LabelGroup>
        <LabelGroup id="register_path" label="가입경로">
          <Checkbox
            labels={REGISTER_PATH_OPTIONS}
            checked={searchFilters.register_path}
            setChecked={value => {
              handleSearchFilters({
                name: 'register_path',
                value,
              });
            }}
          />
        </LabelGroup>
        <LabelGroup id="referrer_path" label="최초 유입경로" xs={12}>
          <Checkbox
            labels={REFERRER_PATH_OPTIONS}
            checked={searchFilters.referrer_path}
            setChecked={value => {
              handleSearchFilters({
                name: 'referrer_path',
                value,
              });
            }}
          />
        </LabelGroup>
      </>
    </Template>
  );
}

export default Search;
