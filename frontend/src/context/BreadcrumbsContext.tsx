import React, { createContext, useState } from 'react';

interface IBreadcrumbProviderProps {
  children: React.ReactNode
};

interface IWebsiteContext {
  end: string | null;
  setEnd: React.Dispatch<React.SetStateAction<string | null>>;
};

const BreadcrumbsContext = createContext<IWebsiteContext>(
  {} as IWebsiteContext
);

/**
 * Provides breadcrumbs context. 
 */
function BreadcrumbsProvider({ children }: IBreadcrumbProviderProps) {
  const [end, setEnd ] = useState<string | null>(null);

  return (
    <BreadcrumbsContext.Provider value={{ end, setEnd }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export { BreadcrumbsContext, BreadcrumbsProvider };