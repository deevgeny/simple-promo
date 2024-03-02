import React, { createContext, useState } from 'react';

type TWebSite = {
  id: number;
  url: string;
  name: string;
  slogan: string;
  email: string;
  telegram: string;
  phone: string | null;
  address: string;
};

type TWebSiteProvider = {
  children: React.ReactNode
};

interface IWebSiteContext {
  webSite: TWebSite | undefined;
  setWebSite: React.Dispatch<React.SetStateAction<TWebSite | undefined>>;
};

const WebSiteContext = createContext<IWebSiteContext>({} as IWebSiteContext);
/**
 * Provides context with information about website
 */
function WebSiteProvider({ children }: TWebSiteProvider ) {
  const [ webSite, setWebSite ] = useState<TWebSite>();
  return (
    <WebSiteContext.Provider value={{ webSite, setWebSite }}>
      {children}
    </WebSiteContext.Provider>
  );
}

export default WebSiteProvider;