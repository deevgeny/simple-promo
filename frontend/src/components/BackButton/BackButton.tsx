import React from 'react';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';

/**
 * React router back button relative to path.
 */
function BackButton() {
  return (
    <Button
      size='small'
      component={Link}
      to='..'
      relative='path'
      sx={{
        marginX: '50%',
        translate: '-50%',
        marginTop: 6
      }}
    >
      Назад
    </Button>
  );
}

export default BackButton;