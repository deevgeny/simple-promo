import React, { useEffect } from 'react';
import { Link as LinkRouter, useLocation } from 'react-router-dom';
import useBreadcrumbsContext from '../../hooks/useBreadcrumbsContext';
import {
  Stack,
  Breadcrumbs,
  Link,
  Typography
} from '@mui/material';

export const pathMap: { [key: string]: string } = {
  '/items': 'Просмотр',
};

/**
 * Breadcrumbs with react router dom links for web page header.
 */
function RouterBreadcrumbs() {
  const location = useLocation();
  const { end, setEnd } = useBreadcrumbsContext();
  const pathnames = location.pathname.split('/').filter((x) => x);

  useEffect(() => {
    setEnd(null);
    // eslint-disable-next-line
  }, [location]);
  
  return (
    <Stack mb={3}>
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
              {pathMap[to] || end || '...'}
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