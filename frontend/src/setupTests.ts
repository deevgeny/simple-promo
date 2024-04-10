// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { baseUrl } from './services/axios';
import nock from 'nock'; 
nock.disableNetConnect();


export const testUtils = {
  baseUrl,
  responseHeaders: {
    'Content-Type': 'application/json',
    'access-control-allow-origin': '*',
  }
};

(global as any).testUtils = testUtils;

afterEach(() => {
  cleanup();
});
