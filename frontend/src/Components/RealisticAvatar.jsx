import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { PERSONAS } from './PersonaSelector';

function RealisticAvatar({ persona = 'architect', isThinking = false, isSpeaking = false, isListening = false }) {
  const [blinkState, setBlinkState] = useState(false);
  const [mouthFrame, setMouthFrame] = useState(0);
  const [eyeDirection, setEyeDirection] = useState({ x: 0, y: 0 });

  // Realistic blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 120);
    }, 1500 + Math.random() * 4000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Eye movement for thinking
  useEffect(() => {
    if (isThinking) {
      const eyeInterval = setInterval(() => {
        setEyeDirection({
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 4
        });
      }, 800);
      return () => clearInterval(eyeInterval);
    } else {
      setEyeDirection({ x: 0, y: 0 });
    }
  }, [isThinking]);

  // Mouth animation for speaking
  useEffect(() => {
    if (isSpeaking) {
      const mouthInterval = setInterval(() => {
        setMouthFrame(prev => (prev + 1) % 4);
      }, 150);
      return () => clearInterval(mouthInterval);
    } else {
      setMouthFrame(0);
    }
  }, [isSpeaking]);

  const getPersonaStyle = (personaKey) => {
    const styles = {
      architect: {
        skinTone: '#FDBCB4',
        hairColor: '#8B4513',
        eyeColor: '#4A90E2',
        accent: '#4CAF50'
      },
      engineer: {
        skinTone: '#F1C27D',
        hairColor: '#2C1810',
        eyeColor: '#228B22',
        accent: '#2196F3'
      },
      mentor: {
        skinTone: '#E8B982',
        hairColor: '#696969',
        eyeColor: '#8B4513',
        accent: '#FF9800'
      },
      interviewer: {
        skinTone: '#DEB887',
        hairColor: '#000000',
        eyeColor: '#4B0082',
        accent: '#9C27B0'
      }
    };
    return styles[personaKey] || styles.architect;
  };

  const style = getPersonaStyle(persona);

  const getMouthPath = () => {
    if (!isSpeaking) {
      if (isThinking) return 'M 40 55 Q 50 58 60 55'; // Slight frown
      if (isListening) return 'M 40 55 Q 50 52 60 55'; // Slight smile
      return 'M 42 55 L 58 55'; // Neutral
    }

    const frames = [
      'M 45 55 Q 50 60 55 55', // Small O
      'M 42 53 Q 50 62 58 53', // Wide O
      'M 44 55 Q 50 58 56 55', // Medium O
      'M 46 55 L 54 55'        // Closed
    ];
    return frames[mouthFrame];
  };

  const getEyeHeight = () => blinkState ? 2 : 8;

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
        minHeight: '400px',
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

      {/* Realistic Human Face */}
      <Box
        sx={{
          width: 180,
          height: 220,
          position: 'relative',
          mb: 2,
          transform: isThinking ? 'rotate(-1deg)' : isSpeaking ? 'scale(1.02)' : 'none',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* SVG Face */}
        <svg width="180" height="220" viewBox="0 0 100 120">
          {/* Face Shape */}
          <ellipse 
            cx="50" 
            cy="55" 
            rx="25" 
            ry="32" 
            fill={style.skinTone}
            stroke={style.accent}
            strokeWidth="0.5"
          />
          
          {/* Hair */}
          <path 
            d="M 25 35 Q 50 20 75 35 Q 75 25 50 22 Q 25 25 25 35" 
            fill={style.hairColor}
          />
          
          {/* Forehead */}
          <ellipse 
            cx="50" 
            cy="40" 
            rx="22" 
            ry="15" 
            fill={style.skinTone}
          />
          
          {/* Eyebrows */}
          <path 
            d={`M 38 42 Q 42 ${isThinking ? '40' : '41'} 46 42`} 
            stroke="#654321" 
            strokeWidth="1.5" 
            fill="none"
            style={{ transition: 'all 0.3s ease' }}
          />
          <path 
            d={`M 54 42 Q 58 ${isThinking ? '40' : '41'} 62 42`} 
            stroke="#654321" 
            strokeWidth="1.5" 
            fill="none"
            style={{ transition: 'all 0.3s ease' }}
          />
          
          {/* Eyes */}
          <ellipse 
            cx="42" 
            cy="46" 
            rx="6" 
            ry={getEyeHeight()} 
            fill="white"
            style={{ transition: 'ry 0.1s ease' }}
          />
          <ellipse 
            cx="58" 
            cy="46" 
            rx="6" 
            ry={getEyeHeight()} 
            fill="white"
            style={{ transition: 'ry 0.1s ease' }}
          />
          
          {/* Pupils */}
          {!blinkState && (
            <>
              <circle 
                cx={42 + eyeDirection.x} 
                cy={46 + eyeDirection.y} 
                r="3" 
                fill={style.eyeColor}
                style={{ transition: 'all 0.3s ease' }}
              />
              <circle 
                cx={58 + eyeDirection.x} 
                cy={46 + eyeDirection.y} 
                r="3" 
                fill={style.eyeColor}
                style={{ transition: 'all 0.3s ease' }}
              />
              
              {/* Eye shine */}
              <circle 
                cx={43 + eyeDirection.x} 
                cy={45 + eyeDirection.y} 
                r="1" 
                fill="white"
              />
              <circle 
                cx={59 + eyeDirection.x} 
                cy={45 + eyeDirection.y} 
                r="1" 
                fill="white"
              />
            </>
          )}
          
          {/* Nose */}
          <path 
            d="M 50 50 L 48 54 Q 50 55 52 54 Z" 
            fill="rgba(0,0,0,0.1)"
          />
          <ellipse 
            cx="49" 
            cy="54" 
            rx="1" 
            ry="1.5" 
            fill="rgba(0,0,0,0.2)"
          />
          <ellipse 
            cx="51" 
            cy="54" 
            rx="1" 
            ry="1.5" 
            fill="rgba(0,0,0,0.2)"
          />
          
          {/* Mouth */}
          <path 
            d={getMouthPath()} 
            stroke="#8B4513" 
            strokeWidth="2" 
            fill={isSpeaking && mouthFrame < 3 ? "rgba(139, 69, 19, 0.3)" : "none"}
            style={{ transition: 'all 0.1s ease' }}
          />
          
          {/* Teeth (when speaking) */}
          {isSpeaking && mouthFrame < 3 && (
            <rect 
              x="47" 
              y="56" 
              width="6" 
              height="2" 
              fill="white" 
              rx="1"
            />
          )}
          
          {/* Cheeks */}
          <ellipse 
            cx="35" 
            cy="52" 
            rx="3" 
            ry="2" 
            fill="rgba(255, 182, 193, 0.3)"
          />
          <ellipse 
            cx="65" 
            cy="52" 
            rx="3" 
            ry="2" 
            fill="rgba(255, 182, 193, 0.3)"
          />
          
          {/* Chin */}
          <ellipse 
            cx="50" 
            cy="75" 
            rx="15" 
            ry="12" 
            fill={style.skinTone}
          />
          
          {/* Neck */}
          <rect 
            x="45" 
            y="85" 
            width="10" 
            height="15" 
            fill={style.skinTone}
          />
          
          {/* Collar */}
          <rect 
            x="40" 
            y="95" 
            width="20" 
            height="8" 
            fill={style.accent}
            rx="2"
          />
        </svg>

        {/* Persona Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 35,
            height: 35,
            borderRadius: '50%',
            bgcolor: style.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            boxShadow: 2,
            border: '2px solid white'
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
          color: style.accent,
          mb: 1 
        }}
      >
        {PERSONAS[persona]?.name || 'AI Assistant'}
      </Typography>
      
      {/* Thinking Animation */}
      {isThinking && (
        <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: style.accent,
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
          {[0, 1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              sx={{
                width: 3,
                bgcolor: style.accent,
                borderRadius: '2px',
                animation: `sound-wave 0.4s ease-in-out ${i * 0.08}s infinite alternate`,
                '@keyframes sound-wave': {
                  '0%': { height: '8px', opacity: 0.4 },
                  '100%': { height: '20px', opacity: 1 }
                }
              }}
            />
          ))}
        </Box>
      )}

      {/* Listening Pulse */}
      {isListening && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          mb: 2,
          animation: 'gentle-pulse 2s ease-in-out infinite',
          '@keyframes gentle-pulse': {
            '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
            '50%': { opacity: 1, transform: 'scale(1.05)' }
          }
        }}>
          <Typography variant="body2" color={style.accent} sx={{ fontWeight: 'bold' }}>
            Ready to assist you...
          </Typography>
        </Box>
      )}
      
      {/* Persona Description */}
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          textAlign: 'center', 
          maxWidth: '220px',
          fontSize: '0.85rem',
          lineHeight: 1.3
        }}
      >
        {PERSONAS[persona]?.prompt.replace(/\[.*?\]\s*/, '').substring(0, 70)}...
      </Typography>
    </Box>
  );
}

export default RealisticAvatar;