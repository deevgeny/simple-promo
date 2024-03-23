import React from 'react';
import Home from './pages/Home';
import { useRoutes } from 'react-router-dom';
import FeaturedItemsGrid from './components/FeaturedItemsGrid';
import Items from './pages/Items';
import NotFound from './pages/NotFound';
import ItemDetails from './pages/ItemDetails';

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
      children: [
        { index: true, element: <FeaturedItemsGrid /> },
        { path: 'items', element: <Items /> },
        { path: 'items/:itemId', element: <ItemDetails /> }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

  return element;
}

export default App;
