import { ParsedUrlQuery } from 'querystring';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Title from '@/components/Common/Title';
import ContentsList from '@/components/Common/List/ContentsList';
import Loading from '@/components/Common/Popup/Loading';

interface Props {
  isLoading?: boolean;
  query?: ParsedUrlQuery;
  data: Array<any>;
  total: number;
}

const Layout = styled.div`
  section.theme {
    margin-top: 40px;
  }

  section.contents {
    margin-top: 32px;

    > .title {
      margin: 0 16px;
    }
  }
`;

const Box = styled.div`
  margin: 0 16px;
  line-height: 1.4;
  text-align: center;
`;

function SearchResult({ isLoading, query, data, total }: Props) {
  const router = useRouter();

  return (
    <Layout>
      {isLoading && <Loading isOpen />}
      {/** TODO
       <section className="theme">
       <Title className="title" title="테마" linkConfig={{ href: '#' }} />
       <ThemeList />
       </section>
       */}
      <section className="contents">
        {!isLoading && data.length > 0 && (
          <>
            <Title
              className="title"
              title={`콘텐츠 (${total})`}
              linkConfig={{
                text: '모두보기',
                onClick: () =>
                  router.push({
                    pathname: '/search/result/all',
                    query,
                  }),
              }}
            />
            <ContentsList data={data} isLoading handleFetchNext={() => {}} />
          </>
        )}

        {!isLoading && data.length === 0 && (
          <Box>
            검색 결과가 없어요! <br /> 다른 걸로 검색해볼까요?
          </Box>
        )}
      </section>
    </Layout>
  );
}

export default SearchResult;
