import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export type TCategory = {
  id: number;
  name: string;
  description: string;
};

export type TItem = {
  id: number;
  name: string;
  description: string;
  picture: string;
  price: string;
  visible: boolean;
  featured: boolean;
  category: TCategory;
};

interface IItemCardProps {
  item: TItem;
};

/**
 * Card component to display item.
 * @param props 
 */
function ItemCard(props: IItemCardProps) {
  const { item } = props;
  const [backdropOpen, setBackdropOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Card sx={{ height: 500 }}>
      <CardActionArea onClick={() => setBackdropOpen(true)}>
        <CardMedia
          component='img'
          height={300}
          image={item.picture}
          alt={item.name}
        />
      </CardActionArea>
      <CardContent sx={{ flex: 1 }}>
        <Typography component='h2' variant='h5'>
          {item.category.name}
        </Typography>
        <Typography
          variant='body1'
          overflow='hidden'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
        >
          {item.name}
        </Typography>
        <Typography
          variant='body1'
          my={1}
          color='text.secondary'
          overflow='hidden'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
        >
          {item.description}
        </Typography>
        <Typography>
          {item.price} {'\u20BD'}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end'}}>
        <Button
          size='small'
          onClick={() => navigate(`${item.id}`)}
        >
          Подробнее
        </Button>
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
            maxWidth: { xs: window.innerWidth, sm: 600 },
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