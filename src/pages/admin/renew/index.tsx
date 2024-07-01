import React, { ReactElement, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import AdminLayout from '@/components/Admin/Layout';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchRenewCache, fetchRenewCounselor } from '@/api/renew';

function Renew() {
  const [key, setKey] = useState<string>('');
  const renewCacheMutate = useMutation(['renewCache'], fetchRenewCache);
  const renewCounselorMutate = useMutation(
    ['renewCounselor'],
    fetchRenewCounselor
  );

  const handleRenewCacheClear = () => {
    if (renewCacheMutate.isLoading) return;

    if (!key) {
      alert('사용자 키를 입력해주세요.');
      return;
    }

    const check = window.confirm('정말로 캐시를 초기화 하시겠습니까?');
    if (check) {
      renewCacheMutate.mutate(
        { key },
        {
          onSuccess: () => {
            alert('캐시 초기화가 완료되었습니다.');
          },
          onError: () => {
            alert('캐시 초기화에 실패하였습니다.');
          },
        }
      );
    }
  };

  const handleRenewCounselorClear = () => {
    if (renewCounselorMutate.isLoading) return;

    const check = window.confirm('정말로 상담사 정보를 갱신 하시겠습니까?');
    if (check) {
      renewCounselorMutate.mutate(undefined, {
        onSuccess: () => {
          alert('상담사 정보 갱신이 완료되었습니다.');
        },
        onError: () => {
          alert('상담사 정보 갱신에 실패하였습니다.');
        },
      });
    }
  };

  return (
    <PageLayout>
      <h1>캐시 초기화</h1>

      <Grid container>
        <LabelGroup label="사용자 캐시 초기화" xs={6}>
          <TextField
            sx={{
              mr: 2,
            }}
            defaultValue={key}
            onChange={e => setKey(e.target.value)}
          />
          <Button
            type="button"
            variant="contained"
            onClick={handleRenewCacheClear}
          >
            초기화
          </Button>
        </LabelGroup>

        <LabelGroup label="상담사 정보 갱신" xs={6}>
          <Button
            type="button"
            variant="contained"
            onClick={handleRenewCounselorClear}
          >
            갱신
          </Button>
        </LabelGroup>
      </Grid>
    </PageLayout>
  );
}

Renew.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Renew;
