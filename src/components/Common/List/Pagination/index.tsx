import React, { SetStateAction } from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import { Layout } from '@/components/Common/List/Pagination/Pagination.styled';

interface Props {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  totalPage: number;
}

function Pagination({ page, setPage, totalPage }: Props) {
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Layout>
      <MuiPagination
        size="small"
        count={totalPage}
        page={page}
        onChange={handleChangePage}
      />
    </Layout>
  );
}

export default Pagination;
