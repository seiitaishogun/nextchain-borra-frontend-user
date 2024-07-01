import React from 'react';
import { CircularProgress } from '@mui/material';
import Popup from '@/components/Common/Popup';

interface Props {
  isOpen: boolean;
}

function Loading({ isOpen }: Props) {
  return (
    <Popup isOpen={isOpen}>
      <CircularProgress size={120} />
    </Popup>
  );
}

export default Loading;
