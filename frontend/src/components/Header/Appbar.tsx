import React from 'react';
import {
  Toolbar,
  Button,
  Typography,
  IconButton
 } from '@mui/material';
 import SearchIcon from '@mui/icons-material/Search';

const title = 'title';

function Appbar() {
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
        {title}
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