import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import AppProviders from '../../context/AppProviders';
import { ErrorContext } from '../../context/ErrorContext';
import FeaturedItemsGrid from './FeaturedItemsGrid';
import { testUtils } from '../../setupTests';

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

describe('<FeaturedItemsGrid /> component', () => {
  test('renders correctly with 3 items in response data', async () => {
    nock(testUtils.baseUrl)
    .defaultReplyHeaders(testUtils.responseHeaders)
    .get('/items')
    .query({ featured: true })
    .reply(200, { ...responseData });
    render(
      <AppProviders>
        <FeaturedItemsGrid />
      </AppProviders>
    );
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
    // Links
    await waitFor(() => expect(screen.getAllByRole('link')).toHaveLength(3));
    await waitFor(() => expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', 'items?category=1'));
    await waitFor(() => expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', 'items?category=2'));
    await waitFor(() => expect(screen.getAllByRole('link')[2]).toHaveAttribute('href', 'items?category=3'));
  });

  test('renders correctly with 404 response error', async () => {
    const error = undefined;
    const setError = jest.fn();
    nock(testUtils.baseUrl)
    .defaultReplyHeaders(testUtils.responseHeaders)
    .get('/items')
    .query({ featured: true })
    .reply(404);
    render(
      <ErrorContext.Provider value={{ error, setError }}>
        <FeaturedItemsGrid />
      </ErrorContext.Provider>
    );
    await waitFor(() => expect(setError).toBeCalled());
  });

});