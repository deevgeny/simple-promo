import React, { createContext, useState } from 'react';

type TWebsite = {
  id: number;
  url: string;
  name: string;
  slogan: string;
  email: string;
  telegram: string;
  phone: string | null;
  address: string;
};

type TWebsiteProvider = {
  children: React.ReactNode
};

interface IWebsiteContext {
  website: TWebsite | undefined;
  setWebsite: React.Dispatch<React.SetStateAction<TWebsite | undefined>>;
};

const WebsiteContext = createContext<IWebsiteContext>({} as IWebsiteContext);

/**
 * Provides website context
 */
function WebsiteProvider({ children }: TWebsiteProvider ) {
  const [ website, setWebsite ] = useState<TWebsite>();

  return (
    <WebsiteContext.Provider value={{ website, setWebsite }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export { WebsiteContext, WebsiteProvider };