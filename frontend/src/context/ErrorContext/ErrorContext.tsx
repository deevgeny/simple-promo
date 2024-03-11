import React, { createContext, useState } from 'react';
import { ErrorInterface } from '../../services/error';

type TErrorProvider = {
  children: React.ReactNode; 
};

interface IErrorContext {
  error: ErrorInterface | undefined;
  setError: React.Dispatch<React.SetStateAction<ErrorInterface | undefined>>;
};

const ErrorContext = createContext<IErrorContext>({} as IErrorContext);

/**
 * Provides error context
 */
function ErrorProvider({ children }: TErrorProvider) {
  const [error, setError] = useState<ErrorInterface>();
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export { ErrorContext, ErrorProvider };