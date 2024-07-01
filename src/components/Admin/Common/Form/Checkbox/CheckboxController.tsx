import { Control, Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';

interface Props {
  name: string;
  control: Control<any>;
  options: Array<{ value: number | string; label: string }>;
}

function CheckboxController({ name, control, options }: Props) {
  // is_new, is_hot, is_sale
  if (options.length === 1) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox {...field} size="small" checked={!!field.value} />
            }
            label={options[0].label}
          />
        )}
      />
    );
  }
  return (
    <>
      {options.map(option => (
        <Controller
          key={option.label}
          control={control}
          name={name}
          render={({ field }) => (
            <FormControlLabel
              label={option.label}
              control={
                <Checkbox
                  value={option.value}
                  checked={field.value.some(
                    (value: any) => value.toString() === option.value.toString()
                  )}
                  onChange={(e, checked) => {
                    const inputValue = Number(e.target.value);
                    if (checked) {
                      field.onChange([...field.value, inputValue]);
                    } else {
                      field.onChange(
                        field.value.filter(
                          (value: unknown) => value !== inputValue
                        )
                      );
                    }
                  }}
                />
              }
            />
          )}
        />
      ))}
    </>
  );
}

export default CheckboxController;
