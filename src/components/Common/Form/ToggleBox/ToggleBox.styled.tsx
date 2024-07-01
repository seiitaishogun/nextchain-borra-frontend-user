import styled from 'styled-components';
import { Switch, SwitchProps } from '@mui/material';

const StyledSwitch = styled((props: SwitchProps) => (
  <Switch disableRipple {...props} />
))(({ theme }) => ({
  width: 36,
  height: 22,
  margin: 0,
  padding: 0,

  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: '3px 0 0 4px',
    transitionDuration: '300ms',

    '&.Mui-checked': {
      margin: '3px 4px 0 0',
      transform: 'translateX(16px)',
      color: '#fff',

      '& + .MuiSwitch-track': {
        backgroundColor: theme.colors.primary,
        opacity: 1,
        border: 0,
      },

      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },

    '&.Mui-disabled + .MuiSwitch-track': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  },

  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
  },

  '& .MuiSwitch-track': {
    borderRadius: '1000px',
  },
}));

export { StyledSwitch };
