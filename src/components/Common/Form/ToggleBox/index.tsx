import { Control, useController } from 'react-hook-form';
import { StyledSwitch } from '@/components/Common/Form/ToggleBox/ToggleBox.styled';

interface Props {
  name: string;
  control: Control<any>;
  handleChange?: () => void;
}

function ToggleBox({ name, control, handleChange }: Props) {
  const {
    field: { onChange, value: checkedValue },
  } = useController({
    name,
    control,
  });

  return (
    <StyledSwitch
      sx={{ width: 36, height: 22, m: 0, p: 0 }}
      checked={checkedValue}
      onChange={e => {
        if (handleChange) handleChange();
        onChange(e.target.checked);
      }}
    />
  );
}

export default ToggleBox;
