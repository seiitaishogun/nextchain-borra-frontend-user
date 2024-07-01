import React from 'react';
import { useRouter } from 'next/router';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import TextField from '@/components/Admin/Common/Form/TextField';
import { DialogContentLayout } from '@/components/Admin/Users/DetailFilter/DetailFilter.styled';
import { fetchUsersDelete } from '@/api/admin/users';

interface InvalidationForm {
  reason: string;
}

interface Props {
  id: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormDelete({ id, isOpen, setIsOpen }: Props) {
  const router = useRouter();

  const { handleSubmit, control } = useForm<InvalidationForm>({
    resolver: yupResolver(schema),
  });

  const deleteMutation = useMutation(fetchUsersDelete);

  const handleDelete: SubmitHandler<InvalidationForm> = data => {
    if (deleteMutation.isLoading) return;

    deleteMutation.mutate(
      { id, deleted_reason: data.reason },
      {
        onSuccess: () => {
          window.alert('성공');
          router.push('/admin/users');
        },
        onError: () => {
          alert('오류');
        },
      }
    );
  };
  return (
    <Dialog maxWidth="md" open={isOpen} onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit(handleDelete)}>
        <DialogContentLayout>
          <DialogContentText>선택한 회원을 탈퇴하시겠습니까?</DialogContentText>
          <Controller
            name="reason"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextField
                  type="string"
                  placeholder="탈퇴 사유를 입력해주세요."
                  defaultValue={value}
                  onChange={onChange}
                />
                <span>{error?.message}</span>
              </>
            )}
          />
        </DialogContentLayout>
        <DialogActions>
          <Button variant="outlined" onClick={() => setIsOpen(false)} autoFocus>
            취소
          </Button>
          <Button variant="contained" type="submit">
            확인
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default FormDelete;

const schema = object({
  reason: string().required('사유를 입력해주세요.'),
});
