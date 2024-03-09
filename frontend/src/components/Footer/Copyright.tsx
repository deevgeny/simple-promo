import React from 'react';
import { Typography, Link } from '@mui/material';
import useWebsiteContext from '../../hooks/useWebsiteContext';

function Copyright() {
  const { website } = useWebsiteContext();

  return (
    <Typography variant='body2' color='text.secondary' textAlign='center'>
      {'Все права защищены © '}
      <Link color='inherit' href={website?.url}>
        {website?.name}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;