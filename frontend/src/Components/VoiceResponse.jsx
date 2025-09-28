import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

function VoiceResponse({ message, onSpeakingChange, autoSpeak = true, voiceSettings }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    setSpeechSupported('speechSynthesis' in window);
    
    // Load voices when component mounts
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => ({ name: v.name, lang: v.lang })));
      };
      
      // Load voices immediately if available
      loadVoices();
      
      // Also load when voices change (some browsers load them asynchronously)
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    if (autoSpeak && message && speechSupported) {
      speakMessage(message);
    }
  }, [message, autoSpeak, speechSupported]);

  const speakMessage = (text) => {
    if (!speechSupported) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Clean the text (remove HTML tags and markdown)
    const cleanText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\[.*?\]/g, '') // Remove markdown links
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\*/g, '') // Remove italic markdown
      .substring(0, 500); // Limit length

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Configure voice settings for realistic human male voice
    utterance.rate = voiceSettings?.rate || 0.9;
    utterance.pitch = voiceSettings?.pitch || 0.75;
    utterance.volume = voiceSettings?.volume || 0.95;

    // Find the best realistic male voice
    const voices = window.speechSynthesis.getVoices();
    
    // Priority order for most realistic human male voices
    const preferredVoices = [
      // Premium natural voices (most human-like)
      voices.find(voice => voice.name.includes('Microsoft David Desktop')),
      voices.find(voice => voice.name.includes('Microsoft Mark Desktop')),
      voices.find(voice => voice.name.includes('Google UK English Male')),
      voices.find(voice => voice.name.includes('Google US English Male')),
      
      // High-quality system voices
      voices.find(voice => voice.name.includes('Alex') && voice.lang.startsWith('en')),
      voices.find(voice => voice.name.includes('Daniel') && voice.lang.startsWith('en')),
      voices.find(voice => voice.name.includes('Tom') && voice.lang.startsWith('en')),
      voices.find(voice => voice.name.includes('Aaron') && voice.lang.startsWith('en')),
      
      // Microsoft enhanced voices
      voices.find(voice => voice.name.includes('Microsoft David')),
      voices.find(voice => voice.name.includes('Microsoft Mark')),
      voices.find(voice => voice.name.includes('Microsoft Guy')),
      voices.find(voice => voice.name.includes('Microsoft James')),
      
      // Google voices
      voices.find(voice => voice.name.includes('Google') && voice.name.includes('Male')),
      
      // Generic male voices with natural sound
      voices.find(voice => voice.name.toLowerCase().includes('male') && voice.lang.startsWith('en-US')),
      voices.find(voice => voice.name.toLowerCase().includes('man') && voice.lang.startsWith('en-US')),
      
      // Fallback voices
      voices.find(voice => voice.lang.startsWith('en-US') && !voice.name.toLowerCase().includes('female')),
      voices.find(voice => voice.lang.startsWith('en') && !voice.name.toLowerCase().includes('female'))
    ];
    
    // Use custom voice if provided, otherwise find best voice
    const voiceToUse = voiceSettings?.voice || preferredVoices.find(voice => voice);
    if (voiceToUse) {
      utterance.voice = voiceToUse;
      console.log('Using voice:', voiceToUse.name);
      
      // Adjust settings based on voice type for most realistic human sound
      if (voiceToUse.name.toLowerCase().includes('david') || 
          voiceToUse.name.toLowerCase().includes('mark') ||
          voiceToUse.name.toLowerCase().includes('alex')) {
        utterance.pitch = Math.max(0.65, (voiceSettings?.pitch || 0.75) - 0.05);
        utterance.rate = Math.max(0.85, (voiceSettings?.rate || 0.9) - 0.05);
      } else if (voiceToUse.name.toLowerCase().includes('google')) {
        utterance.pitch = Math.max(0.7, (voiceSettings?.pitch || 0.75));
        utterance.rate = Math.max(0.88, (voiceSettings?.rate || 0.9) - 0.02);
      } else if (voiceToUse.name.toLowerCase().includes('daniel') ||
                 voiceToUse.name.toLowerCase().includes('tom') ||
                 voiceToUse.name.toLowerCase().includes('aaron')) {
        utterance.pitch = Math.max(0.72, (voiceSettings?.pitch || 0.75) + 0.02);
        utterance.rate = Math.max(0.87, (voiceSettings?.rate || 0.9) - 0.03);
      }
      
      // Store selected voice for consistency
      setSelectedVoice(voiceToUse);
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      onSpeakingChange?.(true);
      console.log('Started speaking with voice:', utterance.voice?.name || 'default');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      onSpeakingChange?.(false);
      console.log('Finished speaking');
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      onSpeakingChange?.(false);
      console.error('Speech error:', event.error);
    };
    
    utterance.onboundary = (event) => {
      // Add natural pauses at sentence boundaries
      if (event.name === 'sentence') {
        utterance.rate = 0.8; // Slow down slightly at sentence boundaries
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    onSpeakingChange?.(false);
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (message) {
      speakMessage(message);
    }
  };

  if (!speechSupported) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
      <IconButton
        onClick={toggleSpeech}
        size="small"
        sx={{
          color: isSpeaking ? 'primary.main' : 'action.disabled',
          '&:hover': { color: 'primary.main' }
        }}
      >
        {isSpeaking ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
      {isSpeaking && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="caption" color="primary.main">
            Speaking...
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.2 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 3,
                  height: 8,
                  bgcolor: 'primary.main',
                  borderRadius: '1px',
                  animation: `voice-wave 0.6s ease-in-out ${i * 0.1}s infinite alternate`,
                  '@keyframes voice-wave': {
                    '0%': { height: '4px', opacity: 0.5 },
                    '100%': { height: '12px', opacity: 1 }
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default VoiceResponse;