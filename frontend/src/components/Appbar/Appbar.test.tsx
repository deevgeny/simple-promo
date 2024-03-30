import { render, screen } from '@testing-library/react';
import { WebsiteContext } from '../../context/WebsiteContext';
import Appbar from './Appbar';

const website = {
  id: 1,
  url: '#',
  name: 'Simple promo',
  slogan: 'Simple promo web site',
  banner: null,
  email: 'site@example.com',
  telegram: '@site',
  phone: null,
  address: ''
};

describe('<Appbar /> component', () => {
  test('renders correctly', () => {
    const setWebsite = jest.fn();
    render(
      <WebsiteContext.Provider value={{ website, setWebsite }} >
        <Appbar />
      </WebsiteContext.Provider>
    );
    expect(screen.getByRole('heading', { name: /simple promo/i })).toBeInTheDocument();
    expect(screen.getByTestId('MailOutlineIcon')).toBeInTheDocument();
    expect(screen.getByTestId('TelegramIcon')).toBeInTheDocument();
  });

  test('renders correctly without site name', () => {
    const customWebsite = { ...website, name: '' };
    const setWebsite = jest.fn();
    render(
      <WebsiteContext.Provider value={{ website: customWebsite, setWebsite }} >
        <Appbar />
      </WebsiteContext.Provider>
    );
    expect(screen.queryByRole('heading')).toHaveTextContent('');
    expect(screen.getByTestId('MailOutlineIcon')).toBeInTheDocument();
    expect(screen.getByTestId('TelegramIcon')).toBeInTheDocument();
  });

  test('renders correctly without email', () => {
    const customWebsite = { ...website, email: '' };
    const setWebsite = jest.fn();
    render(
      <WebsiteContext.Provider value={{ website: customWebsite, setWebsite }} >
        <Appbar />
      </WebsiteContext.Provider>
    );
    expect(screen.getByRole('heading', { name: /simple promo/i })).toBeInTheDocument();
    expect(screen.queryByTestId('MailOutlineIcon')).not.toBeInTheDocument();
    expect(screen.getByTestId('TelegramIcon')).toBeInTheDocument();
  });

  test('renders correctly without telegram', () => {
    const customWebsite = { ...website, telegram: '' };
    const setWebsite = jest.fn();
    render(
      <WebsiteContext.Provider value={{ website: customWebsite, setWebsite }} >
        <Appbar />
      </WebsiteContext.Provider>
    );
    expect(screen.getByRole('heading', { name: /simple promo/i })).toBeInTheDocument();
    expect(screen.getByTestId('MailOutlineIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('TelegramIcon')).not.toBeInTheDocument();
  });

});