import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import SearchInput from '@/components/Search/Searchbar/SearchInput';
import SearchKeyword from '@/components/Search/Searchbar/SearchKeyword';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { userInfoState } from '@/store/auth';

interface Props {
  historyKeywords: Array<string>;
  searchValue: string;
  deleteHistory: (value: string) => void;
}

function Search({ historyKeywords, searchValue, deleteHistory }: Props) {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [autoKeywords] = useState([]);
  const formMethods = useForm({
    defaultValues: {
      search_value: '',
    },
  });
  const { handleSearchEvent } = useDataCollection();

  const handleAutoSearch = () => {
    /** FIXME: 추천 검색어 API 누락 + 검색 기능 수정이 필요해 추후 개발 예정
     if (search_value.length < 2) return;
     searchMutation.mutate(
     { search_value, limit: 3, order_column: 'view_count' },
     {
        onSuccess: ({ data }) => {
          const { list } = data;
          setAutoKeywords(list.map(({ name }: any) => name));
        },
      }
     );
     */
  };

  const handleSearch = (search_value: string) => {
    if (search_value.length < 2) return;

    setIsSearchOpen(false);
    handleSearchEvent({
      keyword: search_value,
      user_id: userInfo?.id || null,
      user_name: userInfo?.name || null,
    });
    router.push({
      pathname: '/search',
      query: { search_value },
    });
  };

  return (
    <>
      <SearchInput
        searchValue={searchValue}
        formMethods={formMethods}
        onToggle={() => setIsSearchOpen(prev => !prev)}
        onSearch={handleSearch}
        onAutoSearch={handleAutoSearch}
      />

      <SearchKeyword
        isOpen={isSearchOpen}
        historyKeywords={historyKeywords}
        autoKeywords={autoKeywords}
        onClose={() => {
          setIsSearchOpen(false);
        }}
        onSearch={handleSearch}
        onDelete={value => deleteHistory(value)}
      />
    </>
  );
}

export default Search;
