import { render, screen, waitFor, act } from '@testing-library/react';
import nock from 'nock';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppProviders from '../../context/AppProviders';
import { testUtils } from '../../setupTests';
import ItemDetails from './ItemDetails';

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

describe('<ItemDetails /> page', () => {
  test('renders correctly', async () => {
    nock(testUtils.baseUrl)
    .defaultReplyHeaders(testUtils.responseHeaders)
    .get('/items/1')
    .reply(200, { ...item });
    render(
      <AppProviders>
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<Navigate to='/items/1' />} />
            <Route path='/items/:itemId' element={<ItemDetails />} />
          </Routes>
        </MemoryRouter>
      </AppProviders>
    );
    await waitFor(() => expect(screen.getByRole('img', {  name: /item/i})).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('heading', { name: /category/i })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('heading', { name: /item/i })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/item description/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/2500\.00 ₽/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/заинтересовал товар\?/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/пишите на почту или в телеграм\./i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('link', { name: /назад/i })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('link', { name: /назад/i })).toHaveAttribute('href', '/items'));
  });

});