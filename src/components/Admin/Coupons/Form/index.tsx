import React, { useCallback, useState } from 'react';
import * as yup from 'yup';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Button, Grid } from '@mui/material';
import copy from 'copy-to-clipboard';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import TextField from '@/components/Admin/Common/Form/TextField';
import MultiPicker from '@/components/Admin/Common/Datepicker/MultiPicker';
import Snackbar from '@/components/Common/Snackbar';
import { fetchCouponDelete } from '@/api/admin/coupons';
import { coinWithCommas } from '@/utils/coin';
import { CouponDetailData, CouponFormData } from '@/types/admin/coupon';

interface Props {
  data?: CouponDetailData;
  formMutation: UseMutationResult<any, unknown, any, unknown>;
}

function Form({ data, formMutation }: Props) {
  const router = useRouter();
  const isUpdate = !!data;
  const mode = isUpdate ? 'update' : 'create';
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { watch, getValues, setValue, handleSubmit } = useForm<CouponFormData>({
    resolver: yupResolver(getSchema(isUpdate)),
    defaultValues: isUpdate
      ? {
          name: data.name,
          url: data.url,
          started_at: data.started_at,
          ended_at: data.ended_at,
        }
      : {
          name: '',
          price: 0,
          code: '',
          url: '',
          started_at: null,
          ended_at: null,
        },
  });

  const deleteMutate = useMutation(
    () => fetchCouponDelete(Number(router.query.id)),
    {
      onSuccess: ({ message }) => {
        alert(message);
        router.push('/admin/coupons');
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

  const handleFormSubmit = (formData: CouponFormData) => {
    if (formMutation.isLoading) return;

    const check = window.confirm(MESSAGE[mode].confirm);
    if (!check) return;

    const { name, started_at, ended_at, url } = formData;

    const params = {
      ...formData,
      name,
      url: url || null,
      started_at: started_at ? format(started_at, 'yyyy-MM-dd 00:00:00') : null,
      ended_at: ended_at ? format(ended_at, 'yyyy-MM-dd 23:59:59') : null,
    };

    formMutation.mutate(params, {
      onSuccess: ({ message }) => {
        alert(message);
      },
      onError: () => {
        alert('오류');
      },
    });
  };

  const handleCopy = useCallback(() => {
    if (!data?.coupon_url) return;
    copy(data.coupon_url);
    setOpenSnackbar(true);
  }, [data?.coupon_url]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, () => {
        window.alert('필수입력값을 확인해주세요');
      })}
    >
      <Grid container>
        <LabelGroup label="쿠폰 이름" xs={12}>
          <TextField
            fullWidth
            name="name"
            placeholder="쿠폰 이름을 입력하세요."
            defaultValue={getValues('name')}
            onChange={e => {
              const { value } = e.target;
              setValue('name', value);
            }}
          />
        </LabelGroup>

        <LabelGroup label="쿠폰 금액" xs={6}>
          {isUpdate && `${data.price}원`}
          {!isUpdate && (
            <TextField
              fullWidth
              name="price"
              placeholder="쿠폰 금액을 입력하세요."
              defaultValue={getValues('price')}
              onChange={e => {
                const { value } = e.target;
                setValue('price', Number(value));
              }}
            />
          )}
        </LabelGroup>

        <LabelGroup label="적립 코인" xs={6}>
          {coinWithCommas(watch('price') || data?.price || 0)}코인
        </LabelGroup>

        {isUpdate ? (
          <LabelGroup label="쿠폰 주소" xs={12}>
            <Button
              onClick={handleCopy}
              sx={{
                textTransform: 'none',
              }}
            >
              {data.coupon_url}
            </Button>

            <Snackbar
              isOpen={openSnackbar}
              setIsOpen={setOpenSnackbar}
              message="클립보드에 링크가 복사되었어요."
            />
          </LabelGroup>
        ) : (
          <LabelGroup label="쿠폰 코드" xs={12}>
            <TextField
              fullWidth
              placeholder="쿠폰 코드를 입력하세요. 미 입력시 자동 생성됩니다."
              name="code"
              defaultValue={getValues('code')}
              onChange={e => {
                const { value } = e.target;
                setValue('code', value);
              }}
            />
          </LabelGroup>
        )}

        <LabelGroup label="도착 페이지 URL" xs={12}>
          <TextField
            fullWidth
            placeholder="쿠폰을 적용할 url을 입력하세요. 미 입력시 메인으로 이동합니다."
            name="url"
            defaultValue={getValues('url')}
            onChange={e => {
              const { value } = e.target;
              setValue('url', value);
            }}
          />
        </LabelGroup>

        <LabelGroup label="쿠폰 사용기간" xs={12}>
          <MultiPicker
            isButtonPicker={false}
            startDateName="started_at"
            startDate={watch('started_at')}
            setStartDate={({ name, value }) => {
              if (value) setValue(name as keyof CouponFormData, value);
            }}
            endDateName="ended_at"
            endDate={watch('ended_at')}
            setEndDate={({ name, value }) => {
              if (value) setValue(name as keyof CouponFormData, value);
            }}
          />
        </LabelGroup>

        {isUpdate && (
          <>
            <LabelGroup label="최초 등록일" xs={12}>
              {data?.created_at}
            </LabelGroup>
            <LabelGroup label="누적 사용 횟수" xs={12}>
              {data?.used_count}
            </LabelGroup>
          </>
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

const getSchema = (isUpdate: boolean) =>
  isUpdate
    ? yup.object().shape({
        name: yup.string().required(),
        url: yup.string().url().nullable(),
        started_at: yup.date().nullable(),
        ended_at: yup.date().nullable(),
      })
    : yup.object().shape({
        name: yup.string().required(),
        price: yup.number().integer().min(1).required(),
        code: yup.string().nullable(),
        url: yup.string().url().nullable(),
        total_count: yup.number().nullable(),
        started_at: yup.date().nullable(),
        ended_at: yup.date().nullable(),
      });

const MESSAGE = {
  create: {
    confirm: '쿠폰을 등록하시겠습니까?',
    cancel:
      '쿠폰 등록을 취소하고 목록으로 가시겠습니까?\n기입된 정보는 모두 삭제됩니다.',
  },
  update: {
    confirm: '수정된 쿠폰를 저장하시겠습니까?',
    cancel: '쿠폰 수정을 취소하시겠습니까?\n수정된 정보는 모두 삭제됩니다.',
  },
};
