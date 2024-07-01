import React, { ReactElement } from 'react';
import AdminLayout from '@/components/Admin/Layout';

function Detail() {
  return <div>asdasd</div>;
}

export default Detail;

Detail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
