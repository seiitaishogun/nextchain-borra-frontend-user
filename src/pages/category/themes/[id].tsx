import styled from 'styled-components';
import ContentsList from '@/components/Common/List/ContentsList';
// import Advert from '@/components/Common/Advert';
import DetailList from '@/components/Common/List/DetailList';
import Title from '@/components/Common/Title';
import Card from '@/components/Common/Card';

const Layout = styled.div`
  section.summary {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  section.top3 {
    margin: 40px 16px 0;
  }

  section.ad {
    margin-top: 32px;
  }
`;

/**
 * TODO: 테마 작업시 수정 필요
 */
function Theme() {
  return (
    <Layout>
      <section className="summary">
        <ContentsList data={[]} isLoading handleFetchNext={() => {}} />
      </section>

      <section className="top3">
        <Title title="조회수 TOP3" />
        <Card size="small" />
      </section>

      {/* <section className="ad"> */}
      {/*  <Advert width="360px" height="162px" /> */}
      {/* </section> */}

      <section className="contents">
        <DetailList data={[]} isLoading={false} handleFetchNext={() => {}} />
      </section>
    </Layout>
  );
}

export default Theme;
