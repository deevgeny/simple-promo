import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { WebsiteContext } from '../../context/WebsiteContext';
import Banner from './Banner';

const website = {
  id: 1,
  url: '#',
  name: 'Simple promo',
  slogan: 'Simple promo web site',
  banner: null,
  email: '',
  telegram: '#',
  phone: null,
  address: ''
};

describe('<Banner /> component', () => {
  test('renders correctly with default banner image', () => {
    const setWebsite = jest.fn();

    render(
      <WebsiteContext.Provider value={{ website, setWebsite }}>
        <Banner />
      </WebsiteContext.Provider>
    );
    
    expect(screen.getByTestId('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /simple promo/i })).toBeInTheDocument();
    expect(screen.getByText(/simple promo web site/i )).toBeInTheDocument();
    expect(screen.getByAltText(/simple promo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/simple promo/i)).toHaveAttribute('src', '#');
  });

  test('renders correctly with backend banner image', () => {
    const setWebsite = jest.fn();
    const banner = '/media/12345.png';
    const custom_website = { ...website, banner };
    
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path='/'
            element={
              <WebsiteContext.Provider value={{ website: custom_website, setWebsite }}>
                <Banner />
              </WebsiteContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByAltText(/simple promo/i)).toHaveAttribute('src', `http://127.0.0.1:8000${banner}`);
  });

});