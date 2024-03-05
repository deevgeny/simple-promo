import React from 'react';
import {
  Toolbar,
  Button,
  Typography,
  IconButton
 } from '@mui/material';
 import SearchIcon from '@mui/icons-material/Search';
 import useWebsiteContext from '../../hooks/useWebsiteContext';

/**
 * Appbar with site name and buttons.
 */
function Appbar() {
  const { website } = useWebsiteContext();

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Button size="small">Subscribe</Button>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1 }}
      >
        {website?.name || null}
      </Typography>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <Button variant="outlined" size="small">
        Sign up
      </Button>
    </Toolbar>
  );
}

export default Appbar;