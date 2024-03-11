import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWebsiteContext from '../../hooks/useWebsiteContext';
import useErrorContext from '../../hooks/useErrorContext';
import { ApiError } from '../../services/error';
import { api } from '../../services/api';
import Appbar from './Appbar';
// import Navbar from './Navbar';
import Banner from './Banner';

/**
 * Site header with appbar, navbar and banner. 
 */
function Header() {
  const location = useLocation();
  const { setWebsite } = useWebsiteContext();
  const { setError } = useErrorContext();

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      const { response, error } = await api.getWebsite(controller);
      if (response?.data) {
        setWebsite(response.data);
      } else if (error) {
        setError(new ApiError(error));
      }
    };

    getData();
  
    // eslint-disable-next-line
  }, []);

  return (
    <header>
      <Appbar />
      {/*<Navbar />*/}
      {location.pathname === '/' ? <Banner /> : null}
    </header>
  );
}

export default Header;