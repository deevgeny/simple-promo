import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../../components/Navbar';
import FeaturedImageBlock from '../../components/FeaturedImageBlock';
import CallToActionBlock from '../../components/CallToActionBlock';
import Footer from '../../components/Footer';

function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <FeaturedImageBlock />
      <CallToActionBlock />
      <Footer />
    </Box>
  );
}

export default Home;