import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Stack, Typography, Link } from '@mui/material';


function NotFound() {
  return (
    <Stack alignItems='center' spacing={3} my={6}>
      <img
        className='img-scale-down'
        src={`images/page-not-found.svg`}
        alt='page not found'
        loading='lazy'
      />
      <Typography color='text.secondary'>
        Страница не найдена
      </Typography>
      <Link component={ReactRouterLink} to='/' variant='body2'>
        Вернуться на главную
      </Link>
    </Stack>
  );
}

export default NotFound;