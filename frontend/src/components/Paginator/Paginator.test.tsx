import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Paginator from './Paginator';

describe('<Paginator /> component', () => {
  test('renders correctly with all props', async () => {
    const previous = '/api/path?page=4'
    const next = '/api/path?page=6'
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/test?page=5' replace />} />
          <Route
            path='/test'
            element={<Paginator previous={previous} next={next} />}
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/страница 5/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
    await waitFor(() => {
      expect(screen.getAllByRole('button')[0]).not.toBeDisabled();
    });
    await waitFor(() => {
      expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-label', 'previous page');
    });
    await waitFor(() => {
      expect(screen.getAllByRole('button')[1]).not.toBeDisabled();
    });
    await waitFor(() => {
      expect(screen.getAllByRole('button')[1]).not.toBeDisabled();
    });
    await waitFor(() => {
      expect(screen.getAllByRole('button')[1]).toHaveAttribute('aria-label', 'next page');
    });
  });

  test('previous and next page buttons should be disabled', async () => {
    const previous = null
    const next = null
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/test?page=5' replace />} />
          <Route
            path='/test'
            element={<Paginator previous={previous} next={next} />}
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
    await waitFor(() => {
      expect(screen.getAllByRole('button')[0]).toBeDisabled();
    });
    await waitFor(() => {
      expect(screen.getAllByRole('button')[1]).toBeDisabled();
    });
  });

  test('navigate to previous page by button click', async () => {
    const user = userEvent.setup();
    const previous = '/api/path?page=4'
    const next = null
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/test?page=5' replace />} />
          <Route
            path='/test'
            element={<Paginator previous={previous} next={next} />}
          />
        </Routes>
      </MemoryRouter>
    );
    user.click(screen.getAllByRole('button')[0]);
    await waitFor(() => {
      expect(screen.getByText(/страница 4/i)).toBeInTheDocument();
    });
  });

  test('navigate to next page by button click', async () => {
    const user = userEvent.setup();
    const previous = null
    const next = '/api/path?page=6'
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/test?page=5' replace />} />
          <Route
            path='/test'
            element={<Paginator previous={previous} next={next} />}
          />
        </Routes>
      </MemoryRouter>
    );
    user.click(screen.getAllByRole('button')[1]);
    await waitFor(() => {
      expect(screen.getByText(/страница 6/i)).toBeInTheDocument();
    });
  });

  test('navigate to first page by button click', async () => {
    const user = userEvent.setup();
    const previous = '/api/path'
    const next = null
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/test?page=5' replace />} />
          <Route
            path='/test'
            element={<Paginator previous={previous} next={next} />}
          />
        </Routes>
      </MemoryRouter>
    );
    user.click(screen.getAllByRole('button')[0]);
    await waitFor(() => {
      expect(screen.getByText(/страница 1/i)).toBeInTheDocument();
    });
  });
});