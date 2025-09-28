import React from 'react';
import { Typography, Box } from '@mui/material';
import FlowchartSelector from './FlowchartSelector';

export default function FlowchartDemo() {
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Drag nodes to rearrange • Connect nodes by dragging from handles
      </Typography>
      <FlowchartSelector />
    </Box>
  );
}