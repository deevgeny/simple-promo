import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Backdrop,
 } from '@mui/material';
import { TItem } from '../../components/FeaturedItems/FeaturedItemCard'; 

interface IItemCardProps {
  item: TItem;
};

function ItemCard(props: IItemCardProps) {
  const { item } = props;
  const [backdropOpen, setBackdropOpen] = useState(false);
  console.log(window.innerWidth)

  return (
    <Card sx={{ height: 500 }}>
      <CardActionArea onClick={() => setBackdropOpen(true)}>
        <CardMedia
          component='img'
          sx={{ height: 300 }}
          image={item.picture}
          alt={item.name}
        />
      </CardActionArea>
      <CardContent sx={{ flex: 1 }}>
        <Box>
          <Typography component='h2' variant='h5'>
            {item.category.name}
          </Typography>
          <Typography variant='body1'>
            {item.name}
          </Typography>
          <Typography variant='body1' color='text.secondary' mt={1}>
            {item.description}
          </Typography>
        </Box>
        <Box>
          <Typography variant='body1'>
            {item.price} {'\u20BD'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size='small'>Заказать</Button>
      </CardActions>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
        onClick={() => setBackdropOpen(false)}
      >
        <Box
          component='img'
          src={item.picture} 
          alt={item.name}
          loading='lazy'
          sx={{
            maxWidth: {xs: window.innerWidth, sm: 600},
            my: 'auto',
            p: 6,
            borderRadius: 15
          }}
        />
      </Backdrop>
    </Card>
  );
}

export default ItemCard;