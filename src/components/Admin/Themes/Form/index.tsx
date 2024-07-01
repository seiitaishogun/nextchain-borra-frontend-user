import { useRouter } from 'next/router';
import styled from 'styled-components';
import { UseMutationResult } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import Radio from '@/components/Admin/Common/Form/Radio';
import Textarea from '@/components/Admin/Common/Form/Textarea';
import File from '@/components/Admin/Common/Form/File';
import TextField from '@/components/Admin/Common/Form/TextField';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import SelectController from '@/components/Admin/Common/Form/Select/SelectController';
import { ThemeFormT } from '@/components/Admin/Themes/Form/types';
import { DISPLAY_OPTIONS } from '@/constants/admin/contents/search';
import useTags from '@/hooks/admin/useTags';

interface Props {
  data?: ThemeFormT;
  formMutation: UseMutationResult<any, unknown, any, unknown>; // TODO: 타입 확인 필요
}

const Layout = styled.form`
  margin: 20px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(224, 224, 224, 1);
  background-color: rgba(255, 255, 255, 1);
`;

function Form({ data, formMutation }: Props) {
  const router = useRouter();
  const mode = data ? 'update' : 'create';
  const { handleSubmit, control, setValue, getValues } = useForm<ThemeFormT>({
    resolver: yupResolver(schema),
    defaultValues: data || {
      tag_id: '',
      is_open: 1,
      name: '',
      description: '',
    },
  });
  const tags = useTags();

  const handleUpdate: SubmitHandler<ThemeFormT> = inputData => {
    if (formMutation.isLoading) return;

    const check = window.confirm(MESSAGE[mode].confirm);
    if (check) {
      const { file, ...params } = inputData;

      formMutation.mutate(params, {
        onSuccess: ({ message }) => {
          alert(message);
          router.push('/admin/themes');
        },
        onError: () => {
          alert('오류');
        },
      });
    }
  };

  return (
    <Layout
      onSubmit={handleSubmit(handleUpdate, () => {
        window.alert('필수입력값을 확인해주세요.');
      })}
    >
      <Grid container spacing={0}>
        <LabelGroup label="해시태그" id="tag_id">
          <SelectController
            name="tag_id"
            control={control}
            isDefault
            defaultConfig={{
              text: '해시태그선택',
              value: '',
            }}
            options={tags}
          />
        </LabelGroup>

        <LabelGroup label="상태" id="is_open">
          <Radio
            labels={DISPLAY_OPTIONS}
            name="is_open"
            defaultValue={getValues('is_open')}
            onChange={e => {
              const { name, value } = e.target;
              setValue(name as keyof ThemeFormT, Number(value));
            }}
          />
        </LabelGroup>

        <LabelGroup label="테마명" xs={12}>
          <TextField
            fullWidth
            name="name"
            defaultValue={getValues('name')}
            onChange={e => {
              const { name, value } = e.target;
              setValue(name as keyof ThemeFormT, value);
            }}
          />
        </LabelGroup>

        <LabelGroup xs={100} id="description" label="테마설명">
          <Textarea
            name="description"
            defaultValue={getValues('description')}
            onChange={(e: any) => {
              const { name, value } = e.target;
              setValue(name as keyof ThemeFormT, value);
            }}
          />
        </LabelGroup>

        <LabelGroup xs={100} id="file_id" label="목록 아이콘">
          <File
            name="file_id"
            isPreview
            file={getValues('file')}
            handleChange={file => setValue('file_id', file?.id)}
          />
        </LabelGroup>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          size="large"
          color="warning"
          sx={{
            mr: 1,
          }}
          onClick={e => {
            e.preventDefault();
            if (window.confirm(MESSAGE[mode].cancel)) {
              router.push('/admin/themes');
            }
          }}
        >
          취소
        </Button>
        <Button variant="contained" size="large" type="submit">
          저장
        </Button>
      </Box>
    </Layout>
  );
}

export default Form;

const schema = yup.object({
  tag_id: yup.number().min(1).required(),
  name: yup.string().required(),
  is_open: yup.boolean().required(),
  description: yup.string().required(),
  file_id: yup.number().required(),
});

const MESSAGE = {
  create: {
    confirm: '신규 테마를 저장하시겠습니까?',
    cancel:
      '테마 등록을 취소하고 목록으로 가시겠습니까?\n기입된 정보는 모두 삭제됩니다.',
  },
  update: {
    confirm: '수정된 정보를 저장하시겠습니까?',
    cancel: '테마 수정을 취소하시겠습니까?\n수정된 정보는 모두 삭제됩니다.',
  },
};
