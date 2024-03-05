import axios from 'axios';

const {
  REACT_APP_API_URL: API_URL,
  REACT_APP_API_PREFIX: API_PREFIX,
  REACT_APP_API_VERSION: API_VERSION
} = process.env;
const axiosTimeout = 3000;
export const baseUrl = `${API_URL}${API_PREFIX}${API_VERSION}`;

/**
 * Axios instance without request/response interceptors for api requests
 * which do not require authentication.
 */
const axiosNoAuth = axios.create({
  baseURL: baseUrl,
  timeout: axiosTimeout,
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
});

export { axiosNoAuth };