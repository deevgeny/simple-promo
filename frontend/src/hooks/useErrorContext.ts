import { useContext } from 'react';
import { ErrorContext } from '../context/ErrorContext';

/**
 * Custom hook to provide error context.
 * 
 * returns { error, setError }
 */
function useErrorContext() {
  return useContext(ErrorContext);
}

export default useErrorContext;