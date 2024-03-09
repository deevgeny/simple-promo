import React, { useEffect } from 'react';
import Appbar from './Appbar';
// import Navbar from './Navbar';
import Banner from './Banner';
import { api } from '../../services/api';
import useWebsiteContext from '../../hooks/useWebsiteContext';

/**
 * Site header with appbar, navbar and banner. 
 */
function Header() {
  const { setWebsite } = useWebsiteContext();

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
      <Banner />
    </header>
  );
}

export default Header;