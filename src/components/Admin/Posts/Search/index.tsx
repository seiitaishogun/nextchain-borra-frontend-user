import React, { useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import Select from '@/components/Admin/Common/Form/Select';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import Template from '@/components/Admin/Common/Search/Template';
import { updateSearchFilters } from '@/utils/admin/search';
import { SEARCH_TYPE_OPTIONS } from '@/constants/admin/posts/search';

interface Props {
  searchFiltersState: RecoilState<any>; // TODO 검색 유지 기능 확정시, 타입 보완
  setPage: React.Dispatch<number>;
}

function Search({ searchFiltersState, setPage }: Props) {
  const [filters, setFilters] = useRecoilState(searchFiltersState);
  const [searchFilters, setSearchFilters] = useState(filters);

  const handleSearchFilters = updateSearchFilters(setSearchFilters);

  const handleSearch = () => {
    setFilters(searchFilters);
    setPage(1);
  };

  return (
    <Template
      handleSearch={handleSearch}
      Top={
        <LabelGroup label="검색" useLabel xs={12}>
          <Select
            id="type"
            name="type"
            selected={[searchFilters.type]}
            defaultConfig={{ value: '', text: '전체' }}
            options={SEARCH_TYPE_OPTIONS}
            onChange={e => {
              const { name, value } = e.target;
              handleSearchFilters({ name, value });
            }}
          />
        </LabelGroup>
      }
    />
  );
}

export default Search;
