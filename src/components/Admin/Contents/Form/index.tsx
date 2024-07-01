import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { UseMutationResult, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { Button } from '@mui/material';
import ContentForm from '@/components/Admin/Contents/Form/ContentForm';
import Fortunes from '@/components/Admin/Contents/Fortunes';
import { ContentsFormT } from '@/components/Admin/Contents/Form/types';
import useDefaultParentListByTypeId from '@/components/Admin/Contents/Form/useDefaultParentListByTypeId';
import ContentFeedback from '@/components/Admin/Contents/Feedback';
import { ContentsT, ParentT } from '@/types/admin/contents/contents';
import { fetchContentsResource } from '@/api/admin/contents';
import { errorAlert } from '@/utils/yupMessage';
import { FeedbackT } from '@/types/content/feedback';

interface Props {
  isAdvertise?: boolean;
  content?: ContentsT;
  feedback?: FeedbackT[];
  fortunesData?: {
    parents: Array<any>;
    children: Array<any>;
    children_data: Array<any>;
  };
  formMutation: UseMutationResult<any, unknown, any, unknown>; // TODO: 타입 확인 필요
}

const Layout = styled.form`
  margin: 20px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(224, 224, 224, 1);
  background-color: rgba(255, 255, 255, 1);

  .buttonWrap {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

function Form({
  isAdvertise,
  content,
  feedback,
  fortunesData,
  formMutation,
}: Props) {
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const [parentList, setParentList] = useState<Array<ParentT>>([]);
  const { data: categoryData } = useQuery(
    ['adminContentsCreateData'],
    fetchContentsResource
  );
  const mode = content ? 'update' : 'create';
  const formControl = useForm<ContentsFormT>({
    resolver: yupResolver(schema) as any,
    defaultValues: content ? { ...DEFAULT_VALUES, ...content } : DEFAULT_VALUES,
  });
  const { handleSubmit } = formControl;

  useEffect(() => {
    const parents = fortunesData?.parents || [];
    const children = fortunesData?.children || [];
    const childrenData = fortunesData?.children_data || [];
    const parentsData = parents.map((p, pI) => ({
      ...p,
      name: p.name === 'null' ? '' : p.name,
      order: pI,
      children: children
        .filter(c => c.parent_id === p.id)
        .map((c, cI) => ({
          ...c,
          name: c.name === 'null' ? '' : c.name,
          order: cI,
          children_data: childrenData
            .filter(f => f.child_id === c.id)
            .map((f, fI) => ({ ...f, order: fI })),
        })),
    }));
    setParentList(parentsData);
    setFlag(true);
  }, []);

  useDefaultParentListByTypeId({
    parentList,
    setParentList,
    flag,
    typeId: Number(formControl.watch('type_id')),
  });

  const handleFormSubmit = (formData: ContentsFormT) => {
    if (!window.confirm(MESSAGE[mode].confirm)) return;
    if (formMutation.isLoading) return;

    const {
      survey,
      themes,
      discount_price,
      discount_started_at,
      discount_ended_at,
      visible_started_at,
      visible_ended_at,
    } = formData;

    if (discount_price === null && (discount_started_at || discount_ended_at)) {
      window.alert('할인가격을 입력해주세요.');
      return;
    }

    const newParentList = parentList.map(p => ({
      ...p,
      name: p.name || 'null',
      children: p.children.map(c => ({
        ...c,
        name: c.name || 'null',
      })),
    }));

    /**
     // 빈 페이지명 validation
     if (parentList.some(parent => !parent.name)) {
      window.alert("페이지명은 비워둘 수 없습니다.");
      return;
    }
     // 빈 소제목 validation
     if (parentList.some(parent => parent.children.some(child => !child.name))) {
      window.alert("소제목은 비워둘 수 없습니다.");
      return;
    }
     */

    const params = {
      ...formData,
      survey_id: survey?.id || null,
      themes: themes.map(t => t.id),
      data: newParentList,
    };

    if (discount_price || discount_started_at || discount_ended_at) {
      if (!discount_started_at) {
        window.alert('할인 시작 기간을 입력해주세요.');
        return;
      }
      params.discount_started_at = discount_started_at
        ? format(new Date(discount_started_at), 'yyyy-MM-dd HH:mm:00')
        : '2023-01-01 00:00:00';
      // 할인 종료 기간 미기입시 상시할인
      params.discount_ended_at = discount_ended_at
        ? format(new Date(discount_ended_at), 'yyyy-MM-dd HH:mm:00')
        : '2099-12-31 23:59:59';
      params.discount_price = discount_price;
    }

    if (
      !visible_started_at ||
      visible_started_at ||
      !visible_ended_at ||
      visible_ended_at
    ) {
      params.visible_started_at = visible_started_at
        ? format(new Date(visible_started_at), 'yyyy-MM-dd HH:mm:00')
        : '2023-01-01 00:00:00';

      params.visible_ended_at = visible_ended_at
        ? format(new Date(visible_ended_at), 'yyyy-MM-dd HH:mm:00')
        : '2099-12-31 23:59:59';
    }

    const {
      is_discount,
      created_at,
      parents,
      children,
      thumbnail,
      banner,
      banner_text,
      ...validParams
    } = params;

    formMutation.mutate(validParams);
  };

  const categories = categoryData?.data.categories || [];
  const types = categoryData?.data.types || [];
  const isUpdate = mode === 'update';

  return (
    <Layout onSubmit={handleSubmit(handleFormSubmit, errorAlert)}>
      <ContentForm
        formControl={formControl}
        categories={categories}
        types={types}
        isAdvertise={isAdvertise}
        isUpdate={isUpdate}
        advertise={content?.advertise}
      />

      {isUpdate && <ContentFeedback feedback={feedback || []} />}

      <Fortunes parentList={parentList} setParentList={setParentList} />
      <div className="buttonWrap">
        <Button
          variant="outlined"
          size="large"
          color="warning"
          onClick={e => {
            e.preventDefault();
            if (window.confirm(MESSAGE[mode].cancel)) {
              router.push('/admin/contents');
            }
          }}
        >
          취소
        </Button>
        <Button variant="contained" type="submit">
          저장
        </Button>
      </div>
    </Layout>
  );
}

export default Form;

const schema = yup.object({
  code: yup.string().required(),
  name: yup.string().required(),
  open_status: yup.number().required(),
  is_new: yup.boolean(),
  is_hot: yup.boolean(),
  price: yup.number().required(),
  discount_price: yup.number().max(yup.ref('price')).nullable(),
  discount_started_at: yup.date().nullable(),
  discount_ended_at: yup.date().nullable(),
  visible_started_at: yup.date().nullable(),
  visible_ended_at: yup.date().nullable(),
  site: yup.string().required(),
  category_id: yup.number().required(),
  type_id: yup.number().required(),
  themes: yup.array().of(yup.object()),
  tags: yup.array().of(yup.number()),
  summary: yup.string().nullable(), // 한줄소개
  contents: yup.string().nullable(), // 상세소개
  banner_id: yup.number().nullable(), // 상단배너
  banner_text_id: yup.number().nullable(), // 텍스트이미지
  thumbnail_id: yup.number().nullable(), // 썸네일
  thumbnail_large_id: yup.number().nullable(), // 썸네일
  data: yup.array(),
  wait_free_time: yup
    .number()
    .when('is_wait_free_time', ([is_wait_free_time], s) =>
      is_wait_free_time ? s.min(1).required() : s.notRequired()
    ),
  is_wait_free_time: yup.number(),
  is_first_free: yup.boolean().required(), // 최초 무료
  available_time: yup.number().required(), // 다시보기 가능 기간
  advertise_code: yup.string().nullable(),
});

const DEFAULT_VALUES: ContentsFormT = {
  code: '',
  name: '',
  open_status: null,
  is_new: 0,
  is_hot: 0,
  price: null,
  discount_price: null,
  discount_started_at: null,
  discount_ended_at: null,
  visible_started_at: null,
  visible_ended_at: null,
  site: '',
  category_id: '',
  type_id: '',
  themes: [],
  tags: [],
  summary: '',
  contents: '',
  banner_id: null,
  banner_text_id: null,
  thumbnail_id: null,
  thumbnail_large_id: null,
  data: [],
  wait_free_time: null,
  is_wait_free_time: 0,
  is_first_free: 0,
  available_time: 72,
  advertise_code: '',
  survey: null,
};

const MESSAGE = {
  create: {
    confirm: '콘텐츠 정보를 저장하시겠습니까?',
    cancel: '콘텐츠 목록으로 돌아가시겠습니까?\n수정된 정보는 모두 삭제됩니다.',
  },
  update: {
    confirm: '콘텐츠 정보를 저장하시겠습니까?',
    cancel: '콘텐츠 목록으로 돌아가시겠습니까?\n수정된 정보는 모두 삭제됩니다.',
  },
};
