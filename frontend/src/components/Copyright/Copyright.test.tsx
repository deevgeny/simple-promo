import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { WebsiteContext } from '../../context/WebsiteContext';
import Copyright from './Copyright';

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

describe('<Copyright /> component', () => {
  test('renders correctly', () => {
    const setWebsite = jest.fn();
    render(
      <MemoryRouter>
        <Routes>
          <Route 
            path='/'
            element={
              <WebsiteContext.Provider value={{ website, setWebsite }} >
                <Copyright />
              </WebsiteContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/все права защищены ©/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /simple promo/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /simple promo/i })).toHaveAttribute('href', '');
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });

  test('renders correctly without site name', () => {
    const setWebsite = jest.fn();
    const customWebsite = { ...website, name: '' };
    render(
      <WebsiteContext.Provider value={{ website: customWebsite, setWebsite }} >
        <Copyright />
      </WebsiteContext.Provider>
    );
    expect(screen.getByText(/все права защищены ©/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('');
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });
  
});