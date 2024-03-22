import React from 'react';
import { Typography, Link } from '@mui/material';
import useWebsiteContext from '../../hooks/useWebsiteContext';

/**
 * Typography component with copyright text and link.
 * @returns 
 */
function Copyright() {
  const { website } = useWebsiteContext();

  return (
    <Typography
      variant='body2'
      color='text.secondary'
      textAlign='center'
      mt={1}
    >
      {'Все права защищены © '}
      <Link color='inherit' href={process.env.PUBLIC_URL}>
        {website?.name}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;