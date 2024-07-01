import React, { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Box, Button, Grid } from '@mui/material';
import Link from 'next/link';
import copy from 'copy-to-clipboard';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import TextField from '@/components/Admin/Common/Form/TextField';
import Radio from '@/components/Admin/Common/Form/Radio';
import ContentSearch from '@/components/Admin/Advertises/Form/ContentSearch';
import Snackbar from '@/components/Common/Snackbar';
import { fetchAdvertisesDelete } from '@/api/admin/advertises';
import { AdvertisesData, TYPE_OPTIONS } from '@/types/admin/advertises';

interface Props {
  data?: AdvertisesData;
  formMutation: UseMutationResult<any, unknown, any, unknown>;
}

function Form({ data, formMutation }: Props) {
  const router = useRouter();
  const [openContent, setOpenContent] = useState(false);
  const [linkContent, setLinkContent] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isUpdate = !!data;
  const mode = isUpdate ? 'update' : 'create';

  const { getValues, watch, setValue, handleSubmit } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: isUpdate
      ? {
          content_id: data.content_id,
          code: data.code,
          type: data.type,
        }
      : {
          content_id: null,
          code: '',
          type: '',
        },
  });

  const deleteMutate = useMutation(
    () => fetchAdvertisesDelete(Number(router.query.id)),
    {
      onSuccess: ({ message }) => {
        alert(message);
        router.push('/admin/advertises');
      },
      onError: () => {
        alert('오류');
      },
    }
  );

  useEffect(() => {
    if (!data) return;
    setLinkContent(data?.content);
  }, [data]);

  const handleDelete = () => {
    if (deleteMutate.isLoading) return;
    const check = window.confirm('삭제하시겠습니까?');
    if (check) deleteMutate.mutate();
  };

  const handleCreate = (params: any) => {
    // TODO: 타입 확인 필요 CreateFormT
    if (formMutation.isLoading) return;
    const check = window.confirm(MESSAGE[mode].confirm);
    if (!check) return;

    formMutation.mutate(params, {
      onSuccess: ({ message }) => {
        alert(message);
      },
      onError: () => {
        alert('오류');
      },
    });
  };

  const handleContentSelect = (content: any) => {
    setValue('content_id', content?.id || null);
    setLinkContent(content || null);
  };

  const handleCopy = useCallback(() => {
    if (!data?.url) return;
    copy(data.url);
    setOpenSnackbar(true);
  }, [data?.url]);

  return (
    <form
      onSubmit={handleSubmit(handleCreate, () => {
        window.alert('필수입력값을 확인해주세요');
      })}
    >
      <Grid container>
        <LabelGroup label="콘텐츠" xs={12}>
          <Box mr={3}>
            {linkContent && (
              <Link href={`/admin/contents/${linkContent.id}`} legacyBehavior>
                {linkContent.name}
              </Link>
            )}
            {!linkContent && <span>콘텐츠를 선택해주세요.</span>}
          </Box>

          <Button type="button" onClick={() => setOpenContent(true)}>
            콘텐츠 검색
          </Button>

          <ContentSearch
            open={openContent}
            setOpen={setOpenContent}
            selected={linkContent}
            handleSelected={handleContentSelect}
          />
        </LabelGroup>

        <LabelGroup label="제휴사 코드" xs={12}>
          <TextField
            fullWidth
            placeholder="제휴사 코드를 입력해주세요."
            name="code"
            defaultValue={watch('code')}
            onChange={e => {
              const { value } = e.target;
              setValue('code', value);
            }}
          />
        </LabelGroup>

        <LabelGroup label="제휴사" id="type" xs={12}>
          <Radio
            labels={TYPE_OPTIONS}
            name="is_open"
            defaultValue={getValues('type')}
            onChange={e => {
              const { value } = e.target;
              setValue('type', value);
            }}
          />
        </LabelGroup>

        {isUpdate && (
          <LabelGroup label="URL" id="url" xs={12}>
            <Button
              type="button"
              onClick={handleCopy}
              sx={{
                textTransform: 'none',
              }}
            >
              {data?.url || ''}
            </Button>
            <Snackbar
              isOpen={openSnackbar}
              setIsOpen={setOpenSnackbar}
              message="클립보드에 링크가 복사되었어요."
            />
          </LabelGroup>
        )}

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
  content_id: yup.number().required(),
  code: yup.string().required(),
  type: yup.string().required(),
});

const MESSAGE = {
  create: {
    confirm: '광고 제휴를 등록하시겠습니까?',
  },
  update: {
    confirm: '광고 제휴를 수정하시겠습니까?',
  },
};
