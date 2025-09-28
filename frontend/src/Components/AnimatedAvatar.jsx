import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { PERSONAS } from './PersonaSelector';

function AnimatedAvatar({ persona = 'architect', isThinking = false, isSpeaking = false, isListening = false }) {
  const [blinkState, setBlinkState] = useState(false);
  const [mouthState, setMouthState] = useState('closed');

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    }, 2000 + Math.random() * 3000); // Random blink every 2-5 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth animation for speaking
  useEffect(() => {
    if (isSpeaking) {
      const mouthInterval = setInterval(() => {
        setMouthState(prev => {
          const states = ['open', 'half-open', 'closed', 'small-open'];
          return states[Math.floor(Math.random() * states.length)];
        });
      }, 200);

      return () => clearInterval(mouthInterval);
    } else {
      setMouthState('closed');
    }
  }, [isSpeaking]);

  const getPersonaColor = (personaKey) => {
    const colors = {
      architect: '#4CAF50',
      engineer: '#2196F3',
      mentor: '#FF9800',
      interviewer: '#9C27B0'
    };
    return colors[personaKey] || '#2196F3';
  };

  const getEyeShape = () => {
    if (blinkState) return '2px';
    if (isThinking) return '8px';
    if (isListening) return '12px';
    return '10px';
  };

  const getMouthShape = () => {
    if (!isSpeaking) {
      if (isThinking) return { width: '20px', height: '3px', borderRadius: '2px' };
      if (isListening) return { width: '15px', height: '8px', borderRadius: '50%' };
      return { width: '18px', height: '4px', borderRadius: '2px' };
    }

    switch (mouthState) {
      case 'open':
        return { width: '25px', height: '15px', borderRadius: '50%' };
      case 'half-open':
        return { width: '20px', height: '10px', borderRadius: '50%' };
      case 'small-open':
        return { width: '15px', height: '8px', borderRadius: '50%' };
      default:
        return { width: '18px', height: '4px', borderRadius: '2px' };
    }
  };

  const getHeadAnimation = () => {
    if (isThinking) {
      return {
        animation: 'thinking 2s ease-in-out infinite',
        '@keyframes thinking': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' }
        }
      };
    }
    if (isSpeaking) {
      return {
        animation: 'speaking 0.3s ease-in-out infinite alternate',
        '@keyframes speaking': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' }
        }
      };
    }
    if (isListening) {
      return {
        animation: 'listening 1s ease-in-out infinite',
        '@keyframes listening': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-3px)' }
        }
      };
    }
    return {};
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 3,
        minHeight: '350px',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {/* Status Indicator */}
      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
        {isThinking && (
          <Typography variant="caption" color="warning.main" sx={{ fontWeight: 'bold' }}>
            💭 Thinking
          </Typography>
        )}
        {isSpeaking && (
          <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold' }}>
            🗣️ Speaking
          </Typography>
        )}
        {isListening && (
          <Typography variant="caption" color="info.main" sx={{ fontWeight: 'bold' }}>
            👂 Listening
          </Typography>
        )}
      </Box>

      {/* Avatar Head */}
      <Box
        sx={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          bgcolor: getPersonaColor(persona),
          position: 'relative',
          mb: 2,
          border: `4px solid ${getPersonaColor(persona)}`,
          background: `linear-gradient(135deg, ${getPersonaColor(persona)} 0%, ${getPersonaColor(persona)}dd 100%)`,
          ...getHeadAnimation()
        }}
      >
        {/* Eyes */}
        <Box
          sx={{
            position: 'absolute',
            top: '35%',
            left: '25%',
            width: '12px',
            height: getEyeShape(),
            bgcolor: '#000',
            borderRadius: '50%',
            transition: 'height 0.1s ease'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '35%',
            right: '25%',
            width: '12px',
            height: getEyeShape(),
            bgcolor: '#000',
            borderRadius: '50%',
            transition: 'height 0.1s ease'
          }}
        />

        {/* Eyebrows */}
        <Box
          sx={{
            position: 'absolute',
            top: '25%',
            left: '22%',
            width: '18px',
            height: '3px',
            bgcolor: '#000',
            borderRadius: '2px',
            transform: isThinking ? 'rotate(-10deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '25%',
            right: '22%',
            width: '18px',
            height: '3px',
            bgcolor: '#000',
            borderRadius: '2px',
            transform: isThinking ? 'rotate(10deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        />

        {/* Nose */}
        <Box
          sx={{
            position: 'absolute',
            top: '45%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '8px',
            bgcolor: 'rgba(0,0,0,0.3)',
            borderRadius: '2px'
          }}
        />

        {/* Mouth */}
        <Box
          sx={{
            position: 'absolute',
            top: '65%',
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: '#000',
            transition: 'all 0.1s ease',
            ...getMouthShape()
          }}
        />

        {/* Persona Icon */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',
            background: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 2
          }}
        >
          {PERSONAS[persona]?.icon || '🤖'}
        </Box>
      </Box>
      
      {/* Persona Name */}
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 'bold', 
          color: getPersonaColor(persona),
          mb: 1 
        }}
      >
        {PERSONAS[persona]?.name || 'AI Assistant'}
      </Typography>
      
      {/* Thinking Dots */}
      {isThinking && (
        <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: getPersonaColor(persona),
                animation: `dot-pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                '@keyframes dot-pulse': {
                  '0%, 80%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
                  '40%': { opacity: 1, transform: 'scale(1.2)' }
                }
              }}
            />
          ))}
        </Box>
      )}

      {/* Sound Waves for Speaking */}
      {isSpeaking && (
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {[0, 1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                width: 3,
                bgcolor: getPersonaColor(persona),
                borderRadius: '2px',
                animation: `sound-wave 0.6s ease-in-out ${i * 0.1}s infinite alternate`,
                '@keyframes sound-wave': {
                  '0%': { height: '10px' },
                  '100%': { height: '25px' }
                }
              }}
            />
          ))}
        </Box>
      )}

      {/* Listening Indicator */}
      {isListening && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          mb: 2,
          animation: 'pulse 1s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.7 },
            '50%': { opacity: 1 }
          }
        }}>
          <Typography variant="body2" color={getPersonaColor(persona)}>
            👂 Ready to help...
          </Typography>
        </Box>
      )}
      
      {/* Persona Description */}
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          textAlign: 'center', 
          maxWidth: '200px',
          fontSize: '0.85rem'
        }}
      >
        {PERSONAS[persona]?.prompt.replace(/\[.*?\]\s*/, '').substring(0, 60)}...
      </Typography>
    </Box>
  );
}

export default AnimatedAvatar;