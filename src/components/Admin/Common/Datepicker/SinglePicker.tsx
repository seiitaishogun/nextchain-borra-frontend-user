import React from 'react';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

registerLocale('ko', ko);

interface Props {
  date: Date | null;
  name: string;
  dateFormat?: string;
  disabled?: boolean;
  setDate: (newValue: Date | null) => void;
  showTimeInput?: boolean;
}

const Layout = styled.div`
  position: relative;
  display: flex;
  width: auto;
  height: auto;
  min-height: 1.4375em;
  align-items: center;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  background-color: ${({ theme }) => theme.colors.white};

  .react-datepicker__input-container {
    padding-left: 14px;

    input {
      border: none;
    }
  }
`;

function SinglePicker({
  date,
  name,
  dateFormat,
  disabled,
  setDate,
  showTimeInput,
}: Props) {
  return (
    <Layout>
      <DatePicker
        locale="ko"
        name={name}
        dateFormat={dateFormat || 'yyyy-MM-dd'}
        timeInputLabel="Time:"
        selected={date}
        disabled={disabled}
        onChange={newValue => {
          setDate(newValue);
        }}
        showTimeInput={showTimeInput}
        autoComplete="off"
      />
      <IconButton color="primary" aria-label="search">
        <CalendarMonthIcon />
      </IconButton>
    </Layout>
  );
}

export default SinglePicker;
