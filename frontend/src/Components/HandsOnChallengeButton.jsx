import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, TextField, Rating, Chip, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Code, PlayArrow, Refresh, CheckCircle } from '@mui/icons-material';

const HandsOnChallengeButton = () => {
  const [open, setOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userSolution, setUserSolution] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const challenges = {
    dockerfile: {
      title: "Write a Dockerfile",
      description: "Create a Dockerfile for a Node.js application",
      task: "Write a Dockerfile that:\n• Uses Node.js 18 as base image\n• Sets working directory to /app\n• Copies package.json and installs dependencies\n• Copies source code\n• Exposes port 3000\n• Runs the application with 'npm start'",
      template: "# Your Dockerfile here\nFROM \nWORKDIR \nCOPY \nRUN \nCOPY \nEXPOSE \nCMD ",
      checks: ['FROM node:18', 'WORKDIR /app', 'COPY package.json', 'RUN npm install', 'EXPOSE 3000', 'CMD']
    },
    kubernetes: {
      title: "Debug Kubernetes YAML",
      description: "Fix the broken Kubernetes deployment",
      task: "Debug this broken Kubernetes deployment YAML:\n\nThe deployment should:\n• Use nginx:1.20 image\n• Have 3 replicas\n• Expose port 80\n• Have proper labels and selectors",
      template: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx-wrong  # Fix this
    spec:
      containers:
      - name: nginx
        image: nginx:1.19  # Fix this
        ports:
        - containerPort: 8080  # Fix this`,
      checks: ['nginx:1.20', 'containerPort: 80', 'app: nginx', 'replicas: 3']
    },
    jenkins: {
      title: "Jenkins Pipeline",
      description: "Create a Jenkins pipeline for a sample app",
      task: "Write a Jenkins pipeline that:\n• Checks out code from Git\n• Runs tests with 'npm test'\n• Builds Docker image\n• Pushes to registry\n• Deploys to staging",
      template: `pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Add checkout step
            }
        }
        stage('Test') {
            steps {
                // Add test step
            }
        }
        stage('Build') {
            steps {
                // Add Docker build step
            }
        }
        stage('Deploy') {
            steps {
                // Add deployment step
            }
        }
    }
}`,
      checks: ['git', 'npm test', 'docker build', 'docker push', 'deploy']
    },
    terraform: {
      title: "Terraform Configuration",
      description: "Write Terraform for AWS EC2 instance",
      task: "Create Terraform configuration that:\n• Provisions an AWS EC2 instance\n• Uses t3.micro instance type\n• Has a security group allowing SSH (port 22)\n• Tags the instance with Name = 'web-server'",
      template: `# Configure AWS provider
provider "aws" {
  region = "us-west-2"
}

# Create security group
resource "aws_security_group" "web_sg" {
  # Add security group configuration
}

# Create EC2 instance
resource "aws_instance" "web" {
  # Add instance configuration
}`,
      checks: ['aws_instance', 't3.micro', 'port = 22', 'Name = "web-server"', 'aws_security_group']
    }
  };

  const evaluateSolution = (challenge, solution) => {
    const solutionLower = solution.toLowerCase();
    let score = 0;
    let passedChecks = [];
    let failedChecks = [];

    challenge.checks.forEach(check => {
      if (solutionLower.includes(check.toLowerCase())) {
        score += 1;
        passedChecks.push(check);
      } else {
        failedChecks.push(check);
      }
    });

    const percentage = (score / challenge.checks.length) * 100;
    let rating = Math.round((percentage / 100) * 5);
    
    let feedback = {
      score: percentage,
      rating: Math.max(1, rating),
      passed: passedChecks,
      failed: failedChecks,
      suggestions: []
    };

    // Generate specific suggestions
    if (failedChecks.length > 0) {
      failedChecks.forEach(check => {
        if (check.includes('FROM')) feedback.suggestions.push('Add proper base image');
        if (check.includes('WORKDIR')) feedback.suggestions.push('Set working directory');
        if (check.includes('EXPOSE')) feedback.suggestions.push('Expose the correct port');
        if (check.includes('nginx:1.20')) feedback.suggestions.push('Update nginx version to 1.20');
        if (check.includes('containerPort: 80')) feedback.suggestions.push('Fix container port to 80');
        if (check.includes('git')) feedback.suggestions.push('Add Git checkout step');
        if (check.includes('npm test')) feedback.suggestions.push('Include test execution');
        if (check.includes('docker build')) feedback.suggestions.push('Add Docker build command');
      });
    }

    return feedback;
  };

  const startChallenge = () => {
    if (!selectedChallenge) return;
    const challenge = challenges[selectedChallenge];
    setCurrentChallenge(challenge);
    setUserSolution(challenge.template);
    setFeedback(null);
  };

  const submitSolution = () => {
    if (!userSolution.trim() || !currentChallenge) return;
    
    setIsEvaluating(true);
    setTimeout(() => {
      const evaluation = evaluateSolution(currentChallenge, userSolution);
      setFeedback(evaluation);
      setIsEvaluating(false);
    }, 2000);
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        startIcon={<Code />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#FF5722',
          '&:hover': { backgroundColor: '#E64A19' },
          textTransform: 'none',
          py: 1.5
        }}
      >
        Hands-on Challenges
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Code color="primary" />
          DevOps Hands-on Challenges
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Practice real DevOps tasks with auto-graded challenges
          </Typography>

          {!currentChallenge ? (
            <Box>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Challenge Type</InputLabel>
                <Select
                  value={selectedChallenge}
                  onChange={(e) => setSelectedChallenge(e.target.value)}
                  label="Select Challenge Type"
                >
                  {Object.entries(challenges).map(([key, challenge]) => (
                    <MenuItem key={key} value={key}>
                      {challenge.title} - {challenge.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ textAlign: 'center' }}>
                <Button 
                  variant="contained" 
                  onClick={startChallenge}
                  disabled={!selectedChallenge}
                  startIcon={<PlayArrow />}
                  size="large"
                >
                  Start Challenge
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                {currentChallenge.title}
              </Typography>
              
              <Box sx={{ 
                p: 2, 
                backgroundColor: '#f5f5f5', 
                borderRadius: 1, 
                mb: 3,
                border: '1px solid #e0e0e0'
              }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {currentChallenge.task}
                </Typography>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={15}
                label="Your Solution"
                value={userSolution}
                onChange={(e) => setUserSolution(e.target.value)}
                sx={{ 
                  mb: 2,
                  '& .MuiInputBase-input': {
                    fontFamily: 'monospace',
                    fontSize: '14px'
                  }
                }}
              />

              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Button
                  variant="contained"
                  onClick={submitSolution}
                  disabled={!userSolution.trim() || isEvaluating}
                  startIcon={<CheckCircle />}
                >
                  {isEvaluating ? 'Evaluating...' : 'Submit Solution'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setCurrentChallenge(null)}
                  startIcon={<Refresh />}
                >
                  New Challenge
                </Button>
              </Box>

              {feedback && (
                <Box sx={{ 
                  p: 2, 
                  backgroundColor: feedback.rating >= 4 ? '#e8f5e8' : feedback.rating >= 3 ? '#fff3e0' : '#ffebee', 
                  borderRadius: 1,
                  border: `1px solid ${feedback.rating >= 4 ? '#4caf50' : feedback.rating >= 3 ? '#ff9800' : '#f44336'}`
                }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    Challenge Results
                    <Rating value={feedback.rating} readOnly size="small" />
                    <Typography variant="body2">({feedback.score.toFixed(0)}%)</Typography>
                  </Typography>

                  {feedback.passed.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        ✅ Passed Checks:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {feedback.passed.map((check, i) => (
                          <Chip key={i} label={check} color="success" size="small" />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {feedback.failed.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        ❌ Missing Requirements:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {feedback.failed.map((check, i) => (
                          <Chip key={i} label={check} color="error" size="small" />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {feedback.suggestions.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        💡 Suggestions:
                      </Typography>
                      <ul>
                        {feedback.suggestions.map((suggestion, i) => (
                          <li key={i}>
                            <Typography variant="body2" sx={{ color: '#000000' }}>{suggestion}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </Box>
              )}
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

export default HandsOnChallengeButton;