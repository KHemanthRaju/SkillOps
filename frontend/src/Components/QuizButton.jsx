import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon, Quiz as QuizIcon } from '@mui/icons-material';
import DevOpsQuiz from './DevOpsQuiz';

export default function QuizButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<QuizIcon />}
        onClick={() => setOpen(true)}
        sx={{ 
          mb: 1,
          backgroundColor: '#ff9800',
          color: 'white',
          '&:hover': {
            backgroundColor: '#f57c00'
          }
        }}
      >
        DevOps Quiz
      </Button>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          DevOps Knowledge Quiz
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DevOpsQuiz />
        </DialogContent>
      </Dialog>
    </>
  );
}