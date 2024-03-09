import React from 'react';
import {
  Toolbar,
  Button,
  Typography,
  IconButton
 } from '@mui/material';
 import TelegramIcon from '@mui/icons-material/Telegram';
 import useWebsiteContext from '../../hooks/useWebsiteContext';

/**
 * Appbar with site name and buttons.
 */
function Appbar() {
  const { website } = useWebsiteContext();

  const handleOnClick = () => {
    // Replace to navigate() from React Router
    window.open(website?.telegram, '_blank');
  };

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Typography
        component='h2'
        variant='h5'
        color='inherit'
        align='center'
        noWrap
        sx={{
          flex: 1,
          display: { xs: 'block', sm: 'none' }
        }}
      >
        {website?.name}
      </Typography>
      {website?.telegram
        ? <IconButton onClick={handleOnClick} sx={{ ml: 'auto', mr: 0 }}>
            <TelegramIcon color='primary' />
          </IconButton>
        : null
      }
    </Toolbar>
  );
}

export default Appbar;