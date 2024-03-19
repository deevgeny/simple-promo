import React, { useEffect, useState } from 'react';
import useErrorContext from '../../hooks/useErrorContext';
import { api } from '../../services/api';
import { ApiError } from '../../services/error';
import { Grid } from '@mui/material';
import FeaturedItemCard, { TItem } from './FeaturedItemCard';


function FeaturedItems() {
  const [featuredItems, setFeaturedItems] = useState<TItem[]>();
  const { setError } = useErrorContext();

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      const params = { featured: true };
      const { response, error } = await api.getItems(controller, params);
      if (response?.data) {
        setFeaturedItems(response.data.results);
      } else if (error) {
        setError(new ApiError(error));
      }
    };

    getData();

    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={4}>
      {featuredItems?.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <FeaturedItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}

export default FeaturedItems;