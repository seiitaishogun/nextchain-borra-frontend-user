import React from 'react';
import styled from 'styled-components';
import Checkbox from '@/components/Admin/Common/Form/Checkbox';
import { MultiSelectProps } from '@/types/admin/form';

interface Labels {
  label: React.ReactNode;
  value: string | number;
}

interface Props {
  label?: string;
  labels: Array<Labels>;
  checked: MultiSelectProps;
  setChecked: (value: MultiSelectProps) => void;
}

const FilterGroupFlexCenter = styled.div`
  display: flex;
  align-items: center;
  height: auto;
`;

function CheckboxLabel({ label, labels, checked, setChecked }: Props) {
  return (
    <FilterGroupFlexCenter className="radioPosition">
      <label htmlFor="demo-radio-buttons-group-label">{label}</label>
      <Checkbox labels={labels} checked={checked} setChecked={setChecked} />
    </FilterGroupFlexCenter>
  );
}

export default CheckboxLabel;
