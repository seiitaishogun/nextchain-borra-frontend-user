import React from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
} from '@mui/material';

interface Options {
  label: string | React.ReactNode | JSX.Element;
  value: string | number;
}

type Props = SelectProps & {
  options: Array<Options>;
  selected: Array<string | number> | string | number;
  minWidth?: number | string;
  marginRight?: number | string;
  defaultConfig?: {
    text?: string;
    value?: string | number;
  };
};

function Select({
  options,
  selected,
  size,
  minWidth,
  marginRight,
  defaultConfig,
  ...props
}: Props) {
  return (
    <Box sx={{ minWidth: minWidth || 120, marginRight: marginRight || '10px' }}>
      <FormControl fullWidth size={size || 'small'}>
        <MuiSelect value={selected} displayEmpty {...props}>
          {defaultConfig && (
            <MenuItem value={defaultConfig.value || ''} selected>
              {defaultConfig.text || '선택'}
            </MenuItem>
          )}
          {options.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  );
}

export default Select;
