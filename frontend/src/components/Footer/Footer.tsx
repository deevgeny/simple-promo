import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Copyright from './Copyright';

function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth='sm'>
        <Typography variant='body1' textAlign='center'>
          My sticky footer can be found here.
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;