import { render, screen } from '@testing-library/react';
import NoData from './NoData';

describe('<NoData /> component', () => {
  test('renders correctly', () => {
    render(<NoData />);
    expect(screen.getByText(/ничего не найдено/i)).toBeInTheDocument();
  });
});