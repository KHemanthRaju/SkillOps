import React from 'react';
import { Box } from '@mui/material';

const SparkyAvatar = ({ size = 60, animate = false }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #8C1D40 0%, #FFC627 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: animate ? 'bounce 2s infinite' : 'none',
        '@keyframes bounce': {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-10px)',
          },
          '60%': {
            transform: 'translateY(-5px)',
          },
        }
      }}
    >
      {/* Sparky's Face */}
      <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 100 100">
        {/* Head */}
        <circle cx="50" cy="45" r="35" fill="#8C1D40" stroke="#FFC627" strokeWidth="3"/>
        
        {/* Eyes */}
        <circle cx="40" cy="38" r="4" fill="#FFC627"/>
        <circle cx="60" cy="38" r="4" fill="#FFC627"/>
        <circle cx="40" cy="38" r="2" fill="#000"/>
        <circle cx="60" cy="38" r="2" fill="#000"/>
        
        {/* Nose */}
        <ellipse cx="50" cy="48" rx="2" ry="3" fill="#000"/>
        
        {/* Mouth */}
        <path d="M 42 55 Q 50 62 58 55" stroke="#FFC627" strokeWidth="2" fill="none"/>
        
        {/* Horns/Ears */}
        <polygon points="25,25 30,15 35,25" fill="#8C1D40" stroke="#FFC627" strokeWidth="2"/>
        <polygon points="65,25 70,15 75,25" fill="#8C1D40" stroke="#FFC627" strokeWidth="2"/>
        
        {/* Pitchfork symbol on forehead */}
        <path d="M 45 30 L 45 25 M 50 30 L 50 25 M 55 30 L 55 25 M 43 25 L 57 25" 
              stroke="#FFC627" strokeWidth="1.5" fill="none"/>
      </svg>
      
      {/* Glow effect */}
      <Box
        sx={{
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(140, 29, 64, 0.3) 0%, rgba(255, 198, 39, 0.3) 100%)',
          zIndex: -1,
          filter: 'blur(4px)',
        }}
      />
    </Box>
  );
};

export default SparkyAvatar;