import { Button, Grid } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import SelectController from '@/components/Admin/Common/Form/Select/SelectController';
import TextField from '@/components/Admin/Common/Form/TextField';
import CheckboxController from '@/components/Admin/Common/Form/Checkbox/CheckboxController';
import { CreateFormT } from '@/components/Admin/Posts/Form/types';
import { SEARCH_TYPE_OPTIONS } from '@/constants/admin/posts/search';
import { fetchPostDelete } from '@/api/admin/posts';

const Editor = dynamic(() => import('@/components/Common/Editor/Editor'), {
  ssr: false,
});

const EditorLayout = styled.div`
  width: 100%;
`;

interface Props {
  data?: any;
  formMutation: UseMutationResult<any, unknown, any, unknown>;
}

function Form({ data, formMutation }: Props) {
  const router = useRouter();

  const isUpdate = !!data;

  const { control, setValue, watch, handleSubmit } = useForm<CreateFormT>({
    resolver: yupResolver(schema),
    defaultValues: isUpdate
      ? {
          category: data.category,
          contents: data.contents,
          is_open: data.is_open,
          name: data.name,
          type: data.type,
        }
      : {
          category: null,
          contents: '',
          is_open: false,
          name: '',
          type: '',
        },
  });

  const deleteMutate = useMutation(
    () => fetchPostDelete(Number(router.query.id)),
    {
      onSuccess: ({ message }) => {
        alert(message);
        router.push('/admin/posts');
      },
      onError: () => {
        alert('오류');
      },
    }
  );

  const handleCreate = ({ contents, id, is_open, name, type }: CreateFormT) => {
    const params = {
      category: null,
      contents,
      id,
      is_open: is_open ? 1 : 0,
      name,
      type,
    };

    formMutation.mutate(params, {
      onSuccess: ({ message }) => {
        alert(message);
        router.push('/admin/posts');
      },
      onError: () => {
        alert('오류');
      },
    });
  };

  const handleDelete = () => {
    if (deleteMutate.isLoading) return;
    const check = window.confirm('삭제하시겠습니까?');
    if (check) deleteMutate.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreate, () => {
        window.alert('필수입력값을 확인해주세요');
      })}
    >
      <Grid container>
        <LabelGroup label="분류" xs={6}>
          {!isUpdate && (
            <SelectController
              name="type"
              control={control}
              isDefault
              defaultConfig={{ value: '', text: '분류선택' }}
              options={SEARCH_TYPE_OPTIONS}
            />
          )}
          {isUpdate && data.type}
        </LabelGroup>

        <LabelGroup label="공개여부" xs={6}>
          <CheckboxController
            name="is_open"
            control={control}
            options={[{ label: '', value: 0 }]}
          />
        </LabelGroup>

        <LabelGroup label="제목" xs={12}>
          <TextField
            fullWidth
            placeholder="제목을 입력해주세요."
            name="name"
            defaultValue={watch('name')}
            onChange={e => {
              const { value } = e.target;
              setValue('name', value);
            }}
          />
        </LabelGroup>

        <LabelGroup xs={12} id="contents" label="내용">
          <EditorLayout>
            <Editor
              name="contents"
              value={watch('contents')}
              onChange={e => {
                setValue('contents', e);
              }}
            />
          </EditorLayout>
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
  category: yup.string().nullable(),
  contents: yup.string(),
  is_open: yup.boolean(),
  name: yup.string(),
  type: yup.string(),
});
