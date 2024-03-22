import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorDialog from '../../components/ErrorDialog';

/**
 * Home page with header, outlet, footer and error dialog.
 */
function Home() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: 'lg',
        my: 'auto'
      }}
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ErrorDialog />
    </Container>
  );
}

export default Home;