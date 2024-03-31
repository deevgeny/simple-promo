import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AppProviders from '../../context/AppProviders';
import { ErrorContext } from '../../context/ErrorContext';
import { AppError } from '../../services/error';
import ErrorDialog from './ErrorDialog';
import Layout from '../../pages/Layout';

describe('<ErrorDialog /> component', () => {
  test('renders correctly without error', () => {
    const error = undefined;
    const setError = jest.fn();
    render(
      <ErrorContext.Provider value={{ error, setError }}>
        <ErrorDialog />
      </ErrorContext.Provider>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders correctly with error', () => {
    const error = new AppError({ title: 'error', text: 'test error'});
    const setError = jest.fn();
    render(
      <ErrorContext.Provider value={{ error, setError }}>
        <ErrorDialog />
      </ErrorContext.Provider>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('error')).toBeInTheDocument();
    expect(screen.getByText('test error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /назад/i })).toBeInTheDocument();
  });

  test('setError(undefined) called after button click', async () => {
    let error = new AppError({ title: 'error', text: 'test error'});
    const setError = jest.fn();
    const user = userEvent.setup();
    render(
      <ErrorContext.Provider value={{ error, setError }}>
        <ErrorDialog />
      </ErrorContext.Provider>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    user.click(screen.getByRole('button', { name: /назад/i }));
    await waitFor(() => {
      expect(setError).toBeCalled();
    });
    await waitFor(() => {
      expect(setError).toHaveBeenCalledWith(undefined);
    });
  });

/*   test('closed after button click', async () => {
    const user = userEvent.setup();
    render(
      <AppProviders>
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<Layout />} />
          </Routes>
        </MemoryRouter>
      </AppProviders>
    );
    // Check that error dialog opens with network error message
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /ошибка сети/i })).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/ошибка получения данных от сервера/i)).toBeInTheDocument();
    });
    // Click error dialog back button
    await act(async() => {
      user.click(screen.getByRole('button', { name: /назад/i }));
    });
    // Check that error dialog is closed after button click
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  }); */
});
