import styled from 'styled-components';
import ContentsPage from '@/components/Contents/Result/Section/ContentsPage';
import {
  ContentLayout,
  PaddingBox,
} from '@/components/Contents/Result/Result.styled';

interface Props {
  data: Array<any>;
  gwae: {
    out: number;
    in: number;
    name: string;
    contents: string;
  };
}

const Layout = styled(PaddingBox)`
  margin-top: 12px;
`;

const JuyeogCard = styled.div<{ cardImg: string }>`
  display: flex;
  width: 100%;
  height: 456px;
  padding: 16px 0;
  border-radius: 8px;
  box-sizing: border-box;
  background: url(${({ cardImg }) => cardImg}) no-repeat center center;
  background-size: cover;
`;

function JuyeogResult({ data, gwae }: Props) {
  const gwaeImg = `${process.env.APP_IMAGE_URL}/contents/juyeog/result/${gwae.out}_${gwae.in}.jpg`;
  return (
    <Layout>
      <ContentLayout>
        <JuyeogCard cardImg={gwaeImg} />
      </ContentLayout>
      <ContentsPage data={data} />
    </Layout>
  );
}

export default JuyeogResult;
