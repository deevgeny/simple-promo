import React from 'react';
import {
  Card,
  //CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Divider
 } from '@mui/material';
import { TItem } from '../../components/FeaturedItems/FeaturedItemCard'; 

interface IItemCardProps {
  item: TItem;
};

function ItemCard(props: IItemCardProps) {
  const { item } = props;
  return (
    <Card sx={{ height: 500 }}>
      <CardMedia
        component='img'
        //className='img-scale-down'
        //sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
        sx={{ height: 300 }}
        image={item.picture}
        alt={item.name}
      />
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
    </Card>
  );
}

export default ItemCard;