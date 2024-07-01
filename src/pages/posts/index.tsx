import React from 'react';
import { useQuery } from '@tanstack/react-query';
import List from '@/components/Posts/List';
import { Layout } from '@/styles/Post.styled';
import { fetchPosts } from '@/api/posts';

function Posts() {
  const { data: postsData } = useQuery(['posts'], () =>
    fetchPosts({ page: 1, type: 'notice' })
  );

  const data = postsData?.data.list || [];

  return (
    <Layout>
      <h1>공지사항</h1>
      <section>
        <List data={data} />
      </section>
    </Layout>
  );
}

export default Posts;
