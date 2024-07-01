import React from 'react';
import { Box, Modal } from '@mui/material';

interface Props {
  isOpen: boolean;
  handleClose?: () => void;
  children: React.ReactNode;
  container?: HTMLElement | null | (() => HTMLElement | null);
}

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  outline: 'none',
};

// TODO: Box 컴포넌트 스타일 문제 이슈로 onClose 영역 문제 발생
function Popup({ isOpen, handleClose, children, container }: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      container={container}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}

export default Popup;
