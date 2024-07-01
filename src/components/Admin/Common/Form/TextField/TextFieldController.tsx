import { TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import TextField from '@/components/Admin/Common/Form/TextField';

type Props = {
  name: string;
  control: Control<any>;
} & TextFieldProps;

function TextFieldController({ name, control, ...props }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <TextField {...field} {...props} />}
    />
  );
}

export default TextFieldController;
