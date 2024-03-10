import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


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
    </Container>
  );
}

export default Home;