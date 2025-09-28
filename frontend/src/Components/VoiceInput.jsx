import React, { useState, useEffect } from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

function VoiceInput({ onTranscript, onListeningChange }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
        onListeningChange?.(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript?.(transcript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        onListeningChange?.(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        onListeningChange?.(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscript, onListeningChange]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  if (!speechSupported) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        onClick={toggleListening}
        sx={{
          color: isListening ? 'error.main' : 'primary.main',
          bgcolor: isListening ? 'error.light' : 'primary.light',
          '&:hover': {
            bgcolor: isListening ? 'error.main' : 'primary.main',
            color: 'white'
          }
        }}
      >
        {isListening ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
      {isListening && (
        <Typography variant="caption" color="error.main">
          Listening...
        </Typography>
      )}
    </Box>
  );
}

export default VoiceInput;