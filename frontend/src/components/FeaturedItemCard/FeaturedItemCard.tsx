import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
 } from '@mui/material';
 import { TItem } from '../ItemCard/ItemCard';

interface IFeaturedItemCardProps {
  item: TItem;
};

/**
 * Card component to display featured item.
 * @param props 
 */
function FeaturedItemCard(props: IFeaturedItemCardProps) {
  const { item } = props;

  return (
    <CardActionArea
      component='a'
      href={`items?category=${item.category.id}`}
      sx={{ height: '100%'}}
      >
      <Card sx={{ height: '100%'}}>
        <CardMedia
          component='img'
          height={300}
          image={item.picture}
          alt={item.category.name}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component='h2' variant='h5'>
            {item.category.name}
          </Typography>
          <Typography
            mb={1}
          >
            {item.category.description}
          </Typography>
          <Typography
          >
            {item.price} {'\u20BD'}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

export default FeaturedItemCard;