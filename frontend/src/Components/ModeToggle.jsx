import React from 'react';
import { ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';
import { School, Psychology } from '@mui/icons-material';
import { useMode } from '../utilities/ModeContext';

const ModeToggle = () => {
  const { currentMode, setCurrentMode } = useMode();

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setCurrentMode(newMode);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Mode
      </Typography>
      <ToggleButtonGroup
        value={currentMode}
        exclusive
        onChange={handleModeChange}
        size="small"
        sx={{
          '& .MuiToggleButton-root': {
            px: 2,
            py: 0.5,
            fontSize: '0.75rem',
            textTransform: 'none'
          }
        }}
      >
        <ToggleButton value="tutor" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <School fontSize="small" />
          Tutor
        </ToggleButton>
        <ToggleButton value="mentor" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Psychology fontSize="small" />
          Mentor
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ModeToggle;