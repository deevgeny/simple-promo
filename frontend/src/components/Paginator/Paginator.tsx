import React from 'react';
import {
  Stack,
  IconButton,
  Typography
} from '@mui/material';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

interface IPaginatorProps {
  previous: string | null;
  next: string | null;
};

/**
 * Renders current page number and previous/next buttons. Uses backend API 
 * pagination links from response data.
 */
function Paginator(props: IPaginatorProps) {
  const { previous, next } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const getPath = (path: string | null) => {
    if (path && path.indexOf('?') > -1) {
      return `${location.pathname}${path.slice(path.indexOf('?'))}`;
    } else {
      return location.pathname;
    }
  };

  return (
    <Stack direction='row' justifyContent='center' mx='auto' mt={4}>
      <IconButton
        aria-label='previous page'
        disabled={!Boolean(previous)}
        onClick={() => navigate(getPath(previous))}
      >
        <NavigateBeforeOutlinedIcon/>
      </IconButton>
      <Typography my='auto' mx={2} color='text.secondary'>
        {`Страница ${searchParams.get('page') || 1}`}
      </Typography>
      <IconButton
        aria-label='next page'
        disabled={!Boolean(next)}
        onClick={() => navigate(getPath(next))}
      >
        <NavigateNextOutlinedIcon/>
      </IconButton>
    </Stack>
  );
}

export default Paginator;