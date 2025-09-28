import React from 'react';
import { Switch, FormControlLabel, Box } from '@mui/material';
import { useTheme } from '../utilities/ThemeContext';

const ThemeToggle = () => {
  const { isSparkyTheme, toggleTheme } = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FormControlLabel
        control={
          <Switch
            checked={isSparkyTheme}
            onChange={toggleTheme}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#FFC627',
                '&:hover': {
                  backgroundColor: 'rgba(255, 198, 39, 0.08)',
                },
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#8C1D40',
              },
            }}
          />
        }
        label={isSparkyTheme ? '🔱 Sparky' : '👤 Normal'}
        sx={{
          color: isSparkyTheme ? '#8C1D40' : 'text.primary',
          fontWeight: 'bold',
          '& .MuiFormControlLabel-label': {
            fontSize: '0.9rem'
          }
        }}
      />
    </Box>
  );
};

export default ThemeToggle;