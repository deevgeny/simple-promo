import React from 'react';
import useWebsiteContext from '../../hooks/useWebsiteContext';
import { Box, Container, Typography } from '@mui/material';
import Copyright from './Copyright';

function Footer() {
  const { website } = useWebsiteContext();

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
        <Typography variant='body2' textAlign='center' color='text.secondary'>
          {website?.slogan}
        </Typography>
        <Typography variant='body2' textAlign='center' color='text.secondary'>
          {website?.address}
        </Typography>
        <Typography variant='body2' textAlign='center' color='text.secondary'>
          {website?.phone}{' '}{website?.email} 
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;