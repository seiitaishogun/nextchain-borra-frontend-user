import React from 'react';
import styled from 'styled-components';
import SinglePicker from '@/components/Admin/Common/Datepicker/SinglePicker';
import ButtonPicker from '@/components/Admin/Common/Datepicker/ButtonPicker';

interface Props {
  startDate: Date | null;
  startDateName: string;
  setStartDate: ({ value, name }: { value: Date | null; name: string }) => void;
  endDate: Date | null;
  endDateName: string;
  setEndDate: ({ value, name }: { value: Date | null; name: string }) => void;
  isButtonPicker?: boolean;
  dateFormat?: string;
  showTimeInput?: boolean;
}

const Layout = styled.div`
  display: flex;
  align-items: center;
`;
const PickerSpace = styled.span`
  margin: 0 7px;
`;

function MultiPicker({
  startDate,
  startDateName,
  setStartDate,
  endDate,
  endDateName,
  setEndDate,
  isButtonPicker,
  dateFormat,
  showTimeInput,
}: Props) {
  const handleChangeDate = ({
    startDate: newStartDate,
    endDate: newEndDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) => {
    setStartDate({ value: newStartDate, name: startDateName });
    setEndDate({ value: newEndDate, name: endDateName });
  };

  return (
    <Layout>
      <SinglePicker
        name={startDateName}
        date={startDate}
        setDate={value => setStartDate({ value, name: startDateName })}
        dateFormat={dateFormat}
        showTimeInput={showTimeInput}
      />
      <PickerSpace>-</PickerSpace>
      <SinglePicker
        name={endDateName}
        date={endDate}
        setDate={value => setEndDate({ value, name: endDateName })}
        dateFormat={dateFormat}
        showTimeInput={showTimeInput}
      />
      {isButtonPicker && <ButtonPicker setDate={handleChangeDate} />}
    </Layout>
  );
}

MultiPicker.defaultProps = {
  isButtonPicker: true,
};

export default MultiPicker;
