import styled from 'styled-components';
import React from 'react';
import { Box } from '@mui/material';

interface TableColumns<T> {
  id: string;
  label: string;
  maxWidth?: number;
  format?: (data: T) => any;
}

interface Props<T> {
  columns: Array<TableColumns<T>>;
  rows: Array<T>;
}

const Layout = styled.table`
  table-layout: fixed;
  margin-top: 8px;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  font-size: 12px;

  tr {
    height: 40px;
  }

  thead {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

    // 입금, 출금
    th:nth-child(4),
    th:nth-child(5) {
      width: 13%;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    td {
      padding: 0 8px;

      > div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

function Table<T extends { id: number | null }>({ columns, rows }: Props<T>) {
  return (
    <Layout>
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.id}
              style={{
                width: column?.maxWidth ? `${column.maxWidth}px` : 'auto',
              }}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && (
          <tr>
            <td colSpan={columns.length}>조회 내역이 없습니다</td>
          </tr>
        )}
        {rows.length > 0 &&
          rows.map(row => (
            <tr key={row.id}>
              {columns.map(column => (
                <td key={column.id}>
                  <Box
                    sx={{
                      maxWidth: column?.maxWidth,
                    }}
                  >
                    {column.format
                      ? column.format(row)
                      : row[column.id as keyof T]}
                  </Box>
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </Layout>
  );
}

export default Table;
