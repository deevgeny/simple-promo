import { render, screen, waitFor } from '@testing-library/react';
import { WebsiteContext } from '../../context/WebsiteContext';
import Footer from './Footer';

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

describe('<Footer /> component', () => {
  test('renders correctly', () => {
    const setWebsite = jest.fn();
    render(
      <WebsiteContext.Provider value={{ website, setWebsite }}>
        <Footer />
      </WebsiteContext.Provider>
    );
    expect(screen.getByText(/simple promo web site/i)).toBeInTheDocument();
    expect(screen.getByText(/city street number/i)).toBeInTheDocument();
    expect(screen.getByText(/\+7 \(999\) 888\-77\-66 simple@promo\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/все права защищены ©/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /simple promo/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /simple promo/i })).toHaveAttribute('href', '');
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});