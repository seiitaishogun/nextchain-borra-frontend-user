import React from 'react';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormSetValue,
} from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import TextField from '@/components/Admin/Common/Form/TextField';
import { DialogContentLayout } from '@/components/Admin/Users/DetailFilter/DetailFilter.styled';
import { fetchUsersUpdateCoin } from '@/api/admin/users';

interface InvalidationForm {
  reason: string;
}

interface Props {
  id: number;
  isCharge: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  countCoin: number;
  setValue: UseFormSetValue<{ coin: number | '' }>;
}

function FormCharge({
  id,
  isCharge,
  isOpen,
  setIsOpen,
  countCoin,
  setValue,
}: Props) {
  const queryClient = useQueryClient();
  const { handleSubmit, control } = useForm<InvalidationForm>({
    resolver: yupResolver(schema),
  });

  const updateMutation = useMutation(fetchUsersUpdateCoin);

  const handleCharge: SubmitHandler<InvalidationForm> = data => {
    if (updateMutation.isLoading) return;
    updateMutation.mutate(
      {
        id,
        coin: Number(countCoin),
        type: isCharge,
        reason: data.reason,
      },
      {
        onSuccess: () => {
          window.alert('성공');
          setIsOpen(false);
          setValue('coin', '');
          queryClient.invalidateQueries(['adminUserDetail', id]);
        },
        onError: () => {
          window.alert('오류');
        },
      }
    );
  };
  return (
    <Dialog maxWidth="md" open={isOpen} onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit(handleCharge)}>
        <DialogContentLayout>
          <DialogContentText>적립/차감 사유를 입력해주세요.</DialogContentText>
          <Controller
            name="reason"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextField
                  type="string"
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

export default FormCharge;

const schema = object({
  reason: string().required('사유를 입력해주세요.'),
});
