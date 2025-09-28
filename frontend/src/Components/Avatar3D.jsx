import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PERSONAS } from './PersonaSelector';

function AvatarMesh({ persona, isThinking, isSpeaking }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Thinking animation - faster rotation
      if (isThinking) {
        meshRef.current.rotation.y += 0.02;
      }
      
      // Speaking animation - gentle scaling
      if (isSpeaking) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.05;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const getPersonaColor = (personaKey) => {
    const colors = {
      architect: '#4CAF50', // Green
      engineer: '#2196F3',  // Blue
      mentor: '#FF9800',    // Orange
      interviewer: '#9C27B0' // Purple
    };
    return colors[personaKey] || '#2196F3';
  };

  return (
    <group ref={meshRef}>
      {/* Main avatar body */}
      <mesh
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={hovered ? '#ffffff' : getPersonaColor(persona)}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Mouth */}
      <mesh 
        position={[0, -0.2, 0.8]}
        rotation={[0, 0, isSpeaking ? Math.sin(Date.now() * 0.01) * 0.2 : 0]}
      >
        <boxGeometry args={[0.3, 0.05, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

function Avatar3D({ persona = 'architect', isThinking = false, isSpeaking = false }) {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} color="#0066cc" intensity={0.3} />
        
        <AvatarMesh 
          persona={persona} 
          isThinking={isThinking} 
          isSpeaking={isSpeaking} 
        />
        

      </Canvas>
    </div>
  );
}

export default Avatar3D;