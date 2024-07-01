import styled from 'styled-components';
import { useRouter } from 'next/router';
import useKeywords from '@/hooks/search/useKeywords';

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.button`
  width: fit-content;
  padding: 7px 8px;
  margin: 8px 4px;
  max-width: 120px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

function Keyword() {
  const router = useRouter();
  const keywords = useKeywords();

  // TODO 추천 검색어 링크 확인
  return (
    <Layout>
      {keywords.slice(0, 4).map(keyword => (
        <Item
          key={keyword}
          type="button"
          onClick={() => {
            router.push({
              pathname: '/search',
              query: { search_value: keyword },
            });
          }}
        >
          {keyword}
        </Item>
      ))}
    </Layout>
  );
}

export default Keyword;
