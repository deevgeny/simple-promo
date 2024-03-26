import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import BackButton from './BackButton';

describe('<BackButton /> component', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<BackButton />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole('link', {name: /назад/i})).toBeInTheDocument();
  });
  
  test('goes back one step on click', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/one/two' />} /> {/* Jump to last page */}
          <Route path='one' element={<BackButton />} />
          <Route path='one/two' element={<BackButton />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole('link', {name: /назад/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /назад/i}).getAttribute('href')).toEqual('/one');
    // Click and check
    user.click(screen.getByRole('link', {name: /назад/i}));
    await waitFor(() => {
      expect(screen.getByRole('link', {name: /назад/i}).getAttribute('href')).toEqual('/');
    });
  });
});