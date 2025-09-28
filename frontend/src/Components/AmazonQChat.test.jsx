import React from 'react';
import { render, screen } from '@testing-library/react';
import AmazonQChat from './AmazonQChat';
import { LanguageProvider } from '../utilities/LanguageContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

// Mock the services
jest.mock('../services/amazonQService', () => ({
  sendMessage: jest.fn()
}));

jest.mock('../services/translationService', () => ({
  needsTranslation: jest.fn(),
  translate: jest.fn()
}));

describe('AmazonQChat', () => {
  const renderWithProviders = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          {component}
        </LanguageProvider>
      </ThemeProvider>
    );
  };

  it('should show sources when language is English', () => {
    // Set up the initial state with a message that includes sources
    const mockMessage = {
      message: 'Test message',
      citations: [
        { title: "Disability Rights Texas", url: "https://www.disabilityrightstx.org" },
        { title: "Client Assistance Program", url: "https://www.disabilityrightstx.org/en/service/client-assistance-program-cap" }
      ]
    };

    renderWithProviders(<AmazonQChat />);

    // Verify that sources are visible
    expect(screen.getByText('Sources:')).toBeInTheDocument();
    expect(screen.getByText('Disability Rights Texas')).toBeInTheDocument();
    expect(screen.getByText('Client Assistance Program')).toBeInTheDocument();
  });

  it('should not show sources when language is Spanish', () => {
    // Change language to Spanish first
    const { getByTestId } = renderWithProviders(<AmazonQChat />);
    
    // Find and click language toggle to switch to Spanish
    const languageToggle = getByTestId('language-toggle');
    languageToggle.click();

    // Verify that sources are not visible
    expect(screen.queryByText('Sources:')).not.toBeInTheDocument();
    expect(screen.queryByText('Fuentes:')).not.toBeInTheDocument();
    expect(screen.queryByText('Disability Rights Texas')).not.toBeInTheDocument();
    expect(screen.queryByText('Client Assistance Program')).not.toBeInTheDocument();
  });
});