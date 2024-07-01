import React from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton, BaseTextFieldProps } from '@mui/material';
import styled from 'styled-components';
import TextField from '@/components/Admin/Common/Form/TextField';

interface Props extends BaseTextFieldProps {
  defaultValue: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleSearch: React.MouseEventHandler<HTMLButtonElement>;
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input {
    width: 480px;
  }

  button {
    position: absolute;
    right: 10px;
  }
`;

function SearchBar({ defaultValue, onChange, handleSearch, ...props }: Props) {
  return (
    <Layout>
      <TextField defaultValue={defaultValue} onChange={onChange} {...props} />
      <IconButton color="primary" aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Layout>
  );
}

export default SearchBar;
