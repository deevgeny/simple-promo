import { AxiosError } from 'axios';
import { ApiError } from '../services/error';
import useErrorContext from './useErrorContext';

/**
 * Custom hook to set response error to error context.
 * 
 * returns { setResponseError }
 */
function useResponseError() {
  const { setError } = useErrorContext();

  function setResponseError(error: AxiosError) {
    setError(new ApiError(error));
  }

  return { setResponseError };
}

export default useResponseError;