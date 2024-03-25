import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import RouterBreadcrumbs, { pathMap } from './RouterBreadcrumbs';
import AppProviders from '../../context/AppProviders';

describe('<RouterBreadcrumb /> component', () => {
  test('path map length', () => {
    expect(Object.keys(pathMap)).toHaveLength(1);
  });

  test('renders correctly at top level path', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<RouterBreadcrumbs />} />
          </Routes>
        </MemoryRouter>
      </AppProviders>
    );
    expect(screen.getByRole('link', { name: /главная/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /главная/i }).getAttribute('href')).toEqual('/');
    expect(screen.getByRole('list')).toHaveTextContent('Главная');
  });

  test('renders correctly at /items path', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<Navigate to='/items' />} />
            <Route path='/items' element={<RouterBreadcrumbs />} />
          </Routes>
        </MemoryRouter>
      </AppProviders>
    );
    expect(screen.getByRole('link', { name: /главная/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /главная/i }).getAttribute('href')).toEqual('/');
    expect(screen.getByText(/просмотр/i )).toBeInTheDocument();
    expect(screen.getByText(/просмотр/i ).getAttribute('href')).toBeNull();
    expect(screen.getByRole('list')).toHaveTextContent('Главная/Просмотр');
  });

  test('renders correctly at /non-existing path', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<Navigate to='/non-existing' />} />
            <Route path='/non-existing' element={<RouterBreadcrumbs />} />
          </Routes>
        </MemoryRouter>
      </AppProviders>

    );
    expect(screen.getByRole('link', { name: /главная/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /главная/i }).getAttribute('href')).toEqual('/');
    // ... stays for unknown page
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('...' ).getAttribute('href')).toBeNull();
    expect(screen.getByRole('list')).toHaveTextContent('Главная/...');
  });

});