import styled from 'styled-components';
import TabMenu from '@/components/Category/TabMenu';
import ThemeList from '@/components/Common/List/ThemeList';

const Layout = styled.div`
  .nav-bar {
    height: 60px;
    display: flex;
  }
`;

function Page() {
  return (
    <Layout>
      <div className="nav-bar" />
      <TabMenu />
      <ThemeList />
    </Layout>
  );
}

export default Page;
