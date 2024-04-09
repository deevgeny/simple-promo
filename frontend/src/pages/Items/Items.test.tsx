import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import AppProviders from '../../context/AppProviders';
import Items from './Items';
import { testUtils } from '../../setupTests';
import { MemoryRouter } from 'react-router-dom';

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

describe('<Items /> page', () => {
  test('renders correctly with empty response data', async () => {
    nock(testUtils.baseUrl)
      .defaultReplyHeaders(testUtils.responseHeaders)
      .get('/items')
      .reply(200, {});
    render(
      <AppProviders>
        <MemoryRouter>
          <Items />
        </MemoryRouter>
      </AppProviders>
    );
    await waitFor(() => expect(screen.getByText(/ничего не найдено/i)).toBeInTheDocument());
  });
 
  test('renders correctly with response data', async () => {
    nock(testUtils.baseUrl)
      .defaultReplyHeaders(testUtils.responseHeaders)
      .persist()
      .get('/categories')
      .reply(200, [
        responseData.results[0].category,
        responseData.results[1].category,
        responseData.results[2].category,
      ])
      .get('/items')
      .reply(200, { ...responseData });
    render(
      <AppProviders>
        <MemoryRouter>
          <Items />
        </MemoryRouter>
      </AppProviders>
    );

    await waitFor(() => expect(screen.getByRole('combobox', { name: /категория/i })).toBeInTheDocument());
    await waitFor(() => expect(screen.getAllByTestId('item-card')).toHaveLength(3));
  });   
})