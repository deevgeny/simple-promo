import React from 'react';
import { Typography } from '@mui/material';

/**
 * Typography component to render on empty data page.
 * @returns 
 */
function NoData() {
  return (
    <Typography textAlign='center' mt={16}>
      Ничего не найдено
    </Typography>

  );
}

export default NoData;