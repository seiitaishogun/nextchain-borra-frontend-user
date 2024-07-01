import { Control, Controller } from 'react-hook-form';
import { MenuItem, Select, SelectProps } from '@mui/material';

interface Props extends SelectProps {
  name: string;
  control: Control<any>;
  isDefault?: boolean;
  defaultConfig?: {
    text?: string;
    value?: string | number;
  };
  options: Array<Options>;
  disabled?: boolean;
}

interface Options {
  value: number | string;
  label: string;
  disabled?: boolean;
}

function SelectController({
  name,
  control,
  isDefault,
  defaultConfig,
  options,
  disabled,
  ...props
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          fullWidth
          size="small"
          displayEmpty
          {...field}
          {...props}
          disabled={disabled}
        >
          {isDefault && (
            <MenuItem value={defaultConfig?.value || ''} selected>
              {defaultConfig?.text || '선택'}
            </MenuItem>
          )}
          {options.map(option => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={!!option?.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}

export default SelectController;
