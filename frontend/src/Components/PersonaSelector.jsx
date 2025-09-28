import React from 'react';
import { FormControl, Select, MenuItem, Typography, Box } from '@mui/material';

const PERSONAS = {
  // Engineering Roles
  devops_engineer: { name: 'DevOps Engineer', icon: '⚙️', category: 'Engineering', prompt: 'Act as a DevOps Engineer. Help with CI/CD pipelines, automation, containerization, and deployment strategies.' },
  platform_engineer: { name: 'Platform Engineer', icon: '🛠️', category: 'Engineering', prompt: 'Act as a Platform Engineer. Provide guidance on developer platforms, internal tooling, and infrastructure abstraction.' },
  sre: { name: 'Site Reliability Engineer', icon: '🔧', category: 'Engineering', prompt: 'Act as an SRE. Help with system reliability, monitoring, incident response, and performance optimization.' },
  mlops_engineer: { name: 'MLOps Engineer', icon: '🤖', category: 'Engineering', prompt: 'Act as an MLOps Engineer. Provide guidance on ML pipelines, model deployment, and ML infrastructure.' },
  
  // Architecture & Design Roles
  cloud_architect: { name: 'Cloud Architect', icon: '☁️', category: 'Architecture', prompt: 'Act as a Cloud Architect. Provide guidance on cloud infrastructure design and architectural patterns.' },
  solutions_architect: { name: 'Solutions Architect', icon: '🏗️', category: 'Architecture', prompt: 'Act as a Solutions Architect. Help with end-to-end system design and technology selection.' },
  
  // Security & Compliance Roles
  devsecops_engineer: { name: 'DevSecOps Engineer', icon: '🔒', category: 'Security', prompt: 'Act as a DevSecOps Engineer. Provide guidance on security automation and secure development practices.' },
  security_architect: { name: 'Security Architect', icon: '🛡️', category: 'Security', prompt: 'Act as a Security Architect. Help with security design, threat modeling, and security governance.' },
  
  // Management & Leadership Roles
  engineering_manager: { name: 'Engineering Manager', icon: '👨💼', category: 'Management', prompt: 'Act as an Engineering Manager. Provide guidance on team leadership and technical strategy.' },
  devops_director: { name: 'DevOps Director', icon: '📊', category: 'Management', prompt: 'Act as a DevOps Director. Help with organizational transformation and executive communication.' },
  
  // Career & Learning
  career_mentor: { name: 'Career Mentor', icon: '👨🏫', category: 'Career', prompt: 'Act as a DevOps career mentor. Provide career path guidance and skill development roadmaps.' },
  technical_interviewer: { name: 'Technical Interviewer', icon: '💻', category: 'Career', prompt: 'Act as a DevOps technical interviewer. Help with interview preparation and technical questions.' }
};

function PersonaSelector({ selectedPersona, onPersonaChange }) {
  return (
    <Box sx={{ mb: 3, p: 3, bgcolor: 'primary.50', borderRadius: 2, border: '1px solid', borderColor: 'primary.200' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        🤖 Choose Your DevOps Role Expert:
      </Typography>
      <FormControl fullWidth>
        <Select 
          value={selectedPersona} 
          onChange={(e) => onPersonaChange(e.target.value)}
          sx={{ bgcolor: 'white', borderRadius: 1 }}
        >
          {Object.entries(PERSONAS).map(([key, persona]) => (
            <MenuItem key={key} value={key} sx={{ py: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Typography variant="h5">{persona.icon}</Typography>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {persona.name}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      bgcolor: 'primary.100', 
                      color: 'primary.800', 
                      px: 1, 
                      py: 0.25, 
                      borderRadius: 1,
                      fontSize: '0.7rem'
                    }}>
                      {persona.category}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {persona.prompt.replace(/Act as a[n]? /, '').substring(0, 50)}...
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', fontStyle: 'italic' }}>
        Current: {PERSONAS[selectedPersona]?.name} - {PERSONAS[selectedPersona]?.prompt.replace(/\[.*?\]\s*/, '').substring(0, 80)}...
      </Typography>
    </Box>
  );
}

export { PERSONAS };
export default PersonaSelector;