import { UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';
import TextField from '@/components/Common/Form/TextField';
import { Layout } from '@/components/Search/Searchbar/SearchInput/SearchInput.styled';

interface Props {
  searchValue: string;
  formMethods: UseFormReturn<{ search_value: string }>;
  onToggle: () => void;
  onSearch: (value: string) => void;
  onAutoSearch: (value: string) => void;
}

function SearchInput({
  searchValue,
  formMethods,
  onToggle,
  onSearch,
  onAutoSearch,
}: Props) {
  const { control, getValues, setValue, watch } = formMethods;

  useEffect(() => {
    const handler = setTimeout(() => {
      onAutoSearch(getValues('search_value'));
    }, 1000);

    return () => clearTimeout(handler);
  }, [watch('search_value')]);

  useEffect(() => {
    setValue('search_value', searchValue);
  }, [searchValue]);

  return (
    <Layout>
      <form
        className="search-form"
        onSubmit={e => {
          e.preventDefault();
          onSearch(getValues('search_value'));
        }}
      >
        <TextField
          name="search_value"
          placeholder="검색어를 입력해주세요"
          autoComplete="off"
          control={control}
          onClick={onToggle}
        />
        <button type="submit">
          <span className="icon" />
        </button>
      </form>
    </Layout>
  );
}

export default SearchInput;
