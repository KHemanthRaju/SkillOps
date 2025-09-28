import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon, AccountTree as FlowchartIcon } from '@mui/icons-material';
import FlowchartDemo from './FlowchartDemo';

export default function FlowchartButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<FlowchartIcon />}
        onClick={() => setOpen(true)}
        sx={{ 
          mb: 1,
          backgroundColor: '#1976d2',
          color: 'white',
          '&:hover': {
            backgroundColor: '#1565c0'
          }
        }}
      >
        View Process Flow
      </Button>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          DevOps Process Flowcharts
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FlowchartDemo />
        </DialogContent>
      </Dialog>
    </>
  );
}