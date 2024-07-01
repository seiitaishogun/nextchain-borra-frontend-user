import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '@/components/Admin/Layout';
import Form from '@/components/Admin/Contents/Form';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchContentsDetail, fetchContentsUpdate } from '@/api/admin/contents';
import { Tag } from '@/types/tags';
import { getSplitDate } from '@/utils/date';

function Detail() {
  // FIXME tag_id 변경시 터짐
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const { data: detailData } = useQuery(
    ['adminContentDetail', id],
    () => fetchContentsDetail(Number(id)),
    {
      enabled: !!id,
      select: data => {
        const { content: detailContent } = data.data;
        const advertise = data.data?.advertise;
        const newContent = {
          ...detailContent,
          tags: detailContent.tags.map((tag: Tag) => tag.id),
          category_id: detailContent.category.id,
          type_id: detailContent.type.id,
          is_wait_free_time: detailContent.is_wait_free_time ? 1 : 0,
          advertise_code: advertise?.code || '',
          advertise,
        };

        if (newContent.discount_started_at) {
          const { year, month, day, hour, minute, second } = getSplitDate(
            newContent.discount_started_at || null
          );
          newContent.discount_started_at = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute),
            Number(second)
          );
        }

        if (newContent.discount_ended_at) {
          const { year, month, day, hour, minute, second } = getSplitDate(
            newContent.discount_ended_at || null
          );
          newContent.discount_ended_at = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute),
            Number(second)
          );
        }

        if (newContent.visible_started_at) {
          const { year, month, day, hour, minute, second } = getSplitDate(
            newContent.visible_started_at || null
          );
          newContent.visible_started_at = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute),
            Number(second)
          );
        }

        if (newContent.visible_ended_at) {
          const { year, month, day, hour, minute, second } = getSplitDate(
            newContent.visible_ended_at || null
          );
          newContent.visible_ended_at = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute),
            Number(second)
          );
        }

        if (newContent.thumbnail) {
          newContent.thumbnail_id = newContent.thumbnail.id;
        }
        if (newContent.banner) {
          newContent.banner_id = newContent.banner.id;
        }
        if (newContent.banner_text) {
          newContent.banner_text = newContent.banner_text.id;
        }
        if (newContent.thumbnail_large) {
          newContent.thumbnail_large_id = newContent.thumbnail_large.id;
        }

        return {
          ...data,
          content: newContent,
        };
      },
    }
  );

  const formMutate = useMutation(fetchContentsUpdate, {
    onSuccess: ({ message, content_id }) => {
      queryClient.refetchQueries(['adminContentDetail', id]);
      //alert(message);
      router.push(`/admin/contents/${content_id}`);
    },
    onError: () => {
      alert('오류');
    },
  });

  const content = detailData?.content;
  const feedback = detailData?.data.feedback;

  const fortunesData = {
    parents: detailData?.data.parents || [],
    children: detailData?.data.children || [],
    children_data: detailData?.data.children_data || [],
  };

  const isAdvertise = content?.site === 'pincrux' || content?.site === 'nbt';
  return (
    <PageLayout>
      <h1>{isAdvertise && '광고 제휴'}콘텐츠 상세/수정</h1>
      {content && (
        <Form
          isAdvertise={isAdvertise}
          content={content}
          feedback={feedback}
          fortunesData={fortunesData}
          formMutation={formMutate}
        />
      )}
    </PageLayout>
  );
}

Detail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Detail;
