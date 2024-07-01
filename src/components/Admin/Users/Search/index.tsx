import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Grid } from '@mui/material';
import Select from '@/components/Admin/Common/Form/Select';
import MultiPicker from '@/components/Admin/Common/Datepicker/MultiPicker';
import TextField from '@/components/Admin/Common/Form/TextField';
import SearchBar from '@/components/Admin/Common/Search/SearchBar';

import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import Checkbox from '@/components/Admin/Common/Form/Checkbox';
import Template from '@/components/Admin/Common/Search/Template';
import { searchFiltersState } from '@/store/admin/users';
import {
  DATE_TYPE_OPTIONS,
  GENDER_OPTIONS,
  IS_KAKAO_OPTIONS,
  IS_MAIL_OPTIONS,
  IS_NOTIFY_OPTIONS,
  MARITAL_OPTIONS,
  REGISTER_PATH_OPTIONS,
  SEARCH_TYPE_OPTIONS,
  STATUS_OPTIONS,
} from '@/constants/admin/users/search';

import useTags from '@/hooks/admin/useTags';
import { updateSearchFilters } from '@/utils/admin/search';

function Search() {
  const [filters, setFilters] = useRecoilState(searchFiltersState);
  const [searchFilters, setSearchFilters] = useState(filters);
  const tags = useTags();

  const handleSearchFilters = updateSearchFilters(setSearchFilters);

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
              handleSearchFilters({ name, value });
            }}
          />
        </LabelGroup>
      }
      Detail={
        <Grid container>
          <LabelGroup id="date_type" label="조회기간" xs={12}>
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
                handleSearchFilters({ name, value });
              }}
              endDate={searchFilters.ended_at}
              endDateName="ended_at"
              setEndDate={({ value, name }) => {
                handleSearchFilters({ name, value });
              }}
            />
          </LabelGroup>
          <LabelGroup id="payment" label="결제 금액" xs={12}>
            <TextField
              name="min_payment"
              defaultValue={searchFilters.min_payment}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
            />
            <span className="spanSpace">-</span>
            <TextField
              name="max_payment"
              defaultValue={searchFilters.max_payment}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
            />
          </LabelGroup>
          <LabelGroup id="age" label="나이" xs={12}>
            <TextField
              name="min_age"
              defaultValue={searchFilters.min_age}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
            />
            <span className="spanSpace"> - </span>
            <TextField
              name="max_age"
              defaultValue={searchFilters.max_age}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
            />
          </LabelGroup>
          <LabelGroup id="coin" label="보유코인" xs={12}>
            <TextField
              name="min_coin"
              defaultValue={searchFilters.min_coin}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
            />
            <span className="spanSpace"> - </span>
            <TextField
              name="max_coin"
              defaultValue={searchFilters.max_coin}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
            />
          </LabelGroup>
          <LabelGroup id="recommender" label="추천회원수" xs={12}>
            <TextField
              name="min_recommender"
              defaultValue={searchFilters.min_recommender}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
            />
            <span className="spanSpace">-</span>
            <TextField
              name="max_recommender"
              defaultValue={searchFilters.max_recommender}
              onChange={e => {
                const { value, name } = e.target;
                handleSearchFilters({ name, value });
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
              handleSearchFilters({ name: 'gender', value });
            }}
          />
        </LabelGroup>
        <LabelGroup id="marital" label="결혼여부">
          <Checkbox
            labels={MARITAL_OPTIONS}
            checked={searchFilters.marital}
            setChecked={value => {
              handleSearchFilters({ name: 'marital', value });
            }}
          />
        </LabelGroup>
        <LabelGroup id="register_path" label="가입경로">
          <Checkbox
            labels={REGISTER_PATH_OPTIONS}
            checked={searchFilters.register_path}
            setChecked={value => {
              handleSearchFilters({ name: 'register_path', value });
            }}
          />
        </LabelGroup>
        <LabelGroup id="is_notify" label="푸시알림">
          <Checkbox
            labels={IS_NOTIFY_OPTIONS}
            checked={searchFilters.is_notify}
            setChecked={value => {
              handleSearchFilters({ name: 'is_notify', value });
            }}
          />
        </LabelGroup>
        <LabelGroup id="is_mail" label="메일알림">
          <Checkbox
            labels={IS_MAIL_OPTIONS}
            checked={searchFilters.is_mail}
            setChecked={value => {
              handleSearchFilters({ name: 'is_mail', value });
            }}
          />
        </LabelGroup>
        <LabelGroup id="is_kakao" label="알림톡">
          <Checkbox
            labels={IS_KAKAO_OPTIONS}
            checked={searchFilters.is_kakao}
            setChecked={value => {
              handleSearchFilters({ name: 'is_kakao', value });
            }}
          />
        </LabelGroup>
        <LabelGroup id="tags" label="관심태그">
          <Checkbox
            labels={tags}
            checked={searchFilters.tags}
            setChecked={value => {
              handleSearchFilters({ name: 'tags', value });
            }}
          />
        </LabelGroup>
        <LabelGroup id="status" label="상태">
          <Checkbox
            labels={STATUS_OPTIONS}
            checked={searchFilters.status}
            setChecked={value => {
              handleSearchFilters({ name: 'status', value });
            }}
          />
        </LabelGroup>
      </>
    </Template>
  );
}

export default Search;
