import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Detail from '@/components/Counselor/Detail';
import HistoryHeader from '@/components/Common/Layout/HistoryHeader';
import { fetchCounselor } from '@/api/counselor/detail';
import { CounselorDetailT } from '@/types/counselor/detail';
import useContentLike from '@/hooks/contents/useContentLike';
import { LikeType } from '@/types/like';

function CounselorDetail() {
  const searchParams = useSearchParams();
  const counselor_id = Number(searchParams.get('id')) || 0;
  const { data, isFetched } = useQuery(
    ['counselor', counselor_id],
    () => fetchCounselor({ counselor_id }),
    {
      enabled: !!counselor_id,
      initialData: {
        data: {} as CounselorDetailT,
      },
      select: res => res.data,
    }
  );
  const isLike = useContentLike({ type: LikeType.Counselor, id: counselor_id });

  return (
    <section>
      <HistoryHeader name={data?.name || ''} />
      {isFetched && <Detail data={data} isLike={isLike} />}
    </section>
  );
}

export default CounselorDetail;
