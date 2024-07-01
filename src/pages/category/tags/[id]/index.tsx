import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Title from '@/components/Common/Title';
import Card from '@/components/Common/Card';
// import ThemeList from '@/components/Common/List/ThemeList';
import CategoryTabMenu from '@/components/Category/CategoryTabMenu';
import TabMenu from '@/components/Category/TabMenu';
import { fetchMainTags } from '@/api/main';

const Layout = styled.div`
  .nav-bar {
    height: 60px;
    display: flex;
  }

  .menu {
    height: 100px;
    background: gray;
  }

  .top10 {
    margin: 40px 16px 0;
  }

  .theme {
    margin-top: 52px;

    > .title {
      margin: 0 16px;
    }
  }

  .ad {
    margin-top: 16px;
  }

  .contents-list {
    > .title {
      margin: 16px 16px 0;
    }
  }
}

.recent {
  margin-top: 60px;

  > .title {
    margin: 0 16px;
  }
`;

function TagDetail() {
  const router = useRouter();
  const tagId = router.query.id || 1;

  const { data: contentsData } = useQuery(
    ['TagDetail', 'contents', tagId],
    () => fetchMainTags(Number(tagId)),
    {
      enabled: router.isReady,
    }
  );

  /**   TODO 테마리스트, 1차 오픈시 제외
   const { data } = useQuery(
   ['TagDetail', 'themes', tagId],
   () =>
   fetchContentsList({
        tag_id: Number(tagId), // 최상단 콘텐츠
        order_column: 'view_count',
        limit: 3,
      }),
   {
      enabled: false,
    }
   );
   */

  const contentsList = contentsData?.data || [];

  return (
    <Layout>
      <div className="nav-bar" />

      <TabMenu />
      <CategoryTabMenu />

      <section className="top10">
        <Title
          title="TOP10 순위별 콘텐츠"
          linkConfig={{
            href: `/category/tags/${tagId}/all`,
          }}
        />
        {contentsList.length > 0 && <Card size="small" data={contentsList} />}
      </section>

      {/**   TODO 테마리스트, 1차 오픈시 제외
       <section className="theme">
       <Title title="테마" className="title" />
       <ThemeList />
       </section>
       */}
    </Layout>
  );
}

export default TagDetail;
