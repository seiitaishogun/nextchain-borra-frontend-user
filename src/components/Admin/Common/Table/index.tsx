import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Pagination,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { SetterOrUpdater } from 'recoil';
import TableHead from '@/components/Admin/Common/Table/TableHead';
import {
  OrderDirectionE,
  OrderT,
  TableColumns,
} from '@/components/Admin/Common/Table/types';

interface Props<T> {
  columns: Array<TableColumns<T>>;
  rows: Array<T>;
  isLoading: boolean;
  page: number;
  setPage?: React.Dispatch<number>;
  totalPage?: number;
  setSearchSort?: SetterOrUpdater<any>; // TODO 타입 확인
  isPagination?: boolean;
}

const PaginationLayout = styled.div`
  margin: 14px 0;

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MuiTableLayout = styled(MuiTable)`
  .MuiTableCell-root {
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

function Table<T extends { id: number | null }>({
  columns,
  rows,
  isLoading,
  page,
  setPage,
  totalPage,
  setSearchSort,
  isPagination,
}: Props<T>) {
  const [sortFilter, setSortFilter] = useState<OrderT>({
    order_column: '',
    order_direction: OrderDirectionE.ASC,
  });

  useEffect(() => {
    if (setSearchSort) {
      setSearchSort((prev: OrderT) => ({ ...prev, ...sortFilter }));
    }
  }, [sortFilter]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (setPage) setPage(newPage);
  };

  if (isLoading) return <div>조회중입니다.</div>;

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      <TableContainer>
        <MuiTableLayout stickyHeader aria-label="sticky table">
          <TableHead
            columns={columns}
            sortFilter={sortFilter}
            setSortFilter={setSortFilter}
          />

          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  조회 내역이 없습니다
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              rows.length > 0 &&
              rows.map(row => (
                <TableRow key={row.id} hover>
                  <TableCell
                    align="center"
                    sx={{
                      width: 30,
                    }}
                  >
                    {row.id}
                  </TableCell>

                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align="center"
                      onClick={column.onClick}
                      sx={{
                        maxWidth: column?.maxWidth,
                      }}
                    >
                      <Box
                        sx={{
                          wordBreak: 'break-all',
                          whiteSpace: 'normal',
                        }}
                      >
                        {column.format
                          ? column.format(row)
                          : row[column.id as keyof T]}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </MuiTableLayout>
      </TableContainer>

      {isPagination && (
        <PaginationLayout>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handleChangePage}
          />
        </PaginationLayout>
      )}
    </Paper>
  );
}

Table.defaultProps = {
  isPagination: true,
};

export default Table;
