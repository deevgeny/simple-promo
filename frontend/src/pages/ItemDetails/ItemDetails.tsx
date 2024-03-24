import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import useErrorContext from '../../hooks/useErrorContext';
import useBreadcrumbsContext from '../../hooks/useBreadcrumbsContext';
import { ApiError } from '../../services/error';
import { TItem } from '../../components/ItemCard';
import {
  Grid,
  Typography,
  Box,
  styled
} from '@mui/material';
import BackButton from '../../components/BackButton';

const StyledImg = styled(Box)<{src: string | undefined}>(({ theme, src }) => ({
  objectFit: 'cover',
  objectPosition: 'center',
borderRadius: 6
}));

function ItemDetails() {
  const [item, setItem] = useState<TItem>(); 
  const { itemId } = useParams();
  const { setError } = useErrorContext();
  const { setEnd } = useBreadcrumbsContext();

  useEffect(() => {
    const controller = new AbortController();
    const getItem = async () => {
      const { response, error } = await api.getItem(controller, itemId);
      if (response?.data) {
        setItem(response.data);
        setEnd((
          `${response.data?.category?.name}
          ${response.data?.name?.toLowerCase()}`
        ));
      } else if (error) {
        setError(new ApiError(error));
      }
    };
    
    getItem();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} textAlign='center'>
          <StyledImg
            component='img'
            src={item?.picture}
            height={400}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant='h5'>{item?.category.name}</Typography>
          <Typography variant='h6'>{item?.name}</Typography>
          <Typography color='text.secondary'>{item?.description}</Typography>
          <Typography mt={2}>{item?.price} {'\u20BD'}</Typography>
          <Typography mt={4}>Заинтересовал товар?</Typography>
          <Typography>Пишите на почту или в телеграм.</Typography>
        </Grid>
      </Grid>
      <BackButton />
    </>
  );
}

export default ItemDetails;