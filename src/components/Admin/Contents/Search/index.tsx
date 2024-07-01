import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import Select from '@/components/Admin/Common/Form/Select';
import TextField from '@/components/Admin/Common/Form/TextField';
import MultiPicker from '@/components/Admin/Common/Datepicker/MultiPicker';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import SearchBar from '@/components/Admin/Common/Search/SearchBar';
import Template from '@/components/Admin/Common/Search/Template';
import Radio from '@/components/Admin/Common/Form/Radio';
import {
  COUNT_TYPE_OPTIONS,
  DISPLAY_OPTIONS,
  SEARCH_TYPE_OPTIONS,
  SITE_OPTIONS,
} from '@/constants/admin/contents/search';
import useTags from '@/hooks/admin/useTags';
import { searchFiltersState } from '@/store/admin/contents';
import useCategories from '@/hooks/admin/useCategories';
import useTypes from '@/hooks/admin/useTypes';
import { TYPE_OPTIONS } from '@/types/admin/advertises';

interface Props {
  setPage: React.Dispatch<number>;
}

function Search({ setPage }: Props) {
  const [filters, setFilters] = useRecoilState(searchFiltersState);
  const [searchFilters, setSearchFilters] = useState(filters);
  const tags = useTags();
  const categories = useCategories();
  const types = useTypes();

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

          <LabelGroup id="min_price" label="가격" xs={12}>
            <TextField
              name="min_price"
              defaultValue={searchFilters.min_price}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({
                  name,
                  value,
                });
              }}
            />
            <span className="spanSpace">-</span>
            <TextField
              name="max_price"
              defaultValue={searchFilters.max_price}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({
                  name,
                  value,
                });
              }}
            />
            <span className="spanSpace">코인(원)</span>
          </LabelGroup>

          <LabelGroup label="상세검색" id="search" xs={12}>
            <Select
              id="count_type"
              name="count_type"
              options={COUNT_TYPE_OPTIONS}
              selected={[searchFilters.count_type]}
              defaultConfig={{ value: '', text: '선택' }}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
            />
            <TextField
              name="count_min_value"
              defaultValue={searchFilters.count_min_value}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({
                  name,
                  value,
                });
              }}
            />
            <span className="spanSpace">-</span>
            <TextField
              name="count_max_value"
              defaultValue={searchFilters.count_max_value}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({
                  name,
                  value,
                });
              }}
            />
            <span className="spanSpace">개/회</span>
          </LabelGroup>

          <LabelGroup label="노출 상태" xs={12}>
            <Radio
              labels={DISPLAY_OPTIONS}
              checked={searchFilters.is_open}
              onChange={e => {
                handleSearchFilters({
                  name: 'open_status',
                  value: e.target.value,
                });
              }}
            />
          </LabelGroup>
          <LabelGroup label="노출 기간" xs={12}>
            <MultiPicker
              startDate={searchFilters.visible_started_at}
              startDateName="visible_started_at"
              setStartDate={({ name, value }) =>
                handleSearchFilters({ name, value })
              }
              endDate={searchFilters.visible_ended_at}
              endDateName="visible_ended_at"
              setEndDate={({ name, value }) =>
                handleSearchFilters({ name, value })
              }
            />
          </LabelGroup>

          <LabelGroup label="New/Hot">
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={searchFilters.is_new}
                    onChange={e => {
                      handleSearchFilters({
                        name: 'is_new',
                        value: e.target.checked,
                      });
                    }}
                  />
                }
                label="New"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={searchFilters.is_hot}
                    onChange={e => {
                      handleSearchFilters({
                        name: 'is_hot',
                        value: e.target.checked,
                      });
                    }}
                  />
                }
                label="Hot"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={searchFilters.is_discount}
                    onChange={e => {
                      handleSearchFilters({
                        name: 'is_discount',
                        value: e.target.checked,
                      });
                    }}
                  />
                }
                label="Sale"
              />
            </FormGroup>
          </LabelGroup>

          <LabelGroup id="condition" label="카테고리">
            <Select
              id="category_id"
              name="category_id"
              selected={[searchFilters.category_id]}
              defaultConfig={{ value: '', text: '카테고리선택' }}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
              options={categories}
            />
            <Select
              id="type_id"
              name="type_id"
              selected={[searchFilters.type_id]}
              defaultConfig={{ value: '', text: '분류선택' }}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
              options={types}
            />
          </LabelGroup>

          <LabelGroup id="tag_id" label="해시태그">
            <Select
              id="tag_id"
              name="tag_id"
              selected={[searchFilters.tag_id]}
              defaultConfig={{ value: '', text: '해시태그선택' }}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
              options={tags}
            />
          </LabelGroup>

          <LabelGroup id="site" label="콘텐츠 제휴">
            <Select
              id="site"
              name="site"
              selected={[searchFilters.site]}
              defaultConfig={{ value: '', text: '제휴처 선택' }}
              onChange={e => {
                const { name, value } = e.target;
                handleSearchFilters({ name, value });
              }}
              options={[...SITE_OPTIONS, ...TYPE_OPTIONS]}
            />
          </LabelGroup>
        </Grid>
      }
    />
  );
}

export default Search;
