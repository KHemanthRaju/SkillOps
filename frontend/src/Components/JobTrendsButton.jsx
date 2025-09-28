import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon, TrendingUp as TrendsIcon } from '@mui/icons-material';
import DevOpsJobTrends from './DevOpsJobTrends';

export default function JobTrendsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<TrendsIcon />}
        onClick={() => setOpen(true)}
        sx={{ 
          mb: 1,
          backgroundColor: '#9c27b0',
          color: 'white',
          '&:hover': {
            backgroundColor: '#7b1fa2'
          }
        }}
      >
        Job Trends
      </Button>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          DevOps Job Market Trends
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DevOpsJobTrends />
        </DialogContent>
      </Dialog>
    </>
  );
}