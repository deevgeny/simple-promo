import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWebsiteContext from '../../hooks/useWebsiteContext';
import { api } from '../../services/api';
import Appbar from './Appbar';
// import Navbar from './Navbar';
import Banner from './Banner';

/**
 * Site header with appbar, navbar and banner. 
 */
function Header() {
  const { setWebsite } = useWebsiteContext();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      const { response, error } = await api.getWebsite(controller);
      if (response?.data) {
        setWebsite(response.data);
      } else if (error) {
        console.log(error)
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