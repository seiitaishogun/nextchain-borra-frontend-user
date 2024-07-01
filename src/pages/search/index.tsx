import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import SearchBar from '@/components/Search/Searchbar';
import Keyword from '@/components/Search/Keyword';
import Title from '@/components/Common/Title';
import Card from '@/components/Common/Card';
import DetailList from '@/components/Common/List/DetailList';
import useSearchHistory from '@/hooks/search/useSearchHistory';
import useInfiniteScrollList from '@/hooks/contents/useInfiniteScrollList';
import useContentsLikes from '@/hooks/contents/useContentsLikes';
import useDataCollection from '@/hooks/sdk/useDataCollection';
import { userInfoState } from '@/store/auth';
import { fetchMainHotRandom } from '@/api/main';
import { fetchSearch } from '@/api/search';

const Layout = styled.div`
  section.search-bar {
    margin: 0;
  }

  section.recent-keyword {
    margin-top: 12px;
    padding: 0 16px;
  }

  section.recent-contents {
    margin-top: 30px;
    padding: 0 16px;
  }
`;

function Search() {
  const router = useRouter();
  const { query } = router;
  const searchValue = (query.search_value as string) || '';
  const userInfo = useRecoilValue(userInfoState);
  const { historyKeywords, storeHistory, deleteHistory } = useSearchHistory();
  const { handleMoveSearchEvent } = useDataCollection();

  const recommendContents = useQuery(
    ['contentsHotRandom'],
    fetchMainHotRandom,
    {
      initialData: {
        data: [],
      },
      select: res => res.data,
      enabled: !searchValue,
    }
  );
  const recommendContentsData = useContentsLikes({
    data: recommendContents.data,
    isLoading: recommendContents.isLoading,
  });

  const { listData, handleFetchNext, isLoading } = useInfiniteScrollList({
    queryKey: 'searchResult',
    fetchList: fetchSearch,
    params: { ...query },
    enabled: !!(
      router.isReady &&
      query?.search_value &&
      query.search_value.length > 1
    ),
  });

  useEffect(() => {
    storeHistory(searchValue);
  }, [searchValue]);

  const handleClickCard = (data: any) => {
    handleMoveSearchEvent({
      keyword: searchValue,
      content_id: data.content_id,
      content_name: data.content_name,
      user_id: userInfo?.id || null,
      user_name: userInfo?.name || null,
    });
  };

  return (
    <Layout>
      <section className="search-bar">
        <SearchBar
          searchValue={searchValue}
          historyKeywords={historyKeywords}
          deleteHistory={deleteHistory}
        />
      </section>

      {!searchValue && (
        <>
          <section className="recent-keyword">
            <Title title="추천 검색" className="title" />
            <Keyword />
          </section>

          <section className="recent-contents">
            <Title className="recent-title" title="추천 콘텐츠" />
            <Card size="small" data={recommendContentsData} isSwipe />
          </section>
        </>
      )}

      {searchValue && (
        <DetailList
          data={listData}
          isLoading={isLoading}
          handleClick={handleClickCard}
          emptyMessage={
            <>
              검색 결과가 없어요!
              <br />
              다른 걸로 검색해볼까요?
            </>
          }
          handleFetchNext={handleFetchNext}
        />
      )}
    </Layout>
  );
}

export default Search;
