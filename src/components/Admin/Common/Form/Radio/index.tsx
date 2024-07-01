import React from 'react';
import {
  Radio as MuiRaido,
  RadioGroup,
  RadioGroupProps,
  FormControlLabelProps,
} from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface Props extends RadioGroupProps {
  labels: Array<{ value: any } & Omit<FormControlLabelProps, 'control'>>;
  checked?: any;
}

function Radio({ labels, checked, onChange, ...props }: Props) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" />
      <RadioGroup
        row
        name="radio-buttons-group"
        value={checked}
        onChange={onChange}
        {...props}
      >
        {labels.map(({ label, value, disabled }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<MuiRaido disabled={disabled} />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default Radio;
