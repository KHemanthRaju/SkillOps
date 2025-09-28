import React from 'react';
import { useLanguage } from '../utilities/LanguageContext'; // Adjust the import path
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/material';
import { SWITCH_TEXT } from '../utilities/constants';
import { useTheme } from '../utilities/ThemeContext';

export default function Switch() {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const { isSparkyTheme } = useTheme();

  const handleLanguageChange = (newLanguage) => {
    if (newLanguage !== currentLanguage) {
      toggleLanguage();
    }
  };

  return (
    <Box>
      <ButtonGroup 
        variant="contained" 
        aria-label="Language button group"
        sx={{
          '& .MuiButton-contained': {
            backgroundColor: isSparkyTheme ? '#8C1D40' : '#2196F3',
            '&:hover': {
              backgroundColor: isSparkyTheme ? '#6B1426' : '#1976D2'
            }
          },
          '& .MuiButton-outlined': {
            borderColor: isSparkyTheme ? '#8C1D40' : '#2196F3',
            color: isSparkyTheme ? '#8C1D40' : '#2196F3',
            '&:hover': {
              borderColor: isSparkyTheme ? '#6B1426' : '#1976D2',
              backgroundColor: isSparkyTheme ? 'rgba(140, 29, 64, 0.04)' : 'rgba(33, 150, 243, 0.04)'
            }
          }
        }}
      >
        <Tooltip title={SWITCH_TEXT.SWITCH_TOOLTIP_ENGLISH} arrow>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleLanguageChange('EN');
            }}
            variant={currentLanguage === 'EN' ? 'contained' : 'outlined'}
          >
            {SWITCH_TEXT.SWITCH_LANGUAGE_ENGLISH}
          </Button>
        </Tooltip>
        <Tooltip title={SWITCH_TEXT.SWITCH_TOOLTIP_SPANISH} arrow>
          <Button
            data-testid="language-toggle"
            onClick={(e) => {
              e.preventDefault();
              handleLanguageChange('ES');
            }}
            variant={currentLanguage === 'ES' ? 'contained' : 'outlined'}
          >
            {SWITCH_TEXT.SWITCH_LANGUAGE_SPANISH}
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
}
