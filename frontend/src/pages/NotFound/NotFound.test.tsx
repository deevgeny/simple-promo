import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppProviders from '../../context/AppProviders';
import NotFound from './NotFound';

describe('<NotFound /> page', () => {
  test('renders correctly', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/not-found' />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('img', { name: /page not found/i })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('link', { name: /вернуться на главную/i })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('link', { name: /вернуться на главную/i })).toHaveAttribute('href', '/'));
  });

});