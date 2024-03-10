import React from 'react';
import {
  Toolbar,
  Typography,
  IconButton,
  Stack
 } from '@mui/material';
 import TelegramIcon from '@mui/icons-material/Telegram';
 import MailOutlineIcon from '@mui/icons-material/MailOutline';
 import useWebsiteContext from '../../hooks/useWebsiteContext';

/**
 * Appbar with site name and buttons.
 */
function Appbar() {
  const { website } = useWebsiteContext();

  const handleEmailClick = () => {
    window.location.href = `mailto:${website?.email}`;
  };

  const handleTelegramClick = () => {
    window.open(website?.telegram, '_blank');
  };

  return (
    <Toolbar>
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
      <Stack direction='row' spacing={0.5} ml='auto'>
        {website?.email &&
          <IconButton onClick={handleEmailClick}>
            <MailOutlineIcon color='primary' />
          </IconButton>
        }
        {website?.telegram &&
          <IconButton onClick={handleTelegramClick}>
            <TelegramIcon color='primary' />
          </IconButton>
        }
      </Stack>
    </Toolbar>
  );
}

export default Appbar;