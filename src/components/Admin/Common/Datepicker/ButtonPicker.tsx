import React from 'react';
import styled from 'styled-components';
import { sub } from 'date-fns';
import Button from '@/components/Common/Button';

interface Props {
  setDate: ({ startDate, endDate }: { startDate: Date; endDate: Date }) => void;
}

const Layout = styled.div`
  display: block;
  margin-left: 10px;

  button {
    width: 80px;
    height: 40px;
    margin-right: 8px;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 3px;
  }
`;

function ButtonPicker({ setDate }: Props) {
  const handleDateFilter = ({ days = 0, months = 0 }) => {
    const today = new Date();
    const startDate = sub(today, {
      days,
      months,
    });
    setDate({
      startDate,
      endDate: today,
    });
  };

  return (
    <Layout>
      {DATE_OPTIONS.map(({ label, filters }) => (
        <Button
          key={label}
          label={label}
          onClick={() => handleDateFilter(filters)}
        />
      ))}
    </Layout>
  );
}

export default ButtonPicker;

const DATE_OPTIONS = [
  {
    label: '오늘',
    filters: {
      days: 0,
    },
  },
  {
    label: '1주일',
    filters: {
      days: 7,
    },
  },
  {
    label: '1개월',
    filters: {
      months: 1,
    },
  },
  {
    label: '3개월',
    filters: {
      months: 3,
    },
  },
];
