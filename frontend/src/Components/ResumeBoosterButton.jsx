import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Grid, Card, CardContent, Chip, LinearProgress, Tabs, Tab } from '@mui/material';
import { Description, CloudUpload, GitHub, Build, Warning, CheckCircle } from '@mui/icons-material';

const ResumeBoosterButton = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsAnalyzing(true);
      
      // Simulate resume analysis
      setTimeout(() => {
        const analysis = {
          overallScore: 72,
          weakAreas: [
            { area: 'Cloud Certifications', severity: 'High', description: 'Missing AWS/Azure certifications' },
            { area: 'Container Orchestration', severity: 'Medium', description: 'Limited Kubernetes experience mentioned' },
            { area: 'Infrastructure as Code', severity: 'Medium', description: 'No Terraform/CloudFormation projects shown' },
            { area: 'Monitoring & Observability', severity: 'Low', description: 'Basic monitoring tools mentioned' }
          ],
          strengths: [
            'Strong CI/CD pipeline experience',
            'Good scripting and automation skills',
            'Solid Linux administration background'
          ],
          suggestedProjects: [
            {
              title: 'Multi-Cloud Kubernetes Deployment',
              description: 'Deploy a microservices app across AWS EKS and Azure AKS',
              skills: ['Kubernetes', 'AWS', 'Azure', 'Helm'],
              timeline: '2-3 weeks'
            },
            {
              title: 'Infrastructure as Code Portfolio',
              description: 'Create Terraform modules for common AWS resources',
              skills: ['Terraform', 'AWS', 'GitOps'],
              timeline: '1-2 weeks'
            },
            {
              title: 'Complete Observability Stack',
              description: 'Set up Prometheus, Grafana, and ELK stack monitoring',
              skills: ['Prometheus', 'Grafana', 'ELK', 'Docker'],
              timeline: '2-3 weeks'
            }
          ],
          recommendedCerts: [
            { name: 'AWS Solutions Architect Associate', priority: 'High', timeToComplete: '2-3 months' },
            { name: 'Certified Kubernetes Administrator (CKA)', priority: 'High', timeToComplete: '1-2 months' },
            { name: 'HashiCorp Certified: Terraform Associate', priority: 'Medium', timeToComplete: '1 month' }
          ]
        };
        
        setResumeAnalysis(analysis);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  const githubTemplate = `# DevOps Portfolio

## 🚀 Featured Projects

### 1. Multi-Cloud Kubernetes Deployment
**Tech Stack:** Kubernetes, AWS EKS, Azure AKS, Helm, ArgoCD
- Deployed microservices application across multiple cloud providers
- Implemented GitOps workflow with ArgoCD
- Set up cross-cluster service mesh with Istio
- [Live Demo](https://your-app.com) | [Source Code](https://github.com/username/k8s-multicloud)

### 2. Infrastructure as Code with Terraform
**Tech Stack:** Terraform, AWS, GitHub Actions, Terragrunt
- Created reusable Terraform modules for AWS infrastructure
- Implemented automated testing with Terratest
- Set up CI/CD pipeline for infrastructure deployment
- [Source Code](https://github.com/username/terraform-aws-modules)

### 3. Complete Observability Stack
**Tech Stack:** Prometheus, Grafana, ELK Stack, Docker, Kubernetes
- Built comprehensive monitoring solution for microservices
- Created custom Grafana dashboards and Prometheus alerts
- Implemented centralized logging with ELK stack
- [Source Code](https://github.com/username/observability-stack)

### 4. CI/CD Pipeline Automation
**Tech Stack:** Jenkins, GitLab CI, Docker, SonarQube, Nexus
- Designed and implemented enterprise CI/CD pipelines
- Integrated security scanning and code quality checks
- Automated deployment to multiple environments
- [Source Code](https://github.com/username/cicd-pipelines)

## 🛠️ Technical Skills

### Cloud Platforms
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=flat&logo=microsoft-azure&logoColor=white)
![GCP](https://img.shields.io/badge/GCP-4285F4?style=flat&logo=google-cloud&logoColor=white)

### Container & Orchestration
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)
![Helm](https://img.shields.io/badge/Helm-0F1689?style=flat&logo=helm&logoColor=white)

### Infrastructure as Code
![Terraform](https://img.shields.io/badge/Terraform-623CE4?style=flat&logo=terraform&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=flat&logo=ansible&logoColor=white)
![CloudFormation](https://img.shields.io/badge/CloudFormation-FF9900?style=flat&logo=amazon-aws&logoColor=white)

### CI/CD & Automation
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat&logo=jenkins&logoColor=white)
![GitLab](https://img.shields.io/badge/GitLab-FCA326?style=flat&logo=gitlab&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

### Monitoring & Observability
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat&logo=grafana&logoColor=white)
![ELK](https://img.shields.io/badge/ELK-005571?style=flat&logo=elastic&logoColor=white)

## 📜 Certifications
- 🏆 AWS Solutions Architect Associate
- 🏆 Certified Kubernetes Administrator (CKA)
- 🏆 HashiCorp Certified: Terraform Associate

## 📊 GitHub Stats
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=yourusername&layout=compact&theme=radical)

## 📫 Connect With Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourprofile)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=flat&logo=twitter&logoColor=white)](https://twitter.com/yourhandle)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:your.email@example.com)

---
⭐ **"Automating the future, one pipeline at a time"** ⭐`;

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        startIcon={<Description />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#795548',
          '&:hover': { backgroundColor: '#6D4C41' },
          textTransform: 'none',
          py: 1.5
        }}
      >
        Resume Booster
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Description color="primary" />
          Resume & Portfolio Booster
        </DialogTitle>
        
        <DialogContent>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
            <Tab label="Resume Analysis" />
            <Tab label="Project Suggestions" />
            <Tab label="GitHub Template" />
          </Tabs>

          {tabValue === 0 && (
            <Box>
              {!resumeAnalysis ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Upload your resume for AI-powered analysis
                  </Typography>
                  
                  <input
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    id="resume-upload"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="resume-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUpload />}
                      size="large"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? 'Analyzing Resume...' : 'Upload Resume'}
                    </Button>
                  </label>
                  
                  {isAnalyzing && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        AI is analyzing your resume for DevOps opportunities...
                      </Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Warning color="warning" />
                          Resume Analysis
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ mb: 1 }}>Overall Score</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={resumeAnalysis.overallScore} 
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {resumeAnalysis.overallScore}/100
                          </Typography>
                        </Box>

                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          ⚠️ Areas for Improvement:
                        </Typography>
                        {resumeAnalysis.weakAreas.map((area, i) => (
                          <Box key={i} sx={{ mb: 1, p: 1, backgroundColor: '#fff3e0', borderRadius: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {area.area}
                              </Typography>
                              <Chip 
                                label={area.severity} 
                                size="small" 
                                color={area.severity === 'High' ? 'error' : area.severity === 'Medium' ? 'warning' : 'info'}
                              />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {area.description}
                            </Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircle color="success" />
                          Strengths & Recommendations
                        </Typography>
                        
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          ✅ Current Strengths:
                        </Typography>
                        {resumeAnalysis.strengths.map((strength, i) => (
                          <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                            • {strength}
                          </Typography>
                        ))}

                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                          🎯 Recommended Certifications:
                        </Typography>
                        {resumeAnalysis.recommendedCerts.map((cert, i) => (
                          <Box key={i} sx={{ mb: 1, p: 1, backgroundColor: '#e8f5e8', borderRadius: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {cert.name}
                              </Typography>
                              <Chip label={cert.priority} size="small" color={cert.priority === 'High' ? 'error' : 'warning'} />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              Timeline: {cert.timeToComplete}
                            </Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </Box>
          )}

          {tabValue === 1 && resumeAnalysis && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Suggested Projects to Fill Skill Gaps
              </Typography>
              
              <Grid container spacing={2}>
                {resumeAnalysis.suggestedProjects.map((project, i) => (
                  <Grid item xs={12} md={4} key={i}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                          {project.title}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {project.description}
                        </Typography>
                        
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          Skills Gained:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                          {project.skills.map((skill, j) => (
                            <Chip key={j} label={skill} size="small" color="primary" />
                          ))}
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary">
                          ⏱️ Timeline: {project.timeline}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <GitHub />
                DevOps Portfolio Template
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Copy this template to create an impressive GitHub portfolio that showcases your DevOps skills
              </Typography>
              
              <Box sx={{ 
                p: 2, 
                backgroundColor: '#f5f5f5', 
                borderRadius: 1, 
                border: '1px solid #e0e0e0',
                maxHeight: '500px',
                overflow: 'auto'
              }}>
                <pre style={{ 
                  margin: 0, 
                  fontFamily: 'monospace', 
                  fontSize: '12px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {githubTemplate}
                </pre>
              </Box>
              
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button 
                  variant="contained" 
                  onClick={() => navigator.clipboard.writeText(githubTemplate)}
                  startIcon={<GitHub />}
                >
                  Copy Template
                </Button>
                <Button 
                  variant="outlined"
                  onClick={() => window.open('https://github.com/new', '_blank')}
                >
                  Create New Repo
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

export default ResumeBoosterButton;