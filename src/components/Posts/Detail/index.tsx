import EditorView from '@/components/Common/Editor/EditorView';
import { Layout } from '@/components/Posts/Detail/Detail.styled';

interface Props {
  data?: any;
}

function Detail({ data }: Props) {
  return (
    <Layout>
      <h1>{data.name}</h1>
      <span>{data.created_at}</span>
      <EditorView html={data.contents} />
    </Layout>
  );
}

export default Detail;
