import React from 'react';
import {
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import {
  OrderDirectionE,
  OrderT,
  TableColumns,
} from '@/components/Admin/Common/Table/types';

interface Props<T> {
  columns: Array<TableColumns<T>>;
  sortFilter: OrderT;
  setSortFilter: React.Dispatch<OrderT>;
}

function TableHead<T>({ columns, sortFilter, setSortFilter }: Props<T>) {
  const updateSortFilter = (property: string) => () => {
    const isAsc =
      sortFilter.order_column === property &&
      sortFilter.order_direction === OrderDirectionE.ASC;

    setSortFilter({
      order_column: property,
      order_direction: isAsc ? OrderDirectionE.DESC : OrderDirectionE.ASC,
    });
  };

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell align="center">No.</TableCell>
        {columns.map(column => {
          const isSort = column.isSort || false;
          const orderColumn = column.orderColumn || column.id;

          return (
            <TableCell
              key={column.id}
              align="center"
              style={{ minWidth: column.maxWidth }}
              sortDirection={
                sortFilter.order_column === orderColumn
                  ? sortFilter.order_direction
                  : false
              }
            >
              {isSort && (
                <TableSortLabel
                  active={sortFilter.order_column === orderColumn}
                  direction={
                    sortFilter.order_column === orderColumn
                      ? sortFilter.order_direction
                      : OrderDirectionE.ASC
                  }
                  sx={{
                    pl: '26px',
                  }}
                  onClick={updateSortFilter(orderColumn)}
                >
                  {column.label}
                </TableSortLabel>
              )}
              {!isSort && column.label}
            </TableCell>
          );
        })}
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
