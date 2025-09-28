import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon, Analytics as AnalyticsIcon } from '@mui/icons-material';
import AnalyticsDashboard from './AnalyticsDashboard';

export default function AnalyticsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AnalyticsIcon />}
        onClick={() => setOpen(true)}
        sx={{ 
          mb: 1,
          backgroundColor: '#e91e63',
          color: 'white',
          '&:hover': {
            backgroundColor: '#c2185b'
          }
        }}
      >
        Analytics
      </Button>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>
          Advanced Analytics Dashboard
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AnalyticsDashboard />
        </DialogContent>
      </Dialog>
    </>
  );
}