import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WebsiteContext } from '../../context/WebsiteContext';
import { BreadcrumbsProvider } from '../../context/BreadcrumbsContext';
import { ErrorProvider } from '../../context/ErrorContext';
import Header from './Header';

const website = {
  id: 1,
  url: '#',
  name: 'Simple promo',
  slogan: 'Simple promo web site',
  banner: null,
  email: 'simple@promo.com',
  telegram: '#',
  phone: '+7 (999) 888-77-66',
  address: 'City street number'
};

describe('<Header /> component', () => {
  test('renders correctly on root path', () => {
    const setWebsite = jest.fn();
    render(
      <MemoryRouter>
        <Routes>
          <Route 
            path='/'
            element={
              <WebsiteContext.Provider value={{ website, setWebsite }}>
                <Header />
              </WebsiteContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>

    );
    // Appbar and banner headers
    expect(screen.getAllByRole('heading', { name: /simple promo/i })).toHaveLength(2);
    // Appbar included in header
    expect(screen.getByTestId('MailOutlineIcon')).toBeInTheDocument();
    expect(screen.getByTestId('TelegramIcon')).toBeInTheDocument();
    // Banner included in header
    expect(screen.getByTestId('banner')).toBeInTheDocument();
    expect(screen.getByText(/simple promo web site/i )).toBeInTheDocument();
    expect(screen.getByAltText(/simple promo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/simple promo/i)).toHaveAttribute('src', '#');
  });

  test('renders correctly on non root path', () => {
    const setWebsite = jest.fn();
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/nonroot' />} />
          <Route 
            path='/nonroot'
            element={
              <ErrorProvider>
                <BreadcrumbsProvider>
                  <WebsiteContext.Provider value={{ website, setWebsite }}>
                    <Header />
                  </WebsiteContext.Provider>
                </BreadcrumbsProvider>
              </ErrorProvider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    // Appbar included in header
    expect(screen.queryByRole('heading', { name: /simple promo/i })).toBeInTheDocument();
    expect(screen.getByTestId('MailOutlineIcon')).toBeInTheDocument();
    expect(screen.getByTestId('TelegramIcon')).toBeInTheDocument();
    // Banner not included in header
    expect(screen.queryByTestId('banner')).not.toBeInTheDocument();
    expect(screen.queryByText(/simple promo web site/i )).not.toBeInTheDocument();
    expect(screen.queryByAltText(/simple promo/i)).not.toBeInTheDocument();
    // Breadcrumbs included in header
    expect(screen.getByRole('link', { name: /главная/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /главная/i })).toHaveAttribute('href', '/');
    expect(screen.getByText(/\.\.\./i)).toBeInTheDocument();
  });

  test('renders correctly with 200 api response', () => {

  });

  test('renders correctly with 404 api response', () => {

  });

});