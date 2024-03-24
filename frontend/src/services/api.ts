import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { axiosNoAuth } from './axios';

export type TRequestData = {
  [key: string]: any
};

export type TQueryParams = {
  [key: string]: any
};

/**
 * Makes unauthenticated requests, handles it and returns response or error.
 * @param config - axios config object
 * @returns axiosResponse | axiosError | undefined
 */
export const noAuthRequestHandler = async (config: AxiosRequestConfig) => {
  let response: AxiosResponse | undefined;
  let error: AxiosError | undefined;
  try {
    // Use axiosNoAuth instance to make unauthenticated requests
    response = await axiosNoAuth(config);
  } catch(err) {
    // Handle react strict mode
    if (!config.signal?.aborted) {
      error = err as AxiosError;
    }
  }
  return { response, error };
};

/**
 * Makes authenticated requests, handles it and returns response or error.
 * @param config - axios config object
 * @returns axiosResponse | axiosError | undefined
 */
export const authRequestHandler = async (config: AxiosRequestConfig) => {
  let response: AxiosResponse | undefined;
  let error: AxiosError | undefined;
  try {
    // Use axiosAuth instance to handle authentication headers
    // response = await axiosAuth(config);
  } catch(err) {
    // Handle react strict mode
    if (!config.signal?.aborted) {
      error = err as AxiosError;
    }
  }
  return { response, error };
};

export const api = {
  getWebsite: (controller: AbortController) => {
    return noAuthRequestHandler(
      {
        method: 'get',
        url: '/website',
        signal: controller.signal
      },
    );
  },
  getCategories: (controller: AbortController) => {
    return noAuthRequestHandler(
      {
        method: 'get',
        url: '/categories',
        signal: controller.signal
      },
    );
  },
  getItems: (controller: AbortController, params?: TQueryParams) => {
    return noAuthRequestHandler(
      {
        method: 'get',
        url: '/items',
        params,
        signal: controller.signal
      },
    );
  },
  getItem: (controller: AbortController, id: string | undefined) => {
    return noAuthRequestHandler(
      {
        method: 'get',
        url: `/items/${id}`,
        signal: controller.signal
      },
    );
  }
};