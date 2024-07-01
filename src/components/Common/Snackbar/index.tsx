import { Snackbar as MuiSnackbar, SnackbarProps } from '@mui/material';
import styled from 'styled-components';

interface Props extends SnackbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  message?: string;
}

const SnackBarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 291px;
  height: 48px;
  border-radius: 11px;
  background: #727272;
  font-family: ${({ theme }) => theme.fontFamilies.notoSans};
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
`;

function Snackbar({ isOpen, setIsOpen, message, ...props }: Props) {
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => setIsOpen(false)}
      {...props}
    >
      <SnackBarBox>{message || '완료 되었습니다.'}</SnackBarBox>
    </MuiSnackbar>
  );
}

export default Snackbar;
