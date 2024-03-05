import React from 'react';
import { Grid } from '@mui/material';
import FeaturedItemCard from './FeaturedItemCard';

const featuredItems = [
  {
    id: 1,
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    id: 2,
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    id: 3,
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

function FeaturedItems() {
  return (
    <Grid container spacing={4}>
      {featuredItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <FeaturedItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}

export default FeaturedItems;