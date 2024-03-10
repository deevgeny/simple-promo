import React, { createContext, useState } from 'react';

type TError = {
  // Дописать код
};

type TErrorProvider = {
  children: React.ReactNode; 
};

interface IErrorContext {
  error: TError | undefined;
  setError: React.Dispatch<React.SetStateAction<TError | undefined>>;
};

const ErrorContext = createContext<IErrorContext>({} as IErrorContext);

/**
 * Provides error context
 */
function ErrorProvider({ children }: TErrorProvider) {
  const [error, setError] = useState<TError>();
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export { ErrorContext, ErrorProvider };