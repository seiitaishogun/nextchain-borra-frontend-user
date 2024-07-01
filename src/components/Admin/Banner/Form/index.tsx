import React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Button, Grid } from '@mui/material';
import { format } from 'date-fns';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import TextField from '@/components/Admin/Common/Form/TextField';
import CheckboxController from '@/components/Admin/Common/Form/Checkbox/CheckboxController';
import MultiPicker from '@/components/Admin/Common/Datepicker/MultiPicker';
import { ContentsFormT } from '@/components/Admin/Contents/Form/types';
import File from '@/components/Admin/Common/Form/File';
import { BannerData } from '@/types/admin/banner';
import { fetchBannerDelete } from '@/api/admin/main/banner';
import { errorAlert } from '@/utils/yupMessage';

interface Props {
  data?: BannerData;
  formMutation: UseMutationResult<any, unknown, any, unknown>;
}

function Form({ data, formMutation }: Props) {
  const router = useRouter();
  const isUpdate = !!data;
  const mode = isUpdate ? 'update' : 'create';

  const { control, getValues, watch, setValue, handleSubmit } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: isUpdate
      ? {
          name: data.name,
          link: data.link,
          is_open: data.is_open,
          started_at: data.started_at,
          ended_at: data.ended_at,
          file_id: data.file_id,
          file: data.file,
        }
      : {
          name: '',
          link: '',
          is_open: false,
          started_at: null,
          ended_at: null,
        },
  });

  const deleteMutate = useMutation(
    () => fetchBannerDelete(Number(router.query.id)),
    {
      onSuccess: ({ message }) => {
        alert(message);
        router.push('/admin/banners');
      },
      onError: () => {
        alert('오류');
      },
    }
  );

  const handleDelete = () => {
    if (deleteMutate.isLoading) return;
    const check = window.confirm('삭제하시겠습니까?');
    if (check) deleteMutate.mutate();
  };

  const handleCreate = (formData: any) => {
    if (formMutation.isLoading) return;
    const check = window.confirm(MESSAGE[mode].confirm);
    if (!check) return;

    const { started_at, ended_at } = formData;
    const params = {
      ...formData,
      started_at: format(started_at, 'yyyy-MM-dd 00:00:00'),
      ended_at: format(ended_at, 'yyyy-MM-dd 23:59:59'),
    };

    formMutation.mutate(params, {
      onSuccess: ({ message }) => {
        alert(message);
        router.push('/admin/banners');
      },
      onError: () => {
        alert('오류');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleCreate, errorAlert)}>
      <Grid container>
        <LabelGroup label="배너명">
          <TextField
            fullWidth
            placeholder="배너명을 입력해주세요."
            name="name"
            defaultValue={getValues('name')}
            onChange={e => {
              const { value } = e.target;
              setValue('name', value);
            }}
          />
        </LabelGroup>

        <LabelGroup label="배너 링크">
          <TextField
            fullWidth
            placeholder="배너 링크를 입력해주세요."
            name="link"
            defaultValue={getValues('link')}
            onChange={e => {
              const { value } = e.target;
              setValue('link', value);
            }}
          />
        </LabelGroup>

        <LabelGroup label="공개여부">
          <CheckboxController
            name="is_open"
            control={control}
            options={[{ label: '', value: 0 }]}
          />
        </LabelGroup>

        <LabelGroup label="노출 기간" id="date">
          <MultiPicker
            isButtonPicker={false}
            startDate={watch('started_at')}
            startDateName="started_at"
            setStartDate={({ name, value }) =>
              setValue(name as keyof ContentsFormT, value)
            }
            endDate={watch('ended_at')}
            endDateName="ended_at"
            setEndDate={({ name, value }) =>
              setValue(name as keyof ContentsFormT, value)
            }
          />
        </LabelGroup>

        <LabelGroup xs={12} id="file_id" label="배너">
          <File
            name="file_id"
            isPreview
            file={getValues('file')}
            handleChange={file => {
              setValue('file_id', file?.id);
            }}
          />
        </LabelGroup>

        <Grid
          item
          xs={12}
          sx={{
            mt: 2,
          }}
        >
          <Button type="submit" variant="contained">
            {isUpdate ? '수정' : '등록'}
          </Button>

          {isUpdate && (
            <Button
              type="button"
              variant="contained"
              color="error"
              sx={{
                ml: 2,
              }}
              onClick={handleDelete}
            >
              삭제
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;

const schema = yup.object({
  file_id: yup.number().required(),
  name: yup.string().required(),
  link: yup.string().url().required(),
  is_open: yup.boolean().required(),
  started_at: yup.date().required(),
  ended_at: yup.date().required(),
});

const MESSAGE = {
  create: {
    confirm: '메인 배너를 등록하시겠습니까?',
  },
  update: {
    confirm: '메인 배너를 수정하시겠습니까?',
  },
};
