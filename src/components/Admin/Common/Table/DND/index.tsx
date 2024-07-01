import React from 'react';
import styled from 'styled-components';
import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead as MuiTableHead,
  TableRow,
} from '@mui/material';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import Row from '@/components/Admin/Common/Table/DND/Row';

interface Props {
  columns: Array<TableColumns<any>>;
  rows: Array<any>;
  handleMoveFortune: (dragOrder: number, hoverOrder: number) => void;
}

const MuiTableLayout = styled(MuiTable)`
  td {
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

function Table({ columns, rows, handleMoveFortune }: Props) {
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
          <MuiTableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.maxWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </MuiTableHead>

          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  조회 내역이 없습니다
                </TableCell>
              </TableRow>
            )}
            {rows.length > 0 &&
              rows.map(row => (
                <Row
                  key={row.id}
                  row={row}
                  columns={columns}
                  handleMoveFortune={handleMoveFortune}
                />
              ))}
          </TableBody>
        </MuiTableLayout>
      </TableContainer>
    </Paper>
  );
}

export default Table;
