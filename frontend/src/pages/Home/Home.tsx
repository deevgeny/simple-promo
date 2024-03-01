import React from 'react';
import { Container } from '@mui/material';
import Header from '../../components/Header';
import FeaturedItems from '../../components/FeaturedItems';
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
        <FeaturedItems />
      </main>
      <Footer />
    </Container>
  );
}

export default Home;