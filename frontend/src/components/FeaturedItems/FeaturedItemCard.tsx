import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
 } from '@mui/material';

interface FeaturedItemProps {
  post: {
    date: string;
    description: string;
    image: string;
    imageLabel: string;
    title: string;
  };
};

function FeaturedItemCard(props: FeaturedItemProps) {
  const { post } = props;

  return (
    <CardActionArea component='a' href='#'>
      <Card>
        <CardMedia
          component='img'
          //sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          image={post.image}
          alt={post.imageLabel}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component='h2' variant='h5'>
            {post.title}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            {post.date}
          </Typography>
          <Typography variant='subtitle1' paragraph>
            {post.description}
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