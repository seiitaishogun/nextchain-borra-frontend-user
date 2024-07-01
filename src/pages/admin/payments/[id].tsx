import React, { ReactElement } from 'react';
import AdminLayout from '@/components/Admin/Layout';

// TODO: 추후 작업 필요
function Detail() {
  return <div>payments detail</div>;
}

export default Detail;

Detail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
