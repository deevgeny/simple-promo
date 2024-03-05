import React, { useContext } from 'react';
import { WebsiteContext } from '../context/WebsiteContext';

/**
 * Custom hook to get web site context.
 * 
 * returns { website, setWebsite }
 */
function useWebsiteContext() {
  return useContext(WebsiteContext);
}

export default useWebsiteContext