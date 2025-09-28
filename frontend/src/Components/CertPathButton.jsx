import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Chip, LinearProgress } from '@mui/material';
import { School, TrendingUp, AccessTime, AttachMoney } from '@mui/icons-material';

const CertPathButton = () => {
  const [open, setOpen] = useState(false);

  const certifications = [
    {
      name: "AWS Solutions Architect Associate",
      difficulty: "Intermediate",
      studyTime: "2-3 months",
      salaryBoost: "$15,000-25,000",
      roi: "High",
      prerequisites: ["Basic AWS knowledge", "Cloud fundamentals"],
      description: "Most popular AWS certification for cloud architects"
    },
    {
      name: "Kubernetes Administrator (CKA)",
      difficulty: "Advanced",
      studyTime: "3-4 months", 
      salaryBoost: "$20,000-30,000",
      roi: "Very High",
      prerequisites: ["Docker experience", "Linux basics"],
      description: "Essential for container orchestration roles"
    },
    {
      name: "Terraform Associate",
      difficulty: "Intermediate",
      studyTime: "1-2 months",
      salaryBoost: "$10,000-18,000", 
      roi: "High",
      prerequisites: ["IaC concepts", "Basic scripting"],
      description: "Infrastructure as Code certification"
    }
  ];

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        startIcon={<School />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#4CAF50',
          '&:hover': { backgroundColor: '#45a049' },
          textTransform: 'none',
          py: 1.5
        }}
      >
        Cert Path Optimizer
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <School color="primary" />
          Certification Path Optimizer
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Personalized certification recommendations based on your current skills and career goals
          </Typography>

          {certifications.map((cert, index) => (
            <Box key={index} sx={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: 2, 
              p: 2, 
              mb: 2,
              backgroundColor: '#fafafa'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {cert.name}
                </Typography>
                <Chip 
                  label={cert.roi} 
                  color={cert.roi === 'Very High' ? 'success' : 'primary'} 
                  size="small" 
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {cert.description}
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Study Time:</strong> {cert.studyTime}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoney fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Salary Boost:</strong> {cert.salaryBoost}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUp fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Difficulty:</strong> {cert.difficulty}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Prerequisites:</strong>
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {cert.prerequisites.map((prereq, i) => (
                    <Chip key={i} label={prereq} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>ROI Progress:</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={cert.roi === 'Very High' ? 90 : 75} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Box>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Get Personalized Plan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CertPathButton;