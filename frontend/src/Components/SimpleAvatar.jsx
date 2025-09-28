import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { PERSONAS } from './PersonaSelector';

function SimpleAvatar({ persona = 'architect', isThinking = false, isSpeaking = false }) {
  const getPersonaColor = (personaKey) => {
    const colors = {
      architect: '#4CAF50', // Green
      engineer: '#2196F3',  // Blue
      mentor: '#FF9800',    // Orange
      interviewer: '#9C27B0' // Purple
    };
    return colors[personaKey] || '#2196F3';
  };

  const getAnimationStyle = () => {
    if (isThinking) {
      return {
        animation: 'pulse 1.5s ease-in-out infinite alternate',
        '@keyframes pulse': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' }
        }
      };
    }
    if (isSpeaking) {
      return {
        animation: 'bounce 0.5s ease-in-out infinite alternate',
        '@keyframes bounce': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-10px)' }
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
        minHeight: '300px',
        justifyContent: 'center'
      }}
    >
      {/* Avatar Circle */}
      <Avatar
        sx={{
          width: 120,
          height: 120,
          bgcolor: getPersonaColor(persona),
          fontSize: '3rem',
          mb: 2,
          border: `4px solid ${getPersonaColor(persona)}`,
          ...getAnimationStyle()
        }}
      >
        {PERSONAS[persona]?.icon || '🤖'}
      </Avatar>
      
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
      
      {/* Status Indicator */}
      {isThinking && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Thinking
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
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
                    '0%, 80%, 100%': { opacity: 0.3 },
                    '40%': { opacity: 1 }
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}
      
      {isSpeaking && (
        <Typography variant="body2" color="primary.main">
          Speaking...
        </Typography>
      )}
      
      {/* Persona Description */}
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          textAlign: 'center', 
          mt: 2,
          maxWidth: '200px'
        }}
      >
        {PERSONAS[persona]?.prompt.replace(/\[.*?\]\s*/, '').substring(0, 80)}...
      </Typography>
    </Box>
  );
}

export default SimpleAvatar;