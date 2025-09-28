import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { PERSONAS } from './PersonaSelector';

function Avatar3DRealistic({ persona = 'architect', isThinking = false, isSpeaking = false, isListening = false, message = '' }) {
  const [blinkState, setBlinkState] = useState(false);
  const [headRotation, setHeadRotation] = useState({ x: 0, y: 0 });
  const [mouthState, setMouthState] = useState('closed');
  const [expression, setExpression] = useState('neutral');
  const [eyebrowPosition, setEyebrowPosition] = useState(0);

  // Natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 120);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Head movement for thinking
  useEffect(() => {
    if (isThinking) {
      const moveInterval = setInterval(() => {
        setHeadRotation({
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 15
        });
      }, 1500);
      return () => clearInterval(moveInterval);
    } else {
      setHeadRotation({ x: 0, y: 0 });
    }
  }, [isThinking]);

  // Dynamic expression based on message content
  useEffect(() => {
    if (message) {
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('error') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
        setExpression('concerned');
        setEyebrowPosition(-5);
      } else if (lowerMessage.includes('great') || lowerMessage.includes('excellent') || lowerMessage.includes('success')) {
        setExpression('happy');
        setEyebrowPosition(2);
      } else if (lowerMessage.includes('?') || lowerMessage.includes('help') || lowerMessage.includes('how')) {
        setExpression('thoughtful');
        setEyebrowPosition(-2);
      } else if (lowerMessage.includes('welcome') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        setExpression('friendly');
        setEyebrowPosition(1);
      } else {
        setExpression('neutral');
        setEyebrowPosition(0);
      }
    }
  }, [message]);

  // Mouth animation for speaking
  useEffect(() => {
    if (isSpeaking) {
      const mouthInterval = setInterval(() => {
        const states = expression === 'happy' ? ['smile', 'half-open', 'smile'] : ['open', 'half-open', 'closed'];
        setMouthState(states[Math.floor(Math.random() * states.length)]);
      }, 200);
      return () => clearInterval(mouthInterval);
    } else {
      if (expression === 'happy' || expression === 'friendly') {
        setMouthState('smile');
      } else if (expression === 'concerned') {
        setMouthState('frown');
      } else {
        setMouthState(isListening ? 'smile' : 'closed');
      }
    }
  }, [isSpeaking, isListening, expression]);

  const getPersonaStyle = (personaKey) => {
    // Normal human styling
    const baseStyle = {
      skinTone: '#E8B982', // Warm human skin tone
      hairColor: '#2C1810', // Dark hair
      eyeColor: '#4A2C2A', // Brown eyes
      beardColor: '#1A1A1A', // Beard
      mustacheColor: '#2C1810' // Mustache
    };
    
    const styles = {
      architect: {
        ...baseStyle,
        accent: '#4CAF50', // Green
        shirtColor: '#FFFFFF', // White shirt
        personality: 'professional'
      },
      engineer: {
        ...baseStyle,
        accent: '#2196F3', // Blue
        shirtColor: '#FFFFFF',
        personality: 'technical'
      },
      mentor: {
        ...baseStyle,
        accent: '#FF9800', // Orange
        shirtColor: '#FFFFFF',
        personality: 'wise'
      },
      interviewer: {
        ...baseStyle,
        accent: '#9C27B0', // Purple
        shirtColor: '#FFFFFF',
        personality: 'professional'
      }
    };
    return styles[personaKey] || styles.architect;
  };

  const style = getPersonaStyle(persona);

  const getFloatingAnimation = () => {
    if (isThinking) return 'thinking-float 3s ease-in-out infinite';
    if (isSpeaking) return 'speaking-bounce 0.5s ease-in-out infinite';
    if (isListening) return 'listening-glow 2s ease-in-out infinite';
    return 'idle-float 4s ease-in-out infinite';
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p: 3,
        minHeight: '500px',
        justifyContent: 'center',
        position: 'relative',
        perspective: '1000px'
      }}
    >
      {/* 3D Avatar Container */}
      <Box
        sx={{
          width: 280,
          height: 320,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${headRotation.x}deg) rotateY(${headRotation.y}deg)`,
          transition: 'transform 0.8s ease-out',
          animation: getFloatingAnimation(),
          '@keyframes idle-float': {
            '0%, 100%': { transform: 'translateY(0px) rotateX(0deg) rotateY(0deg)' },
            '50%': { transform: 'translateY(-8px) rotateX(2deg) rotateY(0deg)' }
          },
          '@keyframes thinking-float': {
            '0%, 100%': { transform: 'translateY(0px) rotateX(-5deg) rotateY(-10deg)' },
            '33%': { transform: 'translateY(-5px) rotateX(0deg) rotateY(5deg)' },
            '66%': { transform: 'translateY(-3px) rotateX(3deg) rotateY(-5deg)' }
          },
          '@keyframes speaking-bounce': {
            '0%, 100%': { transform: 'translateY(0px) scale(1)' },
            '50%': { transform: 'translateY(-3px) scale(1.02)' }
          },
          '@keyframes listening-glow': {
            '0%, 100%': { 
              transform: 'translateY(0px)',
              filter: 'drop-shadow(0 0 10px rgba(76, 175, 80, 0.3))'
            },
            '50%': { 
              transform: 'translateY(-5px)',
              filter: 'drop-shadow(0 0 20px rgba(76, 175, 80, 0.6))'
            }
          }
        }}
      >
        {/* Head - Main 3D Element */}
        <Box
          sx={{
            width: 160,
            height: 200,
            margin: '0 auto',
            position: 'relative',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            background: `linear-gradient(145deg, ${style.skinTone}, ${style.skinTone}dd)`,
            boxShadow: `
              inset -10px -10px 20px rgba(0,0,0,0.1),
              inset 10px 10px 20px rgba(255,255,255,0.3),
              0 20px 40px rgba(0,0,0,0.2)
            `,
            transform: 'translateZ(20px)',
            // Hair
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-30px',
              left: '10px',
              right: '10px',
              height: '50px',
              background: `linear-gradient(135deg, ${style.hairColor}, ${style.hairColor}cc, ${style.hairColor}dd)`,
              borderRadius: '45px 45px 30px 30px',
              boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.4), 0 8px 15px rgba(0,0,0,0.3)',
              transform: 'skewY(-2deg)'
            }
          }}
        >
          {/* Eyes */}
          <Box
            sx={{
              position: 'absolute',
              top: '35%',
              left: '25%',
              width: '15px',
              height: blinkState ? '2px' : '12px',
              background: 'white',
              borderRadius: '50%',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
              transition: 'height 0.1s ease',
              transform: 'translateZ(5px)',
              '&::after': !blinkState ? {
                content: '""',
                position: 'absolute',
                top: '2px',
                left: '3px',
                width: '9px',
                height: '9px',
                background: style.eyeColor,
                borderRadius: '50%',
                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)'
              } : {}
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              top: '35%',
              right: '25%',
              width: '15px',
              height: blinkState ? '2px' : '12px',
              background: 'white',
              borderRadius: '50%',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
              transition: 'height 0.1s ease',
              transform: 'translateZ(5px)',
              '&::after': !blinkState ? {
                content: '""',
                position: 'absolute',
                top: '2px',
                left: '3px',
                width: '9px',
                height: '9px',
                background: style.eyeColor,
                borderRadius: '50%',
                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)'
              } : {}
            }}
          />

          {/* Eyebrows */}
          <Box
            sx={{
              position: 'absolute',
              top: '24%',
              left: '18%',
              width: '25px',
              height: '6px',
              background: `linear-gradient(90deg, ${style.hairColor}, ${style.hairColor}ee, ${style.hairColor}dd)`,
              borderRadius: '4px 2px 2px 4px',
              transform: `translateZ(4px) rotate(${eyebrowPosition - 3}deg) translateY(${eyebrowPosition}px)`,
              transition: 'transform 0.3s ease',
              boxShadow: '0 3px 6px rgba(0,0,0,0.4)'
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              top: '24%',
              right: '18%',
              width: '25px',
              height: '6px',
              background: `linear-gradient(90deg, ${style.hairColor}dd, ${style.hairColor}ee, ${style.hairColor})`,
              borderRadius: '2px 4px 4px 2px',
              transform: `translateZ(4px) rotate(${-eyebrowPosition + 3}deg) translateY(${eyebrowPosition}px)`,
              transition: 'transform 0.3s ease',
              boxShadow: '0 3px 6px rgba(0,0,0,0.4)'
            }}
          />

          {/* Nose */}
          <Box
            sx={{
              position: 'absolute',
              top: '48%',
              left: '50%',
              transform: 'translateX(-50%) translateZ(8px)',
              width: '8px',
              height: '12px',
              background: `linear-gradient(145deg, ${style.skinTone}, ${style.skinTone}cc)`,
              borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}
          />

          {/* Mouth */}
          <Box
            sx={{
              position: 'absolute',
              top: '65%',
              left: '50%',
              transform: 'translateX(-50%) translateZ(4px)',
              width: mouthState === 'open' ? '28px' : mouthState === 'half-open' ? '22px' : '20px',
              height: mouthState === 'open' ? '18px' : mouthState === 'half-open' ? '12px' : '5px',
              background: mouthState === 'smile' ? 'none' : mouthState === 'frown' ? 'none' : 'linear-gradient(145deg, #8B4513, #A0522D)',
              borderRadius: mouthState === 'smile' ? '0' : mouthState === 'frown' ? '0' : '50%',
              border: mouthState === 'smile' ? `3px solid ${style.accent}` : mouthState === 'frown' ? `3px solid #f44336` : 'none',
              borderTop: (mouthState === 'smile' || mouthState === 'frown') ? 'none' : undefined,
              borderRadius: mouthState === 'smile' ? '0 0 25px 25px' : mouthState === 'frown' ? '25px 25px 0 0' : '50%',
              transition: 'all 0.2s ease',
              boxShadow: mouthState !== 'smile' ? 'inset 0 3px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(255,255,255,0.2)' : `0 2px 4px ${style.accent}40`
            }}
          />
        </Box>

        {/* Persona Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: `linear-gradient(145deg, ${style.accent}, ${style.accent}dd)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            border: '3px solid white',
            transform: 'translateZ(30px)',
            animation: isSpeaking ? 'badge-pulse 0.5s ease-in-out infinite alternate' : 'none',
            '@keyframes badge-pulse': {
              '0%': { transform: 'translateZ(30px) scale(1)' },
              '100%': { transform: 'translateZ(30px) scale(1.1)' }
            }
          }}
        >
          {PERSONAS[persona]?.icon || '🤖'}
        </Box>
      </Box>

      {/* Status and Info */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            color: style.accent,
            mb: 0.5,
            textShadow: '0 3px 6px rgba(0,0,0,0.2)',
            fontFamily: 'serif'
          }}
        >
          {PERSONAS[persona]?.name || 'DevOps Expert'}
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: style.accent,
            mb: 1,
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Professional DevOps Guide
        </Typography>

        <Box sx={{ 
          maxWidth: '350px',
          p: 3,
          bgcolor: `${style.accent}10`,
          borderRadius: 3,
          border: `2px solid ${style.accent}30`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <Typography 
            variant="body1" 
            color="text.primary" 
            sx={{ 
              lineHeight: 1.5,
              fontSize: '1rem',
              fontWeight: '500',
              textAlign: 'center'
            }}
          >
            "Hello! I'm here to help you with your DevOps journey. Let's build something amazing together!"
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Avatar3DRealistic;