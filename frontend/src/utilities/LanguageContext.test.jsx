import React from 'react';
import { render, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Mock react-cookie
jest.mock('react-cookie', () => ({
  useCookies: () => [
    { language: 'EN' },
    jest.fn(), // setCookie mock
  ],
}));

// Mock window.location.reload
const mockReload = jest.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true
});

// Mock console.log to verify logging
const originalConsoleLog = console.log;
let consoleOutput = [];
console.log = jest.fn((...args) => {
  consoleOutput.push(args.join(' '));
});

// Test component that uses the language context
const TestComponent = () => {
  const { currentLanguage, toggleLanguage, setCurrentLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="language">{currentLanguage}</span>
      <button data-testid="toggle" onClick={toggleLanguage}>
        Toggle
      </button>
      <button data-testid="set-es" onClick={() => setCurrentLanguage('ES')}>
        Set Spanish
      </button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    consoleOutput = [];
    mockReload.mockClear();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  it('logs when initial language is set', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(consoleOutput).toContain('Setting initial language to EN');
  });

  it('logs when language is toggled and refreshes the page', () => {
    const { getByTestId } = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    act(() => {
      getByTestId('toggle').click();
    });

    expect(consoleOutput).toContain('Language switched from EN to ES');
    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it('logs when language is set directly', () => {
    const { getByTestId } = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    act(() => {
      getByTestId('set-es').click();
    });

    expect(consoleOutput).toContain('Language being set to ES');
  });
});