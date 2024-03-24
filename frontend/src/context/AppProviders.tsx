import React from 'react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../themes/defaultTheme';
import { WebsiteProvider } from './WebsiteContext';
import { ErrorProvider } from './ErrorContext';
import { BreadcrumbsProvider } from './BreadcrumbsContext';

interface AppProvidersProps {
  children: React.ReactNode
};

/**
 * Wrapper for all context providers
 */
function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WebsiteProvider>
        <ErrorProvider>
          <BreadcrumbsProvider>
            {children}
          </BreadcrumbsProvider>
        </ErrorProvider>
      </WebsiteProvider>
    </ThemeProvider>
  );
}

export default AppProviders;