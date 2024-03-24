import React, { useEffect, useState } from 'react';
import useResponseError from '../../hooks/useResponseError';
import { api } from '../../services/api';
import { Grid } from '@mui/material';
import FeaturedItemCard from '../FeaturedItemCard';
import { TItem } from '../ItemCard/ItemCard';

/**
 * Grid component with featured items cards.
 */
function FeaturedItemsGrid() {
  const [featuredItems, setFeaturedItems] = useState<TItem[]>();
  const { setResponseError } = useResponseError();

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      const params = { featured: true };
      const { response, error } = await api.getItems(controller, params);
      if (response?.data) {
        setFeaturedItems(response.data.results);
      } else if (error) {
        setResponseError(error);
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

export default FeaturedItemsGrid;