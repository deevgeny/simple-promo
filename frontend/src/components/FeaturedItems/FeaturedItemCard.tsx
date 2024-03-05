import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
 } from '@mui/material';

interface IFeaturedItemProps {
  item: {
    id: number,
    date: string;
    description: string;
    image: string;
    imageLabel: string;
    title: string;
  };
};

function FeaturedItemCard(props: IFeaturedItemProps) {
  const { item } = props;

  return (
    <CardActionArea component='a' href='#'>
      <Card>
        <CardMedia
          component='img'
          //sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          image={item.image}
          alt={item.imageLabel}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component='h2' variant='h5'>
            {item.title}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            {item.date}
          </Typography>
          <Typography variant='subtitle1' paragraph>
            {item.description}
          </Typography>
          <Typography variant='subtitle1' color='primary'>
            Continue reading...
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

export default FeaturedItemCard;