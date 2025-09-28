import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { PERSONAS } from './PersonaSelector';

function SparkyAvatar3D({ persona = 'architect', isThinking = false, isSpeaking = false, isListening = false, message = '' }) {
  const [blinkState, setBlinkState] = useState(false);
  const [headRotation, setHeadRotation] = useState({ x: 0, y: 0 });
  const [mouthState, setMouthState] = useState('grin');
  const [tailWag, setTailWag] = useState(0);

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
          x: (Math.random() - 0.5) * 15,
          y: (Math.random() - 0.5) * 20
        });
      }, 1500);
      return () => clearInterval(moveInterval);
    } else {
      setHeadRotation({ x: 0, y: 0 });
    }
  }, [isThinking]);

  // Tail wagging animation
  useEffect(() => {
    const wagInterval = setInterval(() => {
      setTailWag(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(wagInterval);
  }, []);

  // Mouth animation for speaking
  useEffect(() => {
    if (isSpeaking) {
      const mouthInterval = setInterval(() => {
        const states = ['open', 'half-open', 'grin'];
        setMouthState(states[Math.floor(Math.random() * states.length)]);
      }, 200);
      return () => clearInterval(mouthInterval);
    } else {
      setMouthState(isListening ? 'grin' : 'smile');
    }
  }, [isSpeaking, isListening]);

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
      {/* 3D Sparky Container */}
      <Box
        sx={{
          width: 300,
          height: 350,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${headRotation.x}deg) rotateY(${headRotation.y}deg)`,
          transition: 'transform 0.8s ease-out',
          animation: getFloatingAnimation(),
          '@keyframes idle-float': {
            '0%, 100%': { transform: 'translateY(0px) rotateX(0deg) rotateY(0deg)' },
            '50%': { transform: 'translateY(-10px) rotateX(3deg) rotateY(0deg)' }
          },
          '@keyframes thinking-float': {
            '0%, 100%': { transform: 'translateY(0px) rotateX(-8deg) rotateY(-15deg)' },
            '33%': { transform: 'translateY(-8px) rotateX(0deg) rotateY(8deg)' },
            '66%': { transform: 'translateY(-5px) rotateX(5deg) rotateY(-8deg)' }
          },
          '@keyframes speaking-bounce': {
            '0%, 100%': { transform: 'translateY(0px) scale(1)' },
            '50%': { transform: 'translateY(-5px) scale(1.03)' }
          },
          '@keyframes listening-glow': {
            '0%, 100%': { 
              transform: 'translateY(0px)',
              filter: 'drop-shadow(0 0 15px rgba(255, 198, 39, 0.4))'
            },
            '50%': { 
              transform: 'translateY(-8px)',
              filter: 'drop-shadow(0 0 25px rgba(255, 198, 39, 0.7))'
            }
          }
        }}
      >
        {/* Sparky's Devil Head */}
        <Box
          sx={{
            width: 180,
            height: 180,
            margin: '0 auto',
            position: 'relative',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #8C1D40, #A0294A, #8C1D40)',
            boxShadow: `
              inset -15px -15px 30px rgba(0,0,0,0.3),
              inset 15px 15px 30px rgba(255,255,255,0.1),
              0 25px 50px rgba(0,0,0,0.4)
            `,
            transform: 'translateZ(30px)',
            // Devil Horns
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-35px',
              left: '25px',
              width: '0',
              height: '0',
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderBottom: '40px solid #8C1D40',
              transform: 'rotate(-20deg)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
              filter: 'brightness(0.9)'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '-35px',
              right: '25px',
              width: '0',
              height: '0',
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderBottom: '40px solid #8C1D40',
              transform: 'rotate(20deg)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
              filter: 'brightness(0.9)'
            }
          }}
        >
          {/* Sparky's Eyes */}
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              left: '20%',
              width: '25px',
              height: blinkState ? '3px' : '20px',
              background: 'radial-gradient(circle, #FFD700, #FFC627, #FF8C00)',
              borderRadius: '50%',
              boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.2), 0 0 15px rgba(255, 215, 0, 0.6)',
              transition: 'height 0.1s ease',
              transform: 'translateZ(8px)',
              '&::after': !blinkState ? {
                content: '""',
                position: 'absolute',
                top: '4px',
                left: '6px',
                width: '13px',
                height: '13px',
                background: 'radial-gradient(circle at 30% 30%, #FFF, #FFD700)',
                borderRadius: '50%',
                boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.3)'
              } : {}
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              right: '20%',
              width: '25px',
              height: blinkState ? '3px' : '20px',
              background: 'radial-gradient(circle, #FFD700, #FFC627, #FF8C00)',
              borderRadius: '50%',
              boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.2), 0 0 15px rgba(255, 215, 0, 0.6)',
              transition: 'height 0.1s ease',
              transform: 'translateZ(8px)',
              '&::after': !blinkState ? {
                content: '""',
                position: 'absolute',
                top: '4px',
                left: '6px',
                width: '13px',
                height: '13px',
                background: 'radial-gradient(circle at 30% 30%, #FFF, #FFD700)',
                borderRadius: '50%',
                boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.3)'
              } : {}
            }}
          />

          {/* Mischievous Eyebrows */}
          <Box
            sx={{
              position: 'absolute',
              top: '18%',
              left: '15%',
              width: '35px',
              height: '8px',
              background: 'linear-gradient(90deg, #6B1426, #8C1D40, #6B1426)',
              borderRadius: '4px',
              transform: 'translateZ(6px) rotate(-15deg)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              top: '18%',
              right: '15%',
              width: '35px',
              height: '8px',
              background: 'linear-gradient(90deg, #6B1426, #8C1D40, #6B1426)',
              borderRadius: '4px',
              transform: 'translateZ(6px) rotate(15deg)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
            }}
          />

          {/* Pitchfork Symbol on Forehead */}
          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              left: '50%',
              transform: 'translateX(-50%) translateZ(8px)',
              width: '30px',
              height: '25px',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '5px',
                left: '3px',
                width: '3px',
                height: '15px',
                background: '#FFC627',
                boxShadow: `9px 0 0 #FFC627, 18px 0 0 #FFC627, 12px 8px 0 #FFC627`,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '5px',
                left: '0',
                width: '24px',
                height: '3px',
                background: '#FFC627',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }
            }}
          />

          {/* Devil Nose */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%) translateZ(10px)',
              width: '12px',
              height: '16px',
              background: 'linear-gradient(145deg, #A0294A, #8C1D40)',
              borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
              boxShadow: '3px 3px 6px rgba(0,0,0,0.3)'
            }}
          />

          {/* Sparky's Mischievous Mouth */}
          <Box
            sx={{
              position: 'absolute',
              top: '70%',
              left: '50%',
              transform: 'translateX(-50%) translateZ(6px)',
              width: mouthState === 'open' ? '40px' : mouthState === 'half-open' ? '35px' : '30px',
              height: mouthState === 'open' ? '25px' : mouthState === 'half-open' ? '18px' : '8px',
              background: mouthState === 'grin' || mouthState === 'smile' ? 'none' : 'radial-gradient(ellipse, #2C0A0A, #1A0606)',
              borderRadius: mouthState === 'grin' || mouthState === 'smile' ? '0' : '50%',
              border: (mouthState === 'grin' || mouthState === 'smile') ? '4px solid #FFC627' : 'none',
              borderTop: (mouthState === 'grin' || mouthState === 'smile') ? 'none' : undefined,
              borderRadius: (mouthState === 'grin' || mouthState === 'smile') ? '0 0 30px 30px' : '50%',
              transition: 'all 0.2s ease',
              boxShadow: mouthState !== 'grin' && mouthState !== 'smile' ? 'inset 0 4px 8px rgba(0,0,0,0.6)' : `0 3px 6px rgba(255, 198, 39, 0.4)`
            }}
          />
          
          {/* Devil Fangs */}
          {(mouthState === 'open' || mouthState === 'half-open' || mouthState === 'grin') && (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  top: '72%',
                  left: '40%',
                  transform: 'translateZ(7px)',
                  width: '0',
                  height: '0',
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: '12px solid #FFF',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '72%',
                  right: '40%',
                  transform: 'translateZ(7px)',
                  width: '0',
                  height: '0',
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: '12px solid #FFF',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              />
            </>
          )}

          {/* Devil Goatee */}
          <Box
            sx={{
              position: 'absolute',
              top: '85%',
              left: '47%',
              right: '47%',
              height: '20px',
              background: 'linear-gradient(180deg, #8C1D40, #6B1426)',
              borderRadius: '0 0 10px 10px',
              transform: 'translateZ(4px)',
              boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.4)'
            }}
          />
        </Box>

        {/* Sparky's Body/Jersey */}
        <Box
          sx={{
            width: '200px',
            height: '120px',
            background: 'linear-gradient(145deg, #8C1D40, #A0294A)',
            margin: '10px auto 0',
            borderRadius: '100px 100px 40px 40px',
            transform: 'translateZ(15px)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            position: 'relative',
            border: '3px solid #FFC627',
            // ASU Logo
            '&::before': {
              content: '"ASU"',
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#FFC627',
              fontSize: '24px',
              fontWeight: 'bold',
              textShadow: '0 3px 6px rgba(0,0,0,0.4)',
              fontFamily: 'serif'
            },
            // Pitchfork Logo
            '&::after': {
              content: '"🔱"',
              position: 'absolute',
              top: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '28px',
              filter: 'hue-rotate(45deg) brightness(1.3)'
            }
          }}
        />

        {/* Devil Tail */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            right: '10px',
            width: '80px',
            height: '6px',
            background: 'linear-gradient(90deg, #8C1D40, #A0294A, #8C1D40)',
            borderRadius: '3px',
            transform: `translateZ(10px) rotate(${Math.sin(tailWag * 0.1) * 30}deg)`,
            transformOrigin: 'left center',
            boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
            '&::after': {
              content: '""',
              position: 'absolute',
              right: '-8px',
              top: '-4px',
              width: '0',
              height: '0',
              borderLeft: '8px solid #8C1D40',
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent'
            }
          }}
        />

        {/* Persona Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: '-15px',
            right: '30px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #FFC627, #FFD700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
            border: '4px solid #8C1D40',
            transform: 'translateZ(40px)',
            animation: isSpeaking ? 'badge-pulse 0.5s ease-in-out infinite alternate' : 'none',
            '@keyframes badge-pulse': {
              '0%': { transform: 'translateZ(40px) scale(1)' },
              '100%': { transform: 'translateZ(40px) scale(1.15)' }
            }
          }}
        >
          {PERSONAS[persona]?.icon || '🤖'}
        </Box>
      </Box>

      {/* Sparky Info */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#FFC627',
            mb: 0.5,
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            fontFamily: 'serif'
          }}
        >
          Sparky {PERSONAS[persona]?.name || 'DevOps Devil'}
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: '#8C1D40',
            mb: 1,
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}
        >
          ASU Sun Devil DevOps Mascot 🔱
        </Typography>

        {/* Status Indicators */}
        {isThinking && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 2 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'linear-gradient(145deg, #FFC627, #FFD700)',
                  animation: `thinking-dots 1.5s ease-in-out ${i * 0.3}s infinite`,
                  boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
                  '@keyframes thinking-dots': {
                    '0%, 80%, 100%': { 
                      opacity: 0.4, 
                      transform: 'scale(0.8) translateZ(0px)' 
                    },
                    '40%': { 
                      opacity: 1, 
                      transform: 'scale(1.3) translateZ(15px)' 
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
                  width: 5,
                  background: 'linear-gradient(to top, #8C1D40, #FFC627)',
                  borderRadius: '3px',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
                  animation: `sound-bars 0.6s ease-in-out ${i * 0.1}s infinite alternate`,
                  '@keyframes sound-bars': {
                    '0%': { height: '20px', opacity: 0.6 },
                    '100%': { height: '45px', opacity: 1 }
                  }
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ 
          maxWidth: '400px',
          p: 3,
          bgcolor: 'rgba(255, 198, 39, 0.1)',
          borderRadius: 3,
          border: '2px solid rgba(255, 198, 39, 0.3)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
        }}>
          <Typography 
            variant="body1" 
            color="text.primary" 
            sx={{ 
              lineHeight: 1.6,
              fontSize: '1.1rem',
              fontWeight: '500',
              textAlign: 'center'
            }}
          >
            "Fear the Fork! 🔱 I'm Sparky, your ASU DevOps devil! Ready to conquer the cloud and dominate deployments? Let's show 'em what Sun Devils can do! 🔥"
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SparkyAvatar3D;