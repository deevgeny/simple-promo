import React from 'react';
import { Grid } from '@mui/material';
import FeaturedItemCard from './FeaturedItemCard';

const featuredItems = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
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
      {featuredItems.map((post) => (
        <Grid item xs={12} sm={6} md={4} >
          <FeaturedItemCard key={post.title} post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default FeaturedItems;