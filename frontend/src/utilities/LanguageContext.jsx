import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import CONFIG from '../config';
import TranslationService from '../services/translationService';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['language']);
  const [currentLanguage, setCurrentLanguage] = useState(
    cookies.language || CONFIG.translation.defaultLanguage
  );

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'EN' ? 'ES' : 'EN';
    console.log(`Language switched from ${currentLanguage} to ${newLanguage}`);
    setCurrentLanguage(newLanguage);
    setCookie('language', newLanguage, { path: '/' });
    // Refresh the page after language switch
    window.location.reload();
  };

  // Set initial language cookie only if not present
  useEffect(() => {
    if (!cookies.language) {
      const defaultLanguage = CONFIG.translation.defaultLanguage || 'EN';
      console.log(`Setting initial language to ${defaultLanguage}`);
      setCookie('language', defaultLanguage, { path: '/' });
      setCurrentLanguage(defaultLanguage);
    }
  }, [cookies.language, setCookie]);

  const value = {
    currentLanguage,
    setCurrentLanguage: (newLanguage) => {
      console.log(`Language being set to ${newLanguage}`);
      setCurrentLanguage(newLanguage);
    },
    toggleLanguage,
    translate: async (text) => {
      if (typeof text === 'string') {
        // Check if translation is needed
        if (TranslationService.needsTranslation(text, currentLanguage)) {
          try {
            const translatedText = await TranslationService.translate(text, currentLanguage);
            return translatedText;
          } catch (error) {
            console.error('Translation failed:', error);
            return text;
          }
        }
        return text;
      }
      if (text && typeof text === 'object') {
        return text[currentLanguage] || text['EN'] || text;
      }
      return text;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};