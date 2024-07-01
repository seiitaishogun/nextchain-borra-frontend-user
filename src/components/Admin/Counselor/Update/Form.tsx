import { Button, Grid } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { DeepPartial, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseMutationResult } from '@tanstack/react-query';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import File from '@/components/Admin/Common/Form/File';
import { CounselorT } from '@/types/admin/counselor/detail';
import { errorAlert } from '@/utils/yupMessage';
import {
  CounselorUpdateRequest,
  CounselorUpdateResponse,
} from '@/types/admin/counselor';
import { updateSchema } from '@/constants/admin/counselor/form';

interface Props {
  data: CounselorT;
  defaultValues: DeepPartial<CounselorUpdateRequest & FieldValues>;
  formMutation: UseMutationResult<
    CounselorUpdateResponse,
    unknown,
    CounselorUpdateRequest,
    unknown
  >;
}

function CounselorUpdateForm({ data, defaultValues, formMutation }: Props) {
  const { setValue, handleSubmit } = useForm<
    CounselorUpdateRequest & FieldValues
  >({
    resolver: yupResolver(updateSchema) as any,
    defaultValues,
  });

  const handleFormSubmit = (formData: CounselorUpdateRequest) => {
    const confirm = window.confirm('수정하시겠습니까?');
    if (!confirm || formMutation.isLoading) return;
    formMutation.mutate({
      ...formData,
      banner_id: formData.banner_id || null,
      thumbnail_id: formData.thumbnail_id || null,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, errorAlert)}>
      <Grid container>
        <LabelGroup label="상담사 명" xs={12}>
          {data.name}
        </LabelGroup>
        <LabelGroup xs={12} id="banner_id" label="상단배너">
          <File
            name="banner_id"
            isPreview
            file={data.banner}
            handleChange={file => {
              setValue('banner_id', file?.id || null);
            }}
          />
        </LabelGroup>
        <LabelGroup xs={12} id="thumbnail_id" label="썸네일">
          <File
            name="thumbnail_id"
            isPreview
            file={data.thumbnail}
            handleChange={file => setValue('thumbnail_id', file?.id || null)}
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
            수정
          </Button>

          <Link
            href="/admin/counselor"
            style={{
              display: 'inline-block',
              marginLeft: '10px',
            }}
          >
            <Button variant="contained" color="secondary">
              목록
            </Button>
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default CounselorUpdateForm;
