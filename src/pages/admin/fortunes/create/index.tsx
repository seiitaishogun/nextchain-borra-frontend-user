import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import Form from '@/components/Admin/Fortunes/Form';
import AdminLayout from '@/components/Admin/Layout';
import { PageLayout } from '@/styles/Admin/PageLayout.styled';
import { fetchFortunesCreate } from '@/api/admin/fortunes';

const Layout = styled(PageLayout)`
  .groupContent > div {
    margin-right: 10px;
  }
`;

function Create() {
  const createMutation = useMutation(fetchFortunesCreate);

  return (
    <Layout>
      <h1>운세 풀이 데이터 등록</h1>
      <Form formMutation={createMutation} />
    </Layout>
  );
}

Create.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Create;
