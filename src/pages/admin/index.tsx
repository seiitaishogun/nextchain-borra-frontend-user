import React, { ReactElement } from 'react';
import Container from '@mui/material/Container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AdminLayout from '@/components/Admin/Layout';

function Home() {
  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} />;
}

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <DndProvider backend={HTML5Backend}>
      <AdminLayout>{page}</AdminLayout>
    </DndProvider>
  );
};
