import React from 'react';
import {
  Stack,
  Breadcrumbs,
  Link,
  Typography
} from '@mui/material';
import { Link as LinkRouter, useLocation } from 'react-router-dom';

export const pathMap: { [key: string]: string } = {
  '/items': 'Просмотр',
};

/**
 * Breadcrumbs with react router dom links.
 */
function RouterBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  return (
    <Stack mb={3} >
      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          underline='hover'
          color='inherit'
          component={LinkRouter}
          to='/'
        >
          Главная
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography
              color='inherit'
              key={to}
            >
              {pathMap[to] || 'Неизвестная страница'}
            </Typography>
          ) : (
            <Link
              underline='hover'
              color='inherit'
              to={to}
              key={to}
              component={LinkRouter}
            >
              {pathMap[to]}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
}

export default RouterBreadcrumbs;