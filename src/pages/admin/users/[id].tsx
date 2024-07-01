import React, { ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { Link } from '@mui/material';
import AdminLayout from '@/components/Admin/Layout';
import { TableColumns } from '@/components/Admin/Common/Table/types';
import DetailFilter from '@/components/Admin/Users/DetailFilter';
import Table from '@/components/Admin/Common/Table';
import { PageLayout, Util } from '@/styles/Admin/PageLayout.styled';
import { fetchUsersDetail, fetchUsersPurchases } from '@/api/admin/users';
import { searchFiltersState as paymentsSearchFilterState } from '@/store/admin/payments';
import { searchFiltersState as purchasesSearchFilterState } from '@/store/admin/purchases';
import { SearchType as PaymentsSearchType } from '@/types/admin/payments';
import { RecommendersT } from '@/types/users';
import useListData from '@/hooks/admin/useListData';
import { SearchTypeE as PurchasesSearchTypeE } from '@/types/admin/purchases/search';
import {
  fetchPaymentsApp,
  fetchPaymentsEvent,
  fetchPaymentsWeb,
} from '@/api/admin/payments';
import { fetchUserFeedbacks } from '@/api/admin/users/feedback';
import { FeedbackListItem } from '@/types/admin/users/feedback';

function Detail() {
  const router = useRouter();
  const { id: queryId, isReady } = router.query;
  const id = Number(queryId);
  const setPaymentsSearchState = useSetRecoilState(paymentsSearchFilterState);
  const setPurchasesSearchState = useSetRecoilState(purchasesSearchFilterState);

  const [page, setPage] = useState(1);
  const { data } = useQuery(
    ['adminUserDetail', id],
    () => fetchUsersDetail(id),
    {
      enabled: !!id,
    }
  );

  const [paymentsWebPage, setPaymentsWebPage] = useState(1);
  const { data: paymentsWebData, isLoading: paymentsWebIsLoading } = useQuery(
    ['adminPaymentsWeb', id, paymentsWebPage],
    () =>
      fetchPaymentsWeb({
        page: paymentsWebPage,
        user_id: id,
      }),
    {
      enabled: !!id,
    }
  );
  const paymentsWebListData = useListData<any>(paymentsWebData?.data);

  const [paymentsAppPage, setPaymentsAppPage] = useState(1);
  const { data: paymentsAppData, isLoading: paymentsAppIsLoading } = useQuery(
    ['adminPaymentsApp', id, paymentsAppPage],
    () =>
      fetchPaymentsApp({
        page: paymentsAppPage,
        user_id: id,
      }),
    {
      enabled: !!id,
    }
  );
  const paymentsAppListData = useListData<any>(paymentsAppData?.data);

  const [paymentsEventPage, setPaymentsEventPage] = useState(1);
  const { data: paymentsEventData, isLoading: paymentsEventIsLoading } =
    useQuery(
      ['adminPaymentsEvent', id, paymentsEventPage],
      () =>
        fetchPaymentsEvent({
          page: paymentsEventPage,
          user_id: id,
        }),
      {
        enabled: !!id,
      }
    );
  const paymentsEventListData = useListData<any>(paymentsEventData?.data);

  const [purchasesPage, setPurchasesPage] = useState(1);
  const { data: purchasesData, isLoading: purchasesIsLoading } = useQuery(
    ['adminPurchases', id, purchasesPage],
    () =>
      fetchUsersPurchases({
        page: purchasesPage,
        user_id: id,
      }),
    {
      enabled: !!id,
    }
  );
  const purchasesListData = useListData<any>(purchasesData?.data);

  const [feedbacksPage, setFeedbacksPage] = useState(1);
  const { data: feedbacksData, isLoading: feedbacksIsLoading } = useQuery(
    ['adminUserFeedbacks', id, feedbacksPage],
    () =>
      fetchUserFeedbacks({
        page: feedbacksPage,
        user_id: id,
      }),
    {
      enabled: !!id,
      initialData: {
        data: {
          counts: null,
          list: [],
          paginate: 0,
        },
      },
      select: res => res.data,
    }
  );

  const user = data?.data || {};
  const recommenders: Array<any> = [];

  return (
    <PageLayout>
      <h1>계정관리</h1>
      {!isReady && <DetailFilter id={Number(id)} data={user} />}

      <article>
        <Link
          onClick={() => {
            setPaymentsSearchState((prev: any) => ({
              ...prev,
              search_type: PaymentsSearchType.Email,
              search_value: user.email,
            }));
            router.push('/admin/payments/web');
          }}
        >
          <span>
            웹 결제로 인한 적립 내역 총 {paymentsWebListData.counts.search_sum}
            원 (전체 {paymentsWebListData.counts.search_count}건)
          </span>
        </Link>
        <Table
          columns={paymentsWebColumns}
          rows={paymentsWebListData.list}
          isLoading={paymentsWebIsLoading}
          totalPage={paymentsWebListData.paginate}
          page={paymentsWebPage}
          setPage={setPaymentsWebPage}
        />
      </article>

      <article>
        <Link
          onClick={() => {
            setPaymentsSearchState((prev: any) => ({
              ...prev,
              search_type: PaymentsSearchType.Email,
              search_value: user.email,
            }));
            router.push('/admin/payments/app');
          }}
        >
          <span>
            앱 결제로 인한 적립 총 {paymentsAppListData.counts.search_sum}원
            (전체 {paymentsAppListData.counts.search_count}건)
          </span>
        </Link>
        <Table
          columns={paymentsAppColumns}
          rows={paymentsAppListData.list}
          isLoading={paymentsAppIsLoading}
          totalPage={paymentsAppListData.paginate}
          page={paymentsAppPage}
          setPage={setPaymentsAppPage}
        />
      </article>

      <article>
        <Link
          onClick={() => {
            setPaymentsSearchState((prev: any) => ({
              ...prev,
              search_type: PaymentsSearchType.Email,
              search_value: user.email,
            }));
            router.push('/admin/payments/event');
          }}
        >
          <span>
            기타 적립 내역 총 {paymentsEventListData.counts.search_sum}원 (전체{' '}
            {paymentsEventListData.counts.search_count}건)
          </span>
        </Link>
        <Table
          columns={paymentsEventColumns}
          rows={paymentsEventListData.list}
          isLoading={paymentsEventIsLoading}
          totalPage={paymentsEventListData.paginate}
          page={paymentsEventPage}
          setPage={setPaymentsEventPage}
        />
      </article>

      <article>
        <Link
          onClick={() => {
            setPurchasesSearchState(prev => ({
              ...prev,
              search_type: PurchasesSearchTypeE.Email,
              search_value: user.email,
            }));
            router.push('/admin/purchases');
          }}
        >
          <span>
            코인 사용 내역 총 {purchasesListData.counts.search_sum}원 (전체{' '}
            {purchasesListData.counts.search_count || 0}건)
          </span>
        </Link>
        <Table
          columns={purchasesColumns}
          rows={purchasesListData.list}
          isLoading={purchasesIsLoading}
          totalPage={purchasesListData.paginate}
          page={purchasesPage}
          setPage={setPurchasesPage}
        />
      </article>

      <article>
        <Util>
          <span>피드백 내역</span>
        </Util>

        <Table
          columns={feedbacksColumns}
          rows={feedbacksData.list}
          isLoading={feedbacksIsLoading}
          totalPage={feedbacksData.paginate}
          page={feedbacksPage}
          setPage={setFeedbacksPage}
        />
      </article>

      <article>
        <Util>
          <span>추천 회원 목록 ({recommenders.length}명)</span>
        </Util>

        <Table
          columns={recommendersColumns}
          rows={recommenders}
          isLoading={false}
          page={page}
          setPage={setPage}
          totalPage={0}
        />
      </article>
    </PageLayout>
  );
}

export default Detail;

Detail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

const recommendersColumns: Array<TableColumns<RecommendersT>> = [
  { id: 'email', label: '이메일', maxWidth: 150 },
  { id: 'name', label: '회원명', maxWidth: 150 },
  { id: 'status', label: '상태', maxWidth: 150 },
  { id: 'created_at', label: '날짜', maxWidth: 150 },
];

const paymentsWebColumns: Array<TableColumns<any>> = [
  { id: 'type', label: '분류', maxWidth: 100 },
  {
    id: 'increased',
    label: '금액',
    maxWidth: 220,
    format: row => `${row.increased} (VAT 제외)`,
  },
  { id: 'memo', label: '지급사유', maxWidth: 130 },
  { id: 'device', label: '기종', maxWidth: 130 },
  { id: 'created_at', label: '날짜', maxWidth: 220 },
];

const paymentsAppColumns: Array<TableColumns<any>> = [
  { id: 'type', label: '분류', maxWidth: 100 },
  {
    id: 'increased',
    label: '금액',
    maxWidth: 220,
    format: row => `${row.increased} (VAT 제외)`,
  },
  { id: 'memo', label: '지급사유', maxWidth: 130 },
  { id: 'device', label: '기종', maxWidth: 130 },
  { id: 'created_at', label: '날짜', maxWidth: 220 },
];

const paymentsEventColumns: Array<TableColumns<any>> = [
  { id: 'type', label: '분류', maxWidth: 100 },
  {
    id: 'increased',
    label: '금액',
    maxWidth: 220,
    format: row => `${row.increased} (VAT 제외)`,
  },
  { id: 'memo', label: '지급사유', maxWidth: 130 },
  { id: 'created_at', label: '날짜', maxWidth: 220 },
];

const purchasesColumns: Array<TableColumns<any>> = [
  { id: 'type', label: '분류', maxWidth: 150 },
  { id: 'name', label: '콘텐츠명', maxWidth: 150 },
  {
    id: 'payment',
    label: '결제방식',
    maxWidth: 150,
  },
  {
    id: 'decreased',
    label: '금액',
    maxWidth: 150,
  },
  { id: 'device', label: '모바일/웹', maxWidth: 150 },
  { id: 'referrer_path', label: '유입경로', maxWidth: 150 },
  { id: 'created_at', label: '날짜', maxWidth: 150 },
];

const feedbacksColumns: Array<TableColumns<FeedbackListItem>> = [
  { id: 'content_name', label: '콘텐츠 명', maxWidth: 150 },
  { id: 'feedback_name', label: '피드백', maxWidth: 100 },
  { id: 'created_at', label: '날짜', maxWidth: 100 },
];
