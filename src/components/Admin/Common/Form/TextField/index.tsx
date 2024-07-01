import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

function TextField({ size, variant, ...props }: TextFieldProps) {
  return (
    <MuiTextField
      size={size || 'small'}
      variant={variant || 'outlined'}
      {...props}
    />
  );
}

export default TextField;
