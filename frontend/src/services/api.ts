import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { axiosNoAuth } from './axios';

export type TRequestData = {
  [key: string]: any
};

export type TQueryParams = {
  [key: string]: any
};

/**
 * Makes axios requests, handles it and returns response or error.
 * @param config - axios config object
 * @param auth - authenticated/unauthenticated request boolean flag   
 * @returns axiosResponse | axiosError | undefined
 */
const requestHandler = async (
  config: AxiosRequestConfig,
  auth: boolean = true
) => {
  let response: AxiosResponse | undefined;
  let error: AxiosError | undefined;
  try {
    if (auth) {
      // Use axiosJWT instance to handle token refresh in interceptors
      // response = await axiosJWT(config);
      //return response;
    } else {
      // Use axiosGuest instance to skip token refresh for 401 errors
      response = await axiosNoAuth(config);
    }
  } catch(err) {
    // If condition to handle react strict mode
    if (!config.signal?.aborted) {
      error = err as AxiosError;
    }
  }
  return { response, error };
};

export const api = {
  getWebsite: (controller: AbortController) => {
    return requestHandler(
      {
        method: 'get',
        url: '/website',
        signal: controller.signal
      },
      false
    );
  },
  getCategories: (controller: AbortController) => {
    return requestHandler(
      {
        method: 'get',
        url: '/categories',
        signal: controller.signal
      },
      false
    );
  },
  getItems: (controller: AbortController, params?: TQueryParams) => {
    return requestHandler(
      {
        method: 'get',
        url: '/items',
        params,
        signal: controller.signal
      },
      false
    );
  },
  getItem: (controller: AbortController, id: string | undefined) => {
    return requestHandler(
      {
        method: 'get',
        url: `/items/${id}`,
        signal: controller.signal
      },
      false
    );
  }
};