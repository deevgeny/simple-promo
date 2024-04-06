import { render, screen, waitFor, act } from '@testing-library/react';
import nock from 'nock';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AppProviders from '../../context/AppProviders';
import { testUtils } from '../../setupTests';
import Layout from './Layout';
import FeaturedItemsGrid from '../../components/FeaturedItemsGrid';

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

const responseData = {
    "count": 3,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "name 1",
            "description": "description 1",
            "picture": "http://127.0.0.1:8000/media/item-images/image-1.jpg",
            "price": "2500.00",
            "visible": true,
            "featured": true,
            "category": {
                "id": 1,
                "name": "category 1",
                "description": "category description 1"
            }
        },
        {
            "id": 2,
            "name": "name 2",
            "description": "description 2",
            "picture": "http://127.0.0.1:8000/media/item-images/image-2.jpg",
            "price": "3000.00",
            "visible": true,
            "featured": true,
            "category": {
                "id": 2,
                "name": "category 2",
                "description": "category description 2"
            }
        },
        {
            "id": 3,
            "name": "name 3",
            "description": "description 3",
            "picture": "http://127.0.0.1:8000/media/item-images/image-3.jpg",
            "price": "3500.00",
            "visible": true,
            "featured": true,
            "category": {
                "id": 3,
                "name": "category 3",
                "description": "category description 3"
            }
        }
    ]
};

describe('<Layout /> page', () => {
  test('renders correctly', async () => {
    nock(testUtils.baseUrl)
    .defaultReplyHeaders(testUtils.responseHeaders)
    .get('/website')
    .reply(200, { ... website })
    .get('/items')
    .query({ featured: true })
    .reply(200, { ...responseData });
    render(
      <AppProviders>
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<FeaturedItemsGrid />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AppProviders>
    );
    // Check header rendering
    await waitFor(() => expect(screen.getAllByRole('heading', { name: /simple promo/i })).toHaveLength(2));
    await waitFor(() => expect(screen.getByTestId('MailOutlineIcon')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('TelegramIcon')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('banner')).toBeInTheDocument());
    await waitFor(() => expect(screen.getAllByText(/simple promo web site/i )).toHaveLength(2));
    await waitFor(() => expect(screen.getByAltText(/simple promo/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByAltText(/simple promo/i)).toHaveAttribute('src', '#'));
    
    // Check featured items rendering
    // Item 1 content
    await waitFor(() => expect(screen.getByRole('img', {  name: /category 1/i})).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('heading', {  name: /category 1/i})).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/description 1/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/2500\.00 ₽/i)).toBeInTheDocument());
    // Item 2 content
    await waitFor(() => expect(screen.getByRole('img', {  name: /category 2/i})).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('heading', {  name: /category 2/i})).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/description 2/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/3000\.00 ₽/i)).toBeInTheDocument());
    // Item 3 content
    await waitFor(() => expect(screen.getByRole('img', {  name: /category 3/i})).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('heading', {  name: /category 3/i})).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/description 3/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/3500\.00 ₽/i)).toBeInTheDocument());
    // Item links
    await waitFor(() => expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', 'items?category=1'));
    await waitFor(() => expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', 'items?category=2'));
    await waitFor(() => expect(screen.getAllByRole('link')[2]).toHaveAttribute('href', 'items?category=3'));

    // Check footer rendering
    await waitFor(() => expect(screen.getByText(/city street number/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/\+7 \(999\) 888\-77\-66 simple@promo\.com/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/все права защищены ©/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('link', { name: /simple promo/i })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('link', { name: /simple promo/i })).toHaveAttribute('href', ''));
    await waitFor(() => expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument());
  });

});