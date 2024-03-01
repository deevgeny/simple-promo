import React from 'react';
import Appbar from './Appbar';
import Navbar from './Navbar';
import Banner from './Banner';

function Header() {
  return (
    <header>
      <Appbar />
      <Navbar />
      <Banner />
    </header>
  );
}

export default Header;