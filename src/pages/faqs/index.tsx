import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import List from '@/components/Faqs/List';
import { EmptyList } from '@/components/Common/Card/Card.styled';
import { Layout, TypeItem, TypeUl } from '@/styles/Post.styled';
import { fetchPosts } from '@/api/posts';

function Faqs() {
  const router = useRouter();
  const [typeId, setTypeId] = useState(0);
  const [types, setTypes] = useState<Array<any>>([]);

  const { data: postsData, isLoading } = useQuery(['posts'], () =>
    fetchPosts({
      page: 1,
      type: 'faq',
    })
  );

  const data = postsData?.data.list || [];

  useEffect(() => {
    if (isLoading) return;
    const newTypes = [
      {
        id: 0,
        name: '전체',
      },
      ...TYPE,
    ];
    setTypes(newTypes);
  }, [isLoading]);

  const handleNavClick = (t: any) => {
    router.push({
      query: {
        search_value: t.name,
      },
    });
    setTypeId(t.id);
  };

  if (data?.length === 0) {
    return (
      <EmptyList>
        <p>데이터가 없습니다.</p>
      </EmptyList>
    );
  }

  return (
    <Layout>
      <h1>자주 묻는 질문</h1>

      <TypeUl>
        {types?.map((t: any) => (
          <TypeItem
            key={t.id}
            className={typeId === t.id ? 'selected' : ''}
            onClick={() => handleNavClick(t)}
          >
            <button type="button">{t.name}</button>
          </TypeItem>
        ))}
      </TypeUl>
      <section>
        {data?.map((d: any) => (
          <List key={d.id} data={d} />
        ))}
      </section>
    </Layout>
  );
}

export default Faqs;

const TYPE = [
  {
    id: 1,
    name: '회원가입',
  },
  {
    id: 2,
    name: '결제',
  },
  {
    id: 3,
    name: '카테고리1',
  },
  {
    id: 4,
    name: '카테고리2',
  },
  {
    id: 5,
    name: '카테고리3',
  },
];
