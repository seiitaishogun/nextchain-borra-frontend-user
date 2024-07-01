import React from 'react';
import {
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from '@mui/material';
import { MultiSelectProps } from '@/types/admin/form';

interface Labels {
  label: React.ReactNode;
  value: string | number;
  name?: string;
}

interface Props {
  labels: Array<Labels>;
  checked: MultiSelectProps;
  setChecked: (value: MultiSelectProps) => void;
}

function Checkbox({ labels, checked, setChecked }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl component="fieldset" variant="standard">
        <FormGroup row>
          {labels.map(({ label, value }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={
                <MuiCheckbox
                  size="small"
                  name={value.toString()}
                  onChange={handleChange}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default Checkbox;
