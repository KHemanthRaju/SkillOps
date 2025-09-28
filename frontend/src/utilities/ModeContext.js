import React, { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState('tutor'); // 'tutor' or 'mentor'

  return (
    <ModeContext.Provider value={{ currentMode, setCurrentMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};