import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Title from '@/components/Common/Title';
import ContentsList from '@/components/Common/List/ContentsList';
import { fetchSearch } from '@/api/search';

enum OrderColumn {
  CreatedAt = 'created_at',
  ViewCount = 'view_count',
}

const Layout = styled.div`
  section.theme {
    margin-top: 40px;

    > .title {
      margin: 0 16px;
    }
  }

  section.contents {
    margin-top: 32px;
  }

  .load-more {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 38px;
    color: #8986ff;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px;

  .divider {
    margin: 0 4px;
    color: rgba(0, 0, 0, 0.6);
  }

  button {
    color: rgba(0, 0, 0, 0.6);

    &.active {
      color: #000;
    }
  }
`;

function All() {
  const router = useRouter();
  const { query } = router;
  const isViewCount = query?.order_column !== OrderColumn.CreatedAt;
  const [searchQuery, setSearchQuery] = useState<any>({});
  const [contentsList, setContentsList] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const loadMoreMutation = useMutation([], fetchSearch);
  const { data } = useQuery(
    ['searchResultAll', searchQuery],
    () => fetchSearch(searchQuery),
    {
      enabled: router.isReady && !!searchQuery,
      onSuccess: initialData => {
        const initialContentsList = initialData?.data.list || [];
        setContentsList(initialContentsList);
      },
    }
  );

  useEffect(() => {
    if (router.isReady) {
      setSearchQuery(query);
      setPage(1);
    }
  }, [router.isReady, query]);

  const total = data?.data.total || 0;
  const lastPage = data?.data.last_page || 1;

  const handleSortFilter = (order_column: OrderColumn) => {
    const newQuery = { ...query, order_column };
    router.push({ pathname: '/search/result/all', query: newQuery });
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    loadMoreMutation.mutate(
      { ...searchQuery, page: page + 1 },
      {
        onSuccess: newData => {
          const newContentsList = newData?.data.list || [];
          setContentsList(prev => [...prev, ...newContentsList]);
        },
      }
    );
  };

  return (
    <Layout>
      <section className="contents">
        <Box>
          <Title className="title" title={`콘텐츠 (${total})`} />
          <div className="filter">
            <button
              type="button"
              className={isViewCount ? 'active' : ''}
              onClick={() => {
                handleSortFilter(OrderColumn.ViewCount);
              }}
            >
              인기순
            </button>
            <span className="divider">|</span>
            <button
              type="button"
              className={!isViewCount ? 'active' : ''}
              onClick={() => {
                handleSortFilter(OrderColumn.CreatedAt);
              }}
            >
              최신순
            </button>
          </div>
        </Box>
        <ContentsList
          data={contentsList}
          isLoading
          handleFetchNext={() => {}}
        />
      </section>

      {page < lastPage && (
        <button className="load-more" type="button" onClick={handleLoadMore}>
          더보기
        </button>
      )}
    </Layout>
  );
}

export default All;
