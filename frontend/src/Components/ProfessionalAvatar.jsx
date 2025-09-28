import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { PERSONAS } from './PersonaSelector';

function ProfessionalAvatar({ persona = 'architect', isThinking = false, isSpeaking = false, isListening = false }) {
  const [blinkState, setBlinkState] = useState(false);
  const [mouthFrame, setMouthFrame] = useState(0);
  const [eyeDirection, setEyeDirection] = useState({ x: 0, y: 0 });
  const [smileIntensity, setSmileIntensity] = useState(0.3);

  // Natural blinking pattern
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 100);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Subtle eye movement for thinking
  useEffect(() => {
    if (isThinking) {
      const eyeInterval = setInterval(() => {
        setEyeDirection({
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 2
        });
      }, 1200);
      return () => clearInterval(eyeInterval);
    } else {
      setEyeDirection({ x: 0, y: 0 });
    }
  }, [isThinking]);

  // Natural mouth movement for speaking
  useEffect(() => {
    if (isSpeaking) {
      const mouthInterval = setInterval(() => {
        setMouthFrame(prev => (prev + 1) % 6);
        setSmileIntensity(0.1 + Math.random() * 0.3);
      }, 180);
      return () => clearInterval(mouthInterval);
    } else {
      setMouthFrame(0);
      setSmileIntensity(0.3);
    }
  }, [isSpeaking]);

  // Friendly smile when listening
  useEffect(() => {
    if (isListening) {
      setSmileIntensity(0.5);
    } else if (!isSpeaking) {
      setSmileIntensity(0.3);
    }
  }, [isListening, isSpeaking]);

  const getPersonaStyle = (personaKey) => {
    const styles = {
      architect: {
        skinTone: '#F4C2A1',
        hairColor: '#8B4513',
        eyeColor: '#4A90E2',
        accent: '#4CAF50',
        personality: 'confident'
      },
      engineer: {
        skinTone: '#E8B982',
        hairColor: '#2C1810',
        eyeColor: '#228B22',
        accent: '#2196F3',
        personality: 'focused'
      },
      mentor: {
        skinTone: '#DEB887',
        hairColor: '#696969',
        eyeColor: '#8B4513',
        accent: '#FF9800',
        personality: 'wise'
      },
      interviewer: {
        skinTone: '#F1C27D',
        hairColor: '#000000',
        eyeColor: '#4B0082',
        accent: '#9C27B0',
        personality: 'professional'
      }
    };
    return styles[personaKey] || styles.architect;
  };

  const style = getPersonaStyle(persona);

  const getMouthPath = () => {
    const baseY = 68;
    const smileOffset = smileIntensity * 3;
    
    if (!isSpeaking) {
      if (isListening) {
        // Warm, welcoming smile
        return `M 42 ${baseY - smileOffset} Q 50 ${baseY - smileOffset - 2} 58 ${baseY - smileOffset}`;
      }
      if (isThinking) {
        // Slight contemplative expression
        return `M 44 ${baseY} Q 50 ${baseY + 1} 56 ${baseY}`;
      }
      // Gentle, approachable smile
      return `M 43 ${baseY - smileOffset} Q 50 ${baseY - smileOffset - 1} 57 ${baseY - smileOffset}`;
    }

    // Speaking mouth shapes
    const frames = [
      `M 46 ${baseY} Q 50 ${baseY + 3} 54 ${baseY}`, // Small O
      `M 44 ${baseY - 1} Q 50 ${baseY + 4} 56 ${baseY - 1}`, // Wide O
      `M 45 ${baseY} Q 50 ${baseY + 2} 55 ${baseY}`, // Medium O
      `M 43 ${baseY - 1} Q 50 ${baseY - 1} 57 ${baseY - 1}`, // Smile while speaking
      `M 47 ${baseY} L 53 ${baseY}`, // Closed
      `M 44 ${baseY} Q 50 ${baseY + 1} 56 ${baseY}` // Slight open
    ];
    return frames[mouthFrame];
  };

  const getEyeHeight = () => blinkState ? 1 : 6;
  const getEyebrowY = () => isThinking ? 38 : 40;

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        minHeight: '450px',
        justifyContent: 'center',
        position: 'relative',
        border: `2px solid ${style.accent}20`
      }}
    >
      {/* Professional Status Badge */}
      <Box sx={{ 
        position: 'absolute', 
        top: 15, 
        right: 15,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: `${style.accent}15`,
        px: 2,
        py: 0.5,
        borderRadius: 3,
        border: `1px solid ${style.accent}30`
      }}>
        {isThinking && (
          <Typography variant="caption" color={style.accent} sx={{ fontWeight: 'bold' }}>
            💭 Analyzing...
          </Typography>
        )}
        {isSpeaking && (
          <Typography variant="caption" color={style.accent} sx={{ fontWeight: 'bold' }}>
            💬 Advising
          </Typography>
        )}
        {isListening && (
          <Typography variant="caption" color={style.accent} sx={{ fontWeight: 'bold' }}>
            👂 Listening
          </Typography>
        )}
        {!isThinking && !isSpeaking && !isListening && (
          <Typography variant="caption" color={style.accent} sx={{ fontWeight: 'bold' }}>
            ✨ Ready
          </Typography>
        )}
      </Box>

      {/* Professional Avatar */}
      <Box
        sx={{
          width: 200,
          height: 240,
          position: 'relative',
          mb: 2,
          transform: isThinking ? 'rotate(-0.5deg)' : isSpeaking ? 'scale(1.01)' : 'none',
          transition: 'transform 0.4s ease',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
        }}
      >
        <svg width="200" height="240" viewBox="0 0 120 140">
          {/* Professional Background Circle */}
          <circle 
            cx="60" 
            cy="65" 
            r="45" 
            fill={`url(#gradient-${persona})`}
            opacity="0.1"
          />
          
          {/* Gradient Definitions */}
          <defs>
            <radialGradient id={`gradient-${persona}`} cx="50%" cy="30%">
              <stop offset="0%" stopColor={style.accent} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="faceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={style.skinTone} />
              <stop offset="100%" stopColor={`${style.skinTone}dd`} />
            </linearGradient>
          </defs>
          
          {/* Professional Hairstyle */}
          <path 
            d="M 30 40 Q 60 25 90 40 Q 88 30 60 28 Q 32 30 30 40" 
            fill={style.hairColor}
          />
          <path 
            d="M 32 42 Q 35 38 40 42" 
            fill={style.hairColor}
          />
          <path 
            d="M 80 42 Q 85 38 88 42" 
            fill={style.hairColor}
          />
          
          {/* Face Shape - Professional and Friendly */}
          <ellipse 
            cx="60" 
            cy="65" 
            rx="28" 
            ry="35" 
            fill="url(#faceGradient)"
            stroke={`${style.accent}30`}
            strokeWidth="0.5"
          />
          
          {/* Forehead */}
          <ellipse 
            cx="60" 
            cy="50" 
            rx="25" 
            ry="18" 
            fill={style.skinTone}
          />
          
          {/* Professional Eyebrows */}
          <path 
            d={`M 45 ${getEyebrowY()} Q 50 ${getEyebrowY() - 1} 55 ${getEyebrowY()}`} 
            stroke={style.hairColor} 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d={`M 65 ${getEyebrowY()} Q 70 ${getEyebrowY() - 1} 75 ${getEyebrowY()}`} 
            stroke={style.hairColor} 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Eyes - Warm and Professional */}
          <ellipse 
            cx="50" 
            cy="55" 
            rx="7" 
            ry={getEyeHeight()} 
            fill="white"
            stroke={`${style.eyeColor}30`}
            strokeWidth="0.5"
          />
          <ellipse 
            cx="70" 
            cy="55" 
            rx="7" 
            ry={getEyeHeight()} 
            fill="white"
            stroke={`${style.eyeColor}30`}
            strokeWidth="0.5"
          />
          
          {/* Eye Details */}
          {!blinkState && (
            <>
              {/* Iris */}
              <circle 
                cx={50 + eyeDirection.x} 
                cy={55 + eyeDirection.y} 
                r="3.5" 
                fill={style.eyeColor}
              />
              <circle 
                cx={70 + eyeDirection.x} 
                cy={55 + eyeDirection.y} 
                r="3.5" 
                fill={style.eyeColor}
              />
              
              {/* Pupils */}
              <circle 
                cx={50 + eyeDirection.x} 
                cy={55 + eyeDirection.y} 
                r="2" 
                fill="#000"
              />
              <circle 
                cx={70 + eyeDirection.x} 
                cy={55 + eyeDirection.y} 
                r="2" 
                fill="#000"
              />
              
              {/* Eye shine - makes eyes look alive */}
              <circle 
                cx={51 + eyeDirection.x} 
                cy={54 + eyeDirection.y} 
                r="1" 
                fill="white"
              />
              <circle 
                cx={71 + eyeDirection.x} 
                cy={54 + eyeDirection.y} 
                r="1" 
                fill="white"
              />
              
              {/* Subtle eye shadow for depth */}
              <ellipse 
                cx="50" 
                cy="52" 
                rx="6" 
                ry="2" 
                fill="rgba(0,0,0,0.05)"
              />
              <ellipse 
                cx="70" 
                cy="52" 
                rx="6" 
                ry="2" 
                fill="rgba(0,0,0,0.05)"
              />
            </>
          )}
          
          {/* Professional Nose */}
          <path 
            d="M 60 58 L 58 63 Q 60 64 62 63 Z" 
            fill="rgba(0,0,0,0.08)"
          />
          <ellipse 
            cx="59" 
            cy="63" 
            rx="1" 
            ry="1.5" 
            fill="rgba(0,0,0,0.1)"
          />
          <ellipse 
            cx="61" 
            cy="63" 
            rx="1" 
            ry="1.5" 
            fill="rgba(0,0,0,0.1)"
          />
          
          {/* Friendly, Professional Mouth */}
          <path 
            d={getMouthPath()} 
            stroke={style.accent} 
            strokeWidth="2.5" 
            fill={isSpeaking && mouthFrame < 4 ? `${style.accent}20` : "none"}
            strokeLinecap="round"
          />
          
          {/* Teeth when speaking */}
          {isSpeaking && mouthFrame < 4 && (
            <rect 
              x="56" 
              y="69" 
              width="8" 
              height="2" 
              fill="white" 
              rx="1"
            />
          )}
          
          {/* Subtle cheek definition */}
          <ellipse 
            cx="40" 
            cy="62" 
            rx="4" 
            ry="3" 
            fill="rgba(255, 182, 193, 0.2)"
          />
          <ellipse 
            cx="80" 
            cy="62" 
            rx="4" 
            ry="3" 
            fill="rgba(255, 182, 193, 0.2)"
          />
          
          {/* Professional jawline */}
          <ellipse 
            cx="60" 
            cy="85" 
            rx="20" 
            ry="15" 
            fill={style.skinTone}
          />
          
          {/* Neck and collar */}
          <rect 
            x="55" 
            y="95" 
            width="10" 
            height="18" 
            fill={style.skinTone}
          />
          
          {/* Professional shirt collar */}
          <path 
            d="M 45 110 L 60 105 L 75 110 L 75 120 L 45 120 Z" 
            fill={style.accent}
          />
          <path 
            d="M 55 105 L 60 100 L 65 105" 
            fill="white"
            stroke={style.accent}
            strokeWidth="1"
          />
        </svg>

        {/* Professional Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: -5,
            right: 10,
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: style.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '3px solid white'
          }}
        >
          {PERSONAS[persona]?.icon || '🤖'}
        </Box>
      </Box>
      
      {/* Professional Title */}
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 'bold', 
          color: style.accent,
          mb: 0.5,
          textAlign: 'center'
        }}
      >
        {PERSONAS[persona]?.name || 'AI Assistant'}
      </Typography>
      
      {/* Professional Subtitle */}
      <Typography 
        variant="subtitle1" 
        sx={{ 
          color: 'text.secondary',
          mb: 2,
          fontStyle: 'italic'
        }}
      >
        DevOps Expert
      </Typography>
      
      {/* Thinking Animation */}
      {isThinking && (
        <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: style.accent,
                animation: `professional-pulse 1.5s ease-in-out ${i * 0.3}s infinite`,
                '@keyframes professional-pulse': {
                  '0%, 80%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
                  '40%': { opacity: 1, transform: 'scale(1.3)' }
                }
              }}
            />
          ))}
        </Box>
      )}

      {/* Professional Sound Visualization */}
      {isSpeaking && (
        <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'end' }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Box
              key={i}
              sx={{
                width: 4,
                bgcolor: style.accent,
                borderRadius: '2px',
                animation: `professional-wave 0.5s ease-in-out ${i * 0.1}s infinite alternate`,
                '@keyframes professional-wave': {
                  '0%': { height: '12px', opacity: 0.5 },
                  '100%': { height: '28px', opacity: 1 }
                }
              }}
            />
          ))}
        </Box>
      )}

      {/* Welcoming Message */}
      {isListening && (
        <Box sx={{ 
          textAlign: 'center',
          mb: 2,
          p: 2,
          bgcolor: `${style.accent}10`,
          borderRadius: 2,
          border: `1px solid ${style.accent}30`
        }}>
          <Typography variant="body1" color={style.accent} sx={{ fontWeight: 'bold' }}>
            How can I help you today?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            I'm here to guide you through your DevOps journey
          </Typography>
        </Box>
      )}
      
      {/* Professional Description */}
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          textAlign: 'center', 
          maxWidth: '250px',
          fontSize: '0.9rem',
          lineHeight: 1.4
        }}
      >
        {PERSONAS[persona]?.prompt.replace(/\[.*?\]\s*/, '').substring(0, 85)}...
      </Typography>
    </Box>
  );
}

export default ProfessionalAvatar;