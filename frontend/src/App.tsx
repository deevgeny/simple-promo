import React from 'react';
import Home from './pages/Home';
import { useRoutes } from 'react-router-dom';
import FeaturedItems from './components/FeaturedItems';
import NotFound from './pages/NotFound';

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
      children: [
        { index: true, element: <FeaturedItems /> },
        { path: 'new', element: <FeaturedItems /> }
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
