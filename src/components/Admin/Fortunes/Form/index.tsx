import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Radio from '@/components/Admin/Common/Form/Radio';
import TextField from '@/components/Admin/Common/Form/TextField';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import { CreateFormT } from '@/components/Admin/Fortunes/Form/types';
import SelectController from '@/components/Admin/Common/Form/Select/SelectController';
import CheckboxController from '@/components/Admin/Common/Form/Checkbox/CheckboxController';
import File from '@/components/Admin/Common/Form/File';
import LinkedContents from '@/components/Admin/Fortunes/LinkedContents';
import { FormLayout } from '@/components/Admin/Fortunes/Form/Form.styled';
import {
  fetchFortunesDelete,
  fetchFortunesExcelDownload,
  fetchFortunesResource,
} from '@/api/admin/fortunes';
import { DetailT } from '@/types/admin/fortunes/detail';
import { StatusE } from '@/types/admin/fortunes';
import { FORTUNE_STATUS_OPTIONS } from '@/constants/admin/fortunes';
import { ContentsTypeE } from '@/types/content';

interface Props {
  data?: DetailT;
  formMutation: UseMutationResult<any, unknown, any, unknown>;
}

function Form({ data, formMutation }: Props) {
  const router = useRouter();
  const isUpdate = !!data;
  const { control, setValue, getValues, watch, handleSubmit, reset } =
    useForm<CreateFormT>({
      resolver: yupResolver(schema),
      defaultValues: isUpdate
        ? {
            template_id: data.template.id,
            type_id: data.type.id,
            status: data.status ? Number(data.status) : '',
            is_open: data.is_open,
            condition1: data?.condition1?.id || 0,
            condition2: data?.condition2?.id || 0,
            condition3: data?.condition3?.id || 0,
            condition4: data?.condition4?.id || 0,
            name: data.name,
            excel: data.excel?.name,
            excel_id: data.excel?.id,
            excel_name: data.excel?.name,
          }
        : {
            template_id: '' || 1,
            type_id: '',
            status: '',
            is_open: true,
            condition1: 0,
            condition2: 0,
            condition3: 0,
            condition4: 0,
            name: '',
            excel: '',
            excel_id: 0,
            excel_name: '',
          },
    });

  const { data: resourceData, isFetched } = useQuery(
    ['adminCreateFortunes'],
    fetchFortunesResource
  );
  const excelDownloadMutate = useMutation(fetchFortunesExcelDownload);
  const deleteMutate = useMutation(
    () => fetchFortunesDelete(Number(router.query.id)),
    {
      onSuccess: ({ message }) => {
        alert(message);
        router.push('/admin/fortunes');
      },
      onError: () => {
        alert('오류');
      },
    }
  );

  useEffect(() => {
    if (!isUpdate) {
      reset({
        template_id: 1,
        condition1: 0,
        condition2: 0,
        condition3: 0,
        condition4: 0,
      });
    }
  }, []);

  useEffect(() => {
    const curStatus = getValues('status');

    // 궁합일시 condition3 == condition1, condition4 == condition2
    if (curStatus === StatusE.Couple) {
      setValue('condition3', watch('condition1'));
      setValue('condition4', watch('condition2'));
    } else if (curStatus === StatusE.Card) {
      setValue('condition1', 75);
    } else if (curStatus === StatusE.CardStraight) {
      setValue('condition1', 130);
    }
  }, [getValues('status')]);

  const getCategoryOptions = (arr: Array<any>) =>
    arr.map(item => ({
      value: item.id,
      label: item.description,
    }));

  const getConditionOptions = (conditionOptions: Array<any>) => {
    const type_id = watch('type_id');

    const selected = [
      Number(watch('condition1')),
      Number(watch('condition2')),
      Number(watch('condition3')),
      Number(watch('condition4')),
    ].filter(item => item);

    return conditionOptions
      .filter(c => c.type_id === type_id || !c.type_id)
      .map(c => ({
        label: c.name,
        value: c.id,
        disabled:
          selected.includes(c.id) && !(watch('status') === StatusE.Couple),
      }));
  };

  // TODO 데이터 다운로드 조건 validation 추가
  const handleDownload = () => {
    const check = window.confirm(
      '선택하신 조건에 해당하는 양식을 다운로드 하시겠습니까?'
    );

    if (!getValues('name')) {
      window.alert('소제목을 입력해주세요.');
      return;
    }

    if (
      !(
        Number(getValues('condition1')) ||
        Number(getValues('condition2')) ||
        Number(getValues('condition3')) ||
        Number(getValues('condition4'))
      )
    ) {
      window.alert('조건을 선택해주세요.');
      return;
    }

    if (check) {
      const condition_ids = [
        getValues('condition1'),
        getValues('condition2'),
        getValues('condition3'),
        getValues('condition4'),
      ];
      const params = {
        template_id: getValues('template_id'),
        type_id: getValues('type_id'),
        status: getValues('status'),
        condition_ids,
        name: getValues('name'),
        is_open: getValues('is_open') ? 1 : 0,
      };

      excelDownloadMutate.mutate(params, {
        onSuccess: ({ data: res, headers }: any) => {
          const blob = new Blob([`\ufeff${res}`], {
            type: 'text/csv;charset=utf-8',
          });
          const filename =
            headers['content-disposition'].split("filename*=utf-8''")[1];
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = decodeURIComponent(filename);
          link.click();
        },
        onError: () => {
          alert('오류');
        },
      });
    }
  };

  const handleCreate = ({
    template_id,
    type_id,
    status,
    is_open,
    condition1,
    condition2,
    condition3,
    condition4,
    name,
    excel_id,
    excel_name,
  }: CreateFormT) => {
    const condition_ids = [condition1, condition2, condition3, condition4];
    const params = {
      template_id,
      type_id,
      status,
      is_open: is_open ? 1 : 0,
      condition_ids,
      condition1: condition_ids[0] || null,
      condition2: condition_ids[1] || null,
      condition3: condition_ids[2] || null,
      condition4: condition_ids[3] || null,
      name,
      excel_id: excel_id || null,
      excel_name: excel_name || null,
    };

    formMutation.mutate(params, {
      onSuccess: ({ message }) => {
        alert(message);
        router.push('/admin/fortunes');
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

  const checkStatusDisabled = useCallback(
    (enabledType: ContentsTypeE[]) => {
      if (!isFetched) return true;

      const selectedType = resourceData.data.types.find(
        (t: any) => t?.id === getValues('type_id')
      );
      if (!selectedType) return true;

      const checkValue = selectedType?.name || '';
      return !enabledType.some(value => value === checkValue);
    },
    [getValues('type_id'), resourceData?.data?.types, isFetched]
  );

  const conditions =
    isFetched && resourceData?.data.conditions
      ? getConditionOptions(resourceData.data.conditions)
      : [];

  const types =
    isFetched && resourceData?.data.types
      ? getCategoryOptions(resourceData.data.types)
      : [];

  const templates =
    isFetched && resourceData?.data.templates
      ? getCategoryOptions(resourceData.data.templates)
      : [];

  const statusOptions = useMemo(
    () =>
      FORTUNE_STATUS_OPTIONS.map(item => ({
        label: item.label,
        value: item.value,
        disabled: checkStatusDisabled(item.enabledType),
      })),
    [checkStatusDisabled]
  );

  return (
    <FormLayout
      onSubmit={handleSubmit(handleCreate, () => {
        window.alert('필수입력값을 확인해주세요.');
      })}
    >
      <Grid container>
        <LabelGroup label="템플릿 선택" xs={12}>
          {!isUpdate && (
            <Radio
              name="template_id"
              defaultValue={getValues('template_id')}
              labels={templates}
              onChange={e => {
                const { value } = e.target;
                setValue('template_id', Number(value));
              }}
            />
          )}

          {isUpdate && data?.template.name}
        </LabelGroup>

        <LabelGroup label="분류" xs={4}>
          {!isUpdate && (
            <SelectController
              name="type_id"
              control={control}
              isDefault
              defaultConfig={{ value: '', text: '분류선택' }}
              options={types}
            />
          )}

          {isUpdate && data?.type.description}
        </LabelGroup>

        <LabelGroup label="상태" xs={4}>
          {!isUpdate && (
            <SelectController
              name="status"
              control={control}
              isDefault
              defaultConfig={{ value: '', text: '상태선택' }}
              options={statusOptions}
            />
          )}

          {isUpdate &&
            statusOptions.find(item => item.value === Number(data?.status))
              ?.label}
        </LabelGroup>

        <LabelGroup label="사용여부" xs={4}>
          <CheckboxController
            name="is_open"
            control={control}
            options={[{ label: '', value: 0 }]}
          />
        </LabelGroup>

        <LabelGroup label="소제목" xs={12}>
          <TextField
            fullWidth
            placeholder="운세 풀이 데이터에 대한 설명을 입력해주세요."
            defaultValue={watch('name')}
            onChange={e => {
              const { value } = e.target;
              setValue('name', value);
            }}
          />
        </LabelGroup>

        <LabelGroup label="조건 선택" xs={12}>
          <SelectController
            name="condition1"
            control={control}
            isDefault
            defaultConfig={{ text: '조건선택', value: '0' }}
            options={conditions}
            disabled={isUpdate}
          />
          <SelectController
            name="condition2"
            control={control}
            isDefault
            defaultConfig={{ text: '조건선택', value: '0' }}
            options={conditions}
            disabled={isUpdate}
          />
          <SelectController
            name="condition3"
            control={control}
            isDefault
            defaultConfig={{ text: '조건선택', value: '0' }}
            options={conditions}
            disabled={isUpdate || watch('status') === StatusE.Couple}
          />
          <SelectController
            name="condition4"
            control={control}
            isDefault
            defaultConfig={{ text: '조건선택', value: '0' }}
            options={conditions}
            disabled={isUpdate || watch('status') === StatusE.Couple}
          />
        </LabelGroup>

        <LabelGroup label="데이터 양식 다운로드" xs={12}>
          <Button variant="outlined" onClick={handleDownload}>
            다운로드
          </Button>
        </LabelGroup>

        <LabelGroup label="데이터 업로드" xs={12}>
          <File
            name="banner_id"
            accept=".csv, .xls, .xlsx"
            file={isUpdate ? data?.excel : undefined}
            handleChange={file => {
              setValue('excel_name', file?.name);
              setValue('excel_id', file?.id);
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

      {data?.contents && <LinkedContents contents={data?.contents || []} />}
    </FormLayout>
  );
}

export default Form;

const schema = yup.object({
  template_id: yup.number(),
  type_id: yup.number(),
  is_open: yup.boolean(),
  status: yup.number(),
  condition1: yup.number(),
  condition2: yup.number(),
  condition3: yup.number(),
  condition4: yup.number(),
  name: yup.string().max(120, '120자 제한').required(),
  excel: yup.string().nullable(),
  excel_name: yup.string().nullable(),
  excel_id: yup.number().nullable(),
});
