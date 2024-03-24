import React, { createContext, useState } from 'react';

type TWebsite = {
  id: number;
  url: string;
  name: string;
  slogan: string;
  banner: string | null;
  email: string;
  telegram: string;
  phone: string | null;
  address: string | null;
};

type TWebsiteProvider = {
  children: React.ReactNode;
};

interface IWebsiteContext {
  website: TWebsite | undefined;
  setWebsite: React.Dispatch<React.SetStateAction<TWebsite | undefined>>;
};

const website: TWebsite = {
  id: 1,
  url: '#',
  name: 'Simple promo',
  slogan: 'Simple promo web site',
  banner: null,
  email: '',
  telegram: '#',
  phone: null,
  address: ''
};

const WebsiteContext = createContext<IWebsiteContext>(
  { website } as IWebsiteContext
);

/**
 * Provides website context
 */
function WebsiteProvider({ children }: TWebsiteProvider ) {
  const [website, setWebsite] = useState<TWebsite>();

  return (
    <WebsiteContext.Provider value={{ website, setWebsite }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export { WebsiteContext, WebsiteProvider };