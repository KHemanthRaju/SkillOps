import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';

function SimplifyToggle({ isSimplified, onToggle }) {

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <FormControlLabel
        control={
          <Switch
            checked={isSimplified}
            onChange={(e) => onToggle(e.target.checked)}
            color="primary"
          />
        }
        label={
          <Typography variant="body2" sx={{ fontSize: '1rem' }}>
            Simplify
          </Typography>
        }
      />
    </Box>
  );
}

export default SimplifyToggle; 