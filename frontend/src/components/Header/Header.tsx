import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWebsiteContext from '../../hooks/useWebsiteContext';
import useResponseError from '../../hooks/useResponseError';
import { api } from '../../services/api';
import Appbar from '../Appbar';
import Banner from '../Banner';
//import Navbar from '../Navbar';
import RouterBreadcrumbs from '../RouterBreadcrumbs';

/**
 * Page header component. 
 */
function Header() {
  const location = useLocation();
  const { setResponseError } = useResponseError();
  const { setWebsite } = useWebsiteContext();

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      const { response, error } = await api.getWebsite(controller);
      if (response?.data) {
        setWebsite(response.data);
      } else if (error) {
        setResponseError(error);
      }
    };

    getData();
  
    // eslint-disable-next-line
  }, []);

  return (
    <header>
      <Appbar />
      {/*<Navbar />*/}
      {location.pathname === '/' ? <Banner /> : <RouterBreadcrumbs />}
    </header>
  );
}

export default Header;