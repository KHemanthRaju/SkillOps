import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { PERSONAS } from './PersonaSelector';

function PawanKalyanAvatar({ persona = 'architect', isThinking = false, isSpeaking = false, isListening = false, message = '' }) {
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
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 12
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
      
      if (lowerMessage.includes('error') || lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('failed')) {
        setExpression('concerned');
        setEyebrowPosition(-3);
      } else if (lowerMessage.includes('great') || lowerMessage.includes('excellent') || lowerMessage.includes('success') || lowerMessage.includes('perfect')) {
        setExpression('happy');
        setEyebrowPosition(2);
      } else if (lowerMessage.includes('?') || lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
        setExpression('thoughtful');
        setEyebrowPosition(-1);
      } else if (lowerMessage.includes('welcome') || lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('thanks')) {
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
        const states = expression === 'happy' || expression === 'friendly' ? ['smile', 'half-open', 'smile'] : ['open', 'half-open', 'closed'];
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

  const getProfessionalStyle = (personaKey) => {
    // Young professional man styling
    const baseStyle = {
      skinTone: '#F2D2A9', // Young, healthy skin
      hairColor: '#3D2914', // Dark professional hair
      eyeColor: '#2E5984', // Intelligent blue-brown eyes
      beardColor: '#4A3728' // Light stubble
    };
    
    const styles = {
      architect: {
        ...baseStyle,
        accent: '#FF6B35',
        shirtColor: '#D84315'
      },
      engineer: {
        ...baseStyle,
        accent: '#1976D2',
        shirtColor: '#0D47A1'
      },
      mentor: {
        ...baseStyle,
        accent: '#388E3C',
        shirtColor: '#2E7D32'
      },
      interviewer: {
        ...baseStyle,
        accent: '#7B1FA2',
        shirtColor: '#4A148C'
      }
    };
    return styles[personaKey] || styles.engineer;
  };

  const style = getProfessionalStyle(persona);

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
              filter: 'drop-shadow(0 0 15px rgba(255, 107, 53, 0.4))'
            },
            '50%': { 
              transform: 'translateY(-5px)',
              filter: 'drop-shadow(0 0 25px rgba(255, 107, 53, 0.7))'
            }
          }
        }}
      >
        {/* Realistic Professional Head */}
        <Box
          sx={{
            width: 150,
            height: 190,
            margin: '0 auto',
            position: 'relative',
            borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%', // Strong masculine jawline
            background: `radial-gradient(ellipse at 30% 30%, ${style.skinTone}ff, ${style.skinTone}ee, ${style.skinTone}dd)`,
            boxShadow: `
              inset -12px -12px 24px rgba(0,0,0,0.12),
              inset 12px 12px 24px rgba(255,255,255,0.5),
              0 20px 40px rgba(0,0,0,0.3)
            `,
            transform: 'translateZ(30px)',
            // Realistic hair with volume and texture
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-30px',
              left: '12px',
              right: '12px',
              height: '45px',
              background: `linear-gradient(135deg, ${style.hairColor}ff, ${style.hairColor}ee, ${style.hairColor}dd)`,
              borderRadius: '40px 40px 28px 28px',
              boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.3)',
              // Hair texture
              backgroundImage: `
                radial-gradient(circle at 20% 20%, ${style.hairColor}cc 1px, transparent 1px),
                radial-gradient(circle at 80% 40%, ${style.hairColor}cc 1px, transparent 1px),
                radial-gradient(circle at 40% 80%, ${style.hairColor}cc 1px, transparent 1px)
              `,
              backgroundSize: '8px 8px, 6px 6px, 10px 10px'
            },
            // Hair sides with fade
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '-18px',
              left: '18px',
              right: '18px',
              height: '30px',
              background: `linear-gradient(90deg, ${style.hairColor}88, ${style.hairColor}cc, ${style.hairColor}88)`,
              borderRadius: '25px',
              opacity: 0.8
            }
          }}
        >
          {/* Realistic thick eyebrows */}
          <Box
            sx={{
              position: 'absolute',
              top: '24%',
              left: '18%',
              width: '26px',
              height: '6px',
              background: `linear-gradient(90deg, ${style.hairColor}dd, ${style.hairColor}ff, ${style.hairColor}ee)`,
              borderRadius: '4px 2px 2px 4px',
              transform: `translateZ(5px) rotate(${eyebrowPosition - 3}deg) translateY(${eyebrowPosition}px)`,
              transition: 'transform 0.3s ease',
              boxShadow: '0 3px 6px rgba(0,0,0,0.4)',
              // Eyebrow hair texture
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '1px',
                left: '2px',
                right: '2px',
                height: '4px',
                background: `repeating-linear-gradient(
                  75deg,
                  ${style.hairColor}aa 0px,
                  transparent 1px,
                  transparent 2px,
                  ${style.hairColor}aa 3px
                )`,
                borderRadius: '2px'
              }
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              top: '24%',
              right: '18%',
              width: '26px',
              height: '6px',
              background: `linear-gradient(90deg, ${style.hairColor}ee, ${style.hairColor}ff, ${style.hairColor}dd)`,
              borderRadius: '2px 4px 4px 2px',
              transform: `translateZ(5px) rotate(${-eyebrowPosition + 3}deg) translateY(${eyebrowPosition}px)`,
              transition: 'transform 0.3s ease',
              boxShadow: '0 3px 6px rgba(0,0,0,0.4)',
              // Eyebrow hair texture
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '1px',
                left: '2px',
                right: '2px',
                height: '4px',
                background: `repeating-linear-gradient(
                  105deg,
                  ${style.hairColor}aa 0px,
                  transparent 1px,
                  transparent 2px,
                  ${style.hairColor}aa 3px
                )`,
                borderRadius: '2px'
              }
            }}
          />

          {/* Realistic expressive eyes */}
          <Box
            sx={{
              position: 'absolute',
              top: '32%',
              left: '22%',
              width: '18px',
              height: blinkState ? '2px' : '14px',
              background: 'linear-gradient(145deg, #ffffff, #f8f8f8)',
              borderRadius: '50%',
              boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.2)',
              transition: 'height 0.1s ease',
              transform: 'translateZ(8px)',
              border: `1px solid ${style.eyeColor}40`,
              '&::before': !blinkState ? {
                content: '""',
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '14px',
                height: '10px',
                background: `radial-gradient(ellipse at 40% 30%, ${style.eyeColor}ff, ${style.eyeColor}dd, ${style.eyeColor}aa)`,
                borderRadius: '50%',
                boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.4)'
              } : {},
              '&::after': !blinkState ? {
                content: '""',
                position: 'absolute',
                top: '3px',
                left: '6px',
                width: '6px',
                height: '6px',
                background: '#000000',
                borderRadius: '50%',
                boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.5)'
              } : {}
            }}
          />
          
          {/* Eye shine/reflection */}
          {!blinkState && (
            <Box
              sx={{
                position: 'absolute',
                top: '34%',
                left: '26%',
                width: '3px',
                height: '3px',
                background: 'white',
                borderRadius: '50%',
                transform: 'translateZ(10px)',
                opacity: 0.9
              }}
            />
          )}
          
          <Box
            sx={{
              position: 'absolute',
              top: '32%',
              right: '22%',
              width: '18px',
              height: blinkState ? '2px' : '14px',
              background: 'linear-gradient(145deg, #ffffff, #f8f8f8)',
              borderRadius: '50%',
              boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.2)',
              transition: 'height 0.1s ease',
              transform: 'translateZ(8px)',
              border: `1px solid ${style.eyeColor}40`,
              '&::before': !blinkState ? {
                content: '""',
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '14px',
                height: '10px',
                background: `radial-gradient(ellipse at 60% 30%, ${style.eyeColor}ff, ${style.eyeColor}dd, ${style.eyeColor}aa)`,
                borderRadius: '50%',
                boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.4)'
              } : {},
              '&::after': !blinkState ? {
                content: '""',
                position: 'absolute',
                top: '3px',
                left: '6px',
                width: '6px',
                height: '6px',
                background: '#000000',
                borderRadius: '50%',
                boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.5)'
              } : {}
            }}
          />
          
          {/* Eye shine/reflection */}
          {!blinkState && (
            <Box
              sx={{
                position: 'absolute',
                top: '34%',
                right: '26%',
                width: '3px',
                height: '3px',
                background: 'white',
                borderRadius: '50%',
                transform: 'translateZ(10px)',
                opacity: 0.9
              }}
            />
          )}

          {/* Professional nose */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%) translateZ(8px)',
              width: '7px',
              height: '10px',
              background: `linear-gradient(145deg, ${style.skinTone}, ${style.skinTone}cc)`,
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
              boxShadow: '1px 2px 3px rgba(0,0,0,0.15)'
            }}
          />
          
          {/* Nostrils */}
          <Box
            sx={{
              position: 'absolute',
              top: '54%',
              left: '47%',
              width: '2px',
              height: '3px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '50%',
              transform: 'translateZ(6px)'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '54%',
              right: '47%',
              width: '2px',
              height: '3px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '50%',
              transform: 'translateZ(6px)'
            }}
          />

          {/* Clean-shaven professional look - no mustache */}

          {/* Realistic mouth with lips */}
          <Box
            sx={{
              position: 'absolute',
              top: '68%',
              left: '50%',
              transform: 'translateX(-50%) translateZ(6px)',
              width: mouthState === 'open' ? '30px' : mouthState === 'half-open' ? '24px' : '22px',
              height: mouthState === 'open' ? '20px' : mouthState === 'half-open' ? '14px' : '6px',
              background: mouthState === 'smile' ? 'none' : mouthState === 'frown' ? 'none' : 'linear-gradient(145deg, #8B4513, #A0522D, #654321)',
              borderRadius: mouthState === 'smile' ? '0' : mouthState === 'frown' ? '0' : '50%',
              border: mouthState === 'smile' ? `3px solid ${style.accent}` : mouthState === 'frown' ? `3px solid #f44336` : 'none',
              borderTop: (mouthState === 'smile' || mouthState === 'frown') ? 'none' : undefined,
              borderRadius: mouthState === 'smile' ? '0 0 30px 30px' : mouthState === 'frown' ? '30px 30px 0 0' : '50%',
              transition: 'all 0.2s ease',
              boxShadow: mouthState !== 'smile' ? 'inset 0 4px 8px rgba(0,0,0,0.5), 0 2px 4px rgba(255,255,255,0.1)' : `0 3px 6px ${style.accent}50`,
              // Upper lip
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '10%',
                right: '10%',
                height: '4px',
                background: `linear-gradient(145deg, ${style.skinTone}dd, ${style.skinTone}bb)`,
                borderRadius: '50% 50% 20% 20%',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
              },
              // Lower lip
              '&::after': mouthState !== 'open' ? {
                content: '""',
                position: 'absolute',
                bottom: '-2px',
                left: '15%',
                right: '15%',
                height: '3px',
                background: `linear-gradient(145deg, ${style.skinTone}cc, ${style.skinTone}aa)`,
                borderRadius: '20% 20% 50% 50%',
                boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
              } : {}
            }}
          />

          {/* Light stubble for professional look */}
          <Box
            sx={{
              position: 'absolute',
              top: '70%',
              left: '30%',
              right: '30%',
              height: '20px',
              background: `radial-gradient(ellipse, ${style.beardColor}30, transparent)`,
              borderRadius: '0 0 20px 20px',
              transform: 'translateZ(1px)'
            }}
          />
        </Box>

        {/* Realistic masculine neck */}
        <Box
          sx={{
            width: '55px',
            height: '40px',
            background: `linear-gradient(145deg, ${style.skinTone}ff, ${style.skinTone}ee, ${style.skinTone}dd)`,
            margin: '0 auto',
            borderRadius: '28px 28px 15px 15px',
            transform: 'translateZ(18px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            // Neck muscles/definition
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '12px',
              height: '8px',
              background: `linear-gradient(145deg, ${style.skinTone}dd, ${style.skinTone}bb)`,
              borderRadius: '50%',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
            },
            // Neck shadow/definition
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '20%',
              left: '20%',
              right: '20%',
              height: '60%',
              background: `linear-gradient(180deg, transparent, ${style.skinTone}aa, transparent)`,
              borderRadius: '50%',
              opacity: 0.3
            }
          }}
        />

        {/* Professional Suit Jacket */}
        <Box
          sx={{
            width: '160px',
            height: '80px',
            background: `linear-gradient(145deg, #1A1A1A, #2D2D2D, #1A1A1A)`,
            margin: '0 auto',
            borderRadius: '80px 80px 30px 30px',
            transform: 'translateZ(8px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            position: 'relative',
            border: '2px solid #333',
            // Suit lapels
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '10px',
              left: '20px',
              width: '25px',
              height: '40px',
              background: 'linear-gradient(135deg, #2D2D2D, #1A1A1A)',
              borderRadius: '15px 5px 20px 5px',
              boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)',
              transform: 'rotate(-15deg)'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '10px',
              right: '20px',
              width: '25px',
              height: '40px',
              background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)',
              borderRadius: '5px 15px 5px 20px',
              boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)',
              transform: 'rotate(15deg)'
            }
          }}
        />
        
        {/* White Dress Shirt */}
        <Box
          sx={{
            position: 'absolute',
            top: '75%',
            left: '50%',
            transform: 'translateX(-50%) translateZ(12px)',
            width: '50px',
            height: '35px',
            background: 'linear-gradient(145deg, #FFFFFF, #F5F5F5)',
            borderRadius: '25px 25px 15px 15px',
            boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
            border: '1px solid #E0E0E0'
          }}
        />
        
        {/* Professional Tie */}
        <Box
          sx={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translateX(-50%) translateZ(15px)',
            width: '12px',
            height: '45px',
            background: `linear-gradient(180deg, ${style.accent}, ${style.accent}dd, ${style.accent}aa)`,
            borderRadius: '6px 6px 0 0',
            boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
            // Tie pattern
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '5px',
              left: '2px',
              right: '2px',
              height: '35px',
              background: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 3px,
                rgba(255,255,255,0.1) 3px,
                rgba(255,255,255,0.1) 6px
              )`,
              borderRadius: '4px'
            },
            // Tie knot
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '-8px',
              left: '-2px',
              right: '-2px',
              height: '12px',
              background: `linear-gradient(145deg, ${style.accent}ee, ${style.accent}bb)`,
              borderRadius: '8px 8px 4px 4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
            }
          }}
        />
        
        {/* Shirt Collar */}
        <Box
          sx={{
            position: 'absolute',
            top: '68%',
            left: '50%',
            transform: 'translateX(-50%) translateZ(10px)',
            width: '30px',
            height: '15px',
            background: 'linear-gradient(145deg, #FFFFFF, #F8F8F8)',
            borderRadius: '15px 15px 5px 5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            border: '1px solid #E0E0E0',
            // Collar points
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '8px',
              left: '5px',
              width: '8px',
              height: '8px',
              background: '#FFFFFF',
              borderRadius: '0 0 0 8px',
              transform: 'rotate(-45deg)',
              boxShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '8px',
              right: '5px',
              width: '8px',
              height: '8px',
              background: '#FFFFFF',
              borderRadius: '0 0 8px 0',
              transform: 'rotate(45deg)',
              boxShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }
          }}
        />
        
        {/* Suit Buttons */}
        <Box
          sx={{
            position: 'absolute',
            top: '78%',
            left: '45%',
            width: '4px',
            height: '4px',
            background: 'linear-gradient(145deg, #C0C0C0, #808080)',
            borderRadius: '50%',
            transform: 'translateZ(12px)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            top: '85%',
            left: '45%',
            width: '4px',
            height: '4px',
            background: 'linear-gradient(145deg, #C0C0C0, #808080)',
            borderRadius: '50%',
            transform: 'translateZ(12px)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        />
        
        {/* Pocket Square */}
        <Box
          sx={{
            position: 'absolute',
            top: '72%',
            left: '25%',
            width: '8px',
            height: '6px',
            background: 'linear-gradient(145deg, #FFFFFF, #F0F0F0)',
            borderRadius: '1px',
            transform: 'translateZ(10px)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            border: '0.5px solid #E0E0E0'
          }}
        />

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
            fontSize: '1.8rem',
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
          variant="h5" 
          sx={{ 
            fontWeight: 'bold', 
            color: style.accent,
            mb: 0.5,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {PERSONAS[persona]?.name || 'DevOps Engineer'}
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'text.secondary',
            mb: 1,
            fontStyle: 'italic',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}
        >
          DevOps Solutions Architect • Age 27
        </Typography>

        {/* Status Indicators */}
        {isThinking && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 2 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: `linear-gradient(145deg, ${style.accent}, ${style.accent}dd)`,
                  animation: `thinking-dots 1.5s ease-in-out ${i * 0.3}s infinite`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  '@keyframes thinking-dots': {
                    '0%, 80%, 100%': { 
                      opacity: 0.3, 
                      transform: 'scale(0.8) translateZ(0px)' 
                    },
                    '40%': { 
                      opacity: 1, 
                      transform: 'scale(1.2) translateZ(10px)' 
                    }
                  }
                }}
              />
            ))}
          </Box>
        )}

        {isSpeaking && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 4,
                  background: `linear-gradient(to top, ${style.accent}, ${style.accent}aa)`,
                  borderRadius: '2px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  animation: `sound-bars 0.6s ease-in-out ${i * 0.1}s infinite alternate`,
                  '@keyframes sound-bars': {
                    '0%': { height: '15px', opacity: 0.5 },
                    '100%': { height: '35px', opacity: 1 }
                  }
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ 
          maxWidth: '320px',
          p: 2,
          bgcolor: `${style.accent}08`,
          borderRadius: 2,
          border: `1px solid ${style.accent}20`
        }}>
          <Typography 
            variant="body2" 
            color="text.primary" 
            sx={{ 
              lineHeight: 1.4,
              fontSize: '0.9rem'
            }}
          >
            "Hello! I'm your DevOps expert with deep expertise in cloud architecture and automation. Ready to help you build enterprise-grade solutions that scale! 🏢⚙️"
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PawanKalyanAvatar;