import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Box, Button, Modal, Typography } from '@mui/material';
import Select from '@/components/Admin/Common/Form/Select';

interface Props {
  open: boolean;
  onClose: () => void;
  contents: any[];
  selectedContents: number;
  setSelectedContents: React.Dispatch<React.SetStateAction<number>>;
}

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonsWrap = styled.div`
  display: flex;
  margin: 20px;

  > button {
    margin: 0 5px;
  }
`;

function ModalLinkedContents({
  open,
  onClose,
  contents,
  selectedContents,
  setSelectedContents,
}: Props) {
  const router = useRouter();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          연결된 콘텐츠
        </Typography>

        <Select
          options={contents}
          selected={[selectedContents]}
          displayEmpty={false}
          onChange={e => {
            const { value } = e.target;
            setSelectedContents(Number(value));
          }}
        />

        <Buttons>
          해당 콘텐츠로 이동하시겠습니까?
          <ButtonsWrap>
            <Button
              variant="contained"
              onClick={() => router.push(`/admin/contents/${selectedContents}`)}
            >
              확인
            </Button>
            <Button variant="outlined" onClick={onClose}>
              취소
            </Button>
          </ButtonsWrap>
        </Buttons>
      </Box>
    </Modal>
  );
}

export default ModalLinkedContents;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
