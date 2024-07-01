import Link from 'next/link';
import { Layout } from '@/components/Posts/List/List.styled';
import { EmptyList } from '@/components/Common/Card/Card.styled';

interface Props {
  data?: Array<any>;
}

function List({ data = [] }: Props) {
  if (data?.length === 0) {
    return (
      <EmptyList>
        <p>데이터가 없습니다.</p>
      </EmptyList>
    );
  }
  return (
    <Layout>
      {data?.length > 0 &&
        data.map(({ id, name, created_at }: any) => (
          <li key={id}>
            <Link href={`/posts/${id}`} legacyBehavior>
              <div className="wrapper">
                <p>{name}</p>
                <span>{created_at}</span>
              </div>
            </Link>
          </li>
        ))}
    </Layout>
  );
}

export default List;
