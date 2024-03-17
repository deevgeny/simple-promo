import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
 } from '@mui/material';


 type TCategory = {
  id: number;
  name: string;
  description: string;
};

export type TFeaturedItem = {
  id: number;
  name: string;
  description: string;
  picture: string;
  price: string;
  visible: boolean;
  featured: boolean;
  category: TCategory;
};

interface IFeaturedItemProps {
  item: TFeaturedItem;
};

function FeaturedItemCard(props: IFeaturedItemProps) {
  const { item } = props;

  return (
    <CardActionArea
      component='a'
      href={`${process.env.PUBLIC_URL}/items?category=${item.category.id}`}
      >
      <Card sx={{ minHeight: 520 }}>
        <CardMedia
          component='img'
          //className='img-scale-down'
          //sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          sx={{ height: 300 }}
          image={item.picture}
          alt={item.category.name}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component='h2' variant='h5'>
            {item.category.name}
          </Typography>
          <Typography variant='subtitle1' paragraph>
            {item.description}
          </Typography>
          <Typography variant='subtitle1' paragraph>
            {item.price} {'\u20BD'}
          </Typography>
          <Typography variant='subtitle1' color='primary'>
            Подробнее...
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

export default FeaturedItemCard;