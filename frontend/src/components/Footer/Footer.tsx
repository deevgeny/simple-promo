import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Copyright from './Copyright';
import useWebsiteContext from '../../hooks/useWebsiteContext';

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
        <Typography variant='body2' textAlign='center'>
          {website?.slogan}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;