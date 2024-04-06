import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom';
import ItemCard from './ItemCard';
import { createMemoryHistory } from '@remix-run/router';

const item = {
  id: 1,
  name: 'item',
  description: 'item description',
  picture: '/media/image.jpg',
  price: '2500.00',
  visible: true,
  featured: true,
  category: {
    id: 1,
    name: 'category',
    description: 'category description'
  }
};

describe('<ItemCard /> component', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<ItemCard item={item} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole('img', { name: /item/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByText(/item description/i)).toBeInTheDocument();
    expect(screen.getByText(/2500\.00 ₽/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /подробнее/i })).toBeInTheDocument();
    expect(screen.getByTestId('backdrop-image')).toBeInTheDocument();
    expect(screen.getByTestId('backdrop-image')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('backdrop-image')).toHaveStyle('opacity: 0; visibility: hidden;');
  });

  test('backdrop should open by image click', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<ItemCard item={item} />} />
        </Routes>
      </MemoryRouter>
    );
    // Check that backdrop rendered
    expect(screen.getByTestId('backdrop-image')).toBeInTheDocument();
    // Click to open
    user.click(screen.getByRole('img', { name: /item/i }));
    await waitFor(() => expect(screen.getByTestId('backdrop-image')).toHaveStyle('opacity: 1; visibility: visible;'));
  });

  test('backdrop should close by click', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<ItemCard item={item} />} />
        </Routes>
      </MemoryRouter>
    );
    // Click to open
    user.click(screen.getByRole('img', { name: /item/i }));
    await waitFor(() => expect(screen.getByTestId('backdrop-image')).toHaveStyle('opacity: 1; visibility: visible;'));
    // Click to close
    user.click(screen.getByTestId('backdrop-image'));
    await waitFor(() => expect(screen.getByTestId('backdrop-image')).toHaveStyle('opacity: 0; visibility: hidden;'));
  });

});