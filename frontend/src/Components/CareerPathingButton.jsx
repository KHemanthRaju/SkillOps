import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, TextField, Chip, Select, MenuItem, FormControl, InputLabel, Grid, Card, CardContent, Stepper, Step, StepLabel, LinearProgress } from '@mui/material';
import { Timeline, Person, School, Work, TrendingUp } from '@mui/icons-material';
import { useProfile } from '../utilities/ProfileContext';

const CareerPathingButton = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    currentRole: '',
    targetRole: '',
    experience: '',
    skills: [],
    certifications: [],
    newSkill: '',
    newCert: ''
  });
  const { userProfile, careerPath, updateProfile, updateCareerPath } = useProfile();

  const roles = [
    'Junior DevOps Engineer',
    'DevOps Engineer',
    'Senior DevOps Engineer',
    'DevOps Architect',
    'Site Reliability Engineer',
    'Cloud Engineer',
    'Platform Engineer',
    'Infrastructure Engineer'
  ];

  const skillSuggestions = [
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform', 'Ansible', 
    'Jenkins', 'GitLab CI', 'Prometheus', 'Grafana', 'ELK Stack', 'Linux', 
    'Python', 'Bash', 'Git', 'Helm', 'Istio', 'ArgoCD'
  ];

  const generateCareerPath = () => {
    const profile = {
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    updateProfile(profile);

    // Generate skill gap analysis
    const roleSkillMap = {
      'Junior DevOps Engineer': ['Docker', 'Git', 'Linux', 'AWS', 'Jenkins'],
      'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Prometheus'],
      'Senior DevOps Engineer': ['Kubernetes', 'AWS', 'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'Python'],
      'DevOps Architect': ['AWS', 'Terraform', 'Kubernetes', 'Microservices', 'Security', 'Monitoring'],
      'Site Reliability Engineer': ['Kubernetes', 'Prometheus', 'Grafana', 'Python', 'Monitoring', 'Incident Response'],
      'Cloud Engineer': ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation', 'Networking']
    };

    const targetSkills = roleSkillMap[formData.targetRole] || [];
    const currentSkills = formData.skills;
    const skillGaps = targetSkills.filter(skill => !currentSkills.includes(skill));
    const matchingSkills = targetSkills.filter(skill => currentSkills.includes(skill));

    const roadmap = {
      immediate: skillGaps.slice(0, 2),
      shortTerm: skillGaps.slice(2, 4),
      longTerm: skillGaps.slice(4)
    };

    const certificationMap = {
      'AWS': ['AWS Solutions Architect Associate', 'AWS DevOps Engineer Professional'],
      'Azure': ['Azure Fundamentals', 'Azure DevOps Engineer Expert'],
      'Kubernetes': ['Certified Kubernetes Administrator (CKA)', 'Certified Kubernetes Application Developer (CKAD)'],
      'Terraform': ['HashiCorp Certified: Terraform Associate']
    };

    const recommendedCerts = [];
    skillGaps.forEach(skill => {
      if (certificationMap[skill]) {
        recommendedCerts.push(...certificationMap[skill]);
      }
    });

    const path = {
      profile,
      skillGaps,
      matchingSkills,
      roadmap,
      recommendedCertifications: [...new Set(recommendedCerts)].slice(0, 4),
      timeline: skillGaps.length > 4 ? '12-18 months' : '6-12 months',
      completionPercentage: Math.round((matchingSkills.length / targetSkills.length) * 100)
    };

    updateCareerPath(path);
    setStep(2);
  };

  const addSkill = () => {
    if (formData.newSkill && !formData.skills.includes(formData.newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill],
        newSkill: ''
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addCertification = () => {
    if (formData.newCert && !formData.certifications.includes(formData.newCert)) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, prev.newCert],
        newCert: ''
      }));
    }
  };

  const removeCertification = (certToRemove) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert !== certToRemove)
    }));
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        startIcon={<Timeline />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#E91E63',
          '&:hover': { backgroundColor: '#C2185B' },
          textTransform: 'none',
          py: 1.5
        }}
      >
        Career Pathing
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Timeline color="primary" />
          Personalized Career Pathing
        </DialogTitle>
        
        <DialogContent>
          <Stepper activeStep={step} sx={{ mb: 3 }}>
            <Step>
              <StepLabel>Profile Setup</StepLabel>
            </Step>
            <Step>
              <StepLabel>Skills & Experience</StepLabel>
            </Step>
            <Step>
              <StepLabel>Career Roadmap</StepLabel>
            </Step>
          </Stepper>

          {step === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Tell us about your career goals</Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Current Role</InputLabel>
                    <Select
                      value={formData.currentRole}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                      label="Current Role"
                    >
                      {roles.map(role => (
                        <MenuItem key={role} value={role}>{role}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Target Role</InputLabel>
                    <Select
                      value={formData.targetRole}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetRole: e.target.value }))}
                      label="Target Role"
                    >
                      {roles.map(role => (
                        <MenuItem key={role} value={role}>{role}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Years of Experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  onClick={() => setStep(1)}
                  disabled={!formData.currentRole || !formData.targetRole}
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}

          {step === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Your Skills & Certifications</Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Current Skills</Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    label="Add Skill"
                    value={formData.newSkill}
                    onChange={(e) => setFormData(prev => ({ ...prev, newSkill: e.target.value }))}
                    size="small"
                  />
                  <Button variant="outlined" onClick={addSkill}>Add</Button>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>Suggestions:</Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {skillSuggestions.filter(skill => !formData.skills.includes(skill)).slice(0, 8).map(skill => (
                      <Chip 
                        key={skill} 
                        label={skill} 
                        size="small" 
                        onClick={() => setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }))}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {formData.skills.map(skill => (
                    <Chip 
                      key={skill} 
                      label={skill} 
                      onDelete={() => removeSkill(skill)}
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Certifications</Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    label="Add Certification"
                    value={formData.newCert}
                    onChange={(e) => setFormData(prev => ({ ...prev, newCert: e.target.value }))}
                    size="small"
                  />
                  <Button variant="outlined" onClick={addCertification}>Add</Button>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {formData.certifications.map(cert => (
                    <Chip 
                      key={cert} 
                      label={cert} 
                      onDelete={() => removeCertification(cert)}
                      color="secondary"
                    />
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={() => setStep(0)}>Back</Button>
                <Button 
                  variant="contained" 
                  onClick={generateCareerPath}
                  disabled={formData.skills.length === 0}
                >
                  Generate Career Path
                </Button>
              </Box>
            </Box>
          )}

          {step === 2 && careerPath && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Your Personalized Career Roadmap</Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Person color="primary" />
                        Career Progression
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Current → Target</Typography>
                        <Typography variant="h6">
                          {formData.currentRole} → {formData.targetRole}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Progress to Target Role</Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={careerPath.completionPercentage} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {careerPath.completionPercentage}% Complete
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2">
                        <strong>Timeline:</strong> {careerPath.timeline}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <TrendingUp color="success" />
                        Skill Gap Analysis
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          ✅ Skills You Have ({careerPath.matchingSkills.length})
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {careerPath.matchingSkills.map(skill => (
                            <Chip key={skill} label={skill} size="small" color="success" />
                          ))}
                        </Box>
                      </Box>
                      
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          🎯 Skills to Learn ({careerPath.skillGaps.length})
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {careerPath.skillGaps.map(skill => (
                            <Chip key={skill} label={skill} size="small" color="warning" />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Work color="primary" />
                        Learning Roadmap
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          🚀 Immediate (0-3 months)
                        </Typography>
                        {careerPath.roadmap.immediate.map(skill => (
                          <Chip key={skill} label={skill} size="small" color="error" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))}
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          📈 Short-term (3-6 months)
                        </Typography>
                        {careerPath.roadmap.shortTerm.map(skill => (
                          <Chip key={skill} label={skill} size="small" color="warning" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))}
                      </Box>
                      
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          🎯 Long-term (6+ months)
                        </Typography>
                        {careerPath.roadmap.longTerm.map(skill => (
                          <Chip key={skill} label={skill} size="small" color="info" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <School color="secondary" />
                        Recommended Certifications
                      </Typography>
                      
                      {careerPath.recommendedCertifications.map(cert => (
                        <Box key={cert} sx={{ mb: 1, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {cert}
                          </Typography>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button onClick={() => setStep(0)}>Start Over</Button>
                <Button variant="contained" onClick={() => setOpen(false)}>
                  Save Career Path
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CareerPathingButton;