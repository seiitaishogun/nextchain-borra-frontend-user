import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import HistoryHeader from '@/components/Common/Layout/HistoryHeader';
import Detail from '@/components/Posts/Detail';
import { fetchPostsDetail } from '@/api/posts';

function PostDetail() {
  const router = useRouter();
  const { id: queryId } = router.query;
  const id = Number(queryId);

  const { data, isLoading } = useQuery(
    ['postDetail', id],
    () => fetchPostsDetail(id),
    {
      enabled: !!id,
    }
  );

  return (
    <div>
      <HistoryHeader name="공지사항" />
      {!isLoading && <Detail data={data?.data || ''} />}
    </div>
  );
}

export default PostDetail;
