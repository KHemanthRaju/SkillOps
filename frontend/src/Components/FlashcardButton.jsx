import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon, Quiz as QuizIcon } from '@mui/icons-material';
import DevOpsFlashcards from './DevOpsFlashcards';

export default function FlashcardButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<QuizIcon />}
        onClick={() => setOpen(true)}
        sx={{ 
          mb: 1,
          backgroundColor: '#4caf50',
          color: 'white',
          '&:hover': {
            backgroundColor: '#45a049'
          }
        }}
      >
        DevOps Flashcards
      </Button>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          DevOps Learning Flashcards
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DevOpsFlashcards />
        </DialogContent>
      </Dialog>
    </>
  );
}