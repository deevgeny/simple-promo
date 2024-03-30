import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorContext } from '../../context/ErrorContext';
import { AppError } from '../../services/error';
import ErrorDialog from './ErrorDialog';

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

  test('renders correctly with error', async () => {
    const error = new AppError({ title: 'error', text: 'test error'});
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
});
