import { render, screen, waitFor, act } from '@testing-library/react';
import FeaturedItemCard from './FeaturedItemCard';

const item = {
  id: 1,
  name: 'item',
  description: 'item description',
  picture: '#',
  price: '2500.00',
  visible: true,
  featured: true,
  category: {
    id: 1,
    name: 'category',
    description: 'category description'
  }
};

describe('<FeaturedItemCard /> component', () => {
  test('renders correctrly', () => {
    render(<FeaturedItemCard item={item} />);
    expect(screen.getByRole('img', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByText(/category description/i)).toBeInTheDocument();
    expect(screen.getByText(/2500\.00 ₽/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'items?category=1');
  });

});