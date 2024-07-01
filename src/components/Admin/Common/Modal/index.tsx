import { Box, Grid, Modal as MuiModal, ModalProps } from '@mui/material';
import React from 'react';

function Modal({ open, children }: ModalProps) {
  return (
    <MuiModal open={open}>
      <Box
        sx={{
          height: '100%',
          padding: '50px',
          boxSizing: 'border-box',
        }}
      >
        <Grid
          container
          sx={{
            overflowY: 'scroll',
            maxHeight: '100%',
            margin: '0 auto',
            padding: '20px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
          }}
        >
          {children}
        </Grid>
      </Box>
    </MuiModal>
  );
}

export default Modal;
