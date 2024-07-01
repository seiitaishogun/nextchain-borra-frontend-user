import React, { ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Admin/Layout';
import CounselorUpdateForm from '@/components/Admin/Counselor/Update/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchCounselor, fetchCounselorUpdate } from '@/api/admin/counselor';
import {
  CounselorResponse,
  CounselorUpdateRequest,
} from '@/types/admin/counselor';

function AdminCounselorDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const counselor_id = searchParams.get('id') || '';
  const queryClient = useQueryClient();
  const { data, isSuccess, isFetched } = useQuery(
    ['counselor', counselor_id],
    () =>
      fetchCounselor({
        counselor_id,
      }),
    {
      enabled: !!counselor_id,
      initialData: {
        data: {
          thumbnail_id: null,
          banner_id: null,
        },
      } as CounselorResponse,
      select: res => {
        const newData = res.data;

        return {
          ...newData,
          thumbnail_id: newData.thumbnail?.id || null,
          banner_id: newData.banner?.id || null,
        };
      },
      onError: () => {
        alert('존재하지 않는 상담사입니다.');
        router.back();
      },
    }
  );
  const updateMutate = useMutation(
    (params: CounselorUpdateRequest) =>
      fetchCounselorUpdate({
        ...params,
        counselor_id: Number(counselor_id),
      }),
    {
      onSuccess: ({ message }) => {
        queryClient.refetchQueries(['counselor', counselor_id]);
        alert(message);
      },
    }
  );

  const defaultValues = {
    counselor_id,
    thumbnail_id: data?.thumbnail_id || null,
    banner_id: data?.banner_id || null,
  };

  return (
    <PageLayout>
      <h1>상담사 상세 조회</h1>

      {isFetched && isSuccess && (
        <CounselorUpdateForm
          data={data}
          defaultValues={defaultValues}
          formMutation={updateMutate}
        />
      )}
    </PageLayout>
  );
}

AdminCounselorDetail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminCounselorDetail;
