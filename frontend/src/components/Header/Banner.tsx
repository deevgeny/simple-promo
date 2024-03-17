import React from 'react';
import { 
  Paper,
  Box,
  Grid,
  Typography,
 } from '@mui/material';
 import useWebsiteContext from '../../hooks/useWebsiteContext';

const { REACT_APP_API_URL: API_URL } = process.env;
// const defaultImage = 'https://source.unsplash.com/random?wallpapers';
const defaultImage = '#';

function Banner() {
  const { website } = useWebsiteContext();

  return (
    <Paper
      sx={{
        display: { xs: 'none', sm: 'block' },
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: website?.banner
                          ? `url(${API_URL}${website?.banner})`
                          : `url(${defaultImage})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: 'none' }}
          src={website?.banner ? `${API_URL}${website?.banner}` : defaultImage}
          alt={website?.name}
        />
      }
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: 1
        }}
      />
      <Grid container>
        <Grid item>
          <Box
            sx={{
              position: 'relative',
              p: { sm: 4, md: 6 },
              pr: { md: 0 },
              minHeight: 180,
            }}
          >
            <Typography
              component='h1'
              variant='h3'
              color='inherit'
              gutterBottom
            >
              {website?.name}
            </Typography>
            <Typography variant='h5' color='inherit' paragraph>
              {website?.slogan}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Banner;