import React from 'react';
import Home from './pages/Home';
import { useRoutes } from 'react-router-dom';
import FeaturedItems from './components/FeaturedItems';

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
      children: [
        { index: true, element: <FeaturedItems /> },
        { path: 'new', element: <FeaturedItems /> }
      ]
    }
  ]);

  return element;
}

export default App;
