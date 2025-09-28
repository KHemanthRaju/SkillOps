import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Grid, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import { Groups, Psychology, TrendingUp, Code, Dashboard } from '@mui/icons-material';
import { useAgents } from '../utilities/AgentContext';

const AgentCollaborationButton = () => {
  const [open, setOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { agentInsights, updateAgentInsight } = useAgents();

  const agents = [
    {
      id: 'careerCoach',
      name: 'Career Coach Agent',
      icon: <Psychology />,
      color: '#2196F3',
      description: 'Long-term roadmap planning'
    },
    {
      id: 'jobMarket',
      name: 'Job Market Agent',
      icon: <TrendingUp />,
      color: '#4CAF50',
      description: 'Market trends analysis'
    },
    {
      id: 'technicalMentor',
      name: 'Technical Mentor Agent',
      icon: <Code />,
      color: '#FF9800',
      description: 'Hands-on skill development'
    }
  ];

  const generateAgentInsights = () => {
    setIsAnalyzing(true);
    
    // Simulate agent analysis
    setTimeout(() => {
      // Career Coach insights
      updateAgentInsight('careerCoach', {
        roadmap: [
          { phase: 'Foundation (0-6 months)', skills: ['Linux basics', 'Git', 'Docker'], priority: 'High' },
          { phase: 'Intermediate (6-12 months)', skills: ['Kubernetes', 'CI/CD', 'AWS'], priority: 'High' },
          { phase: 'Advanced (12+ months)', skills: ['Terraform', 'Monitoring', 'Security'], priority: 'Medium' }
        ],
        nextSteps: 'Focus on containerization skills - Docker certification recommended',
        timeline: '18 months to senior level'
      });

      // Job Market insights
      updateAgentInsight('jobMarket', {
        trends: [
          { skill: 'Kubernetes', demand: 95, growth: '+25%' },
          { skill: 'AWS', demand: 90, growth: '+20%' },
          { skill: 'Docker', demand: 85, growth: '+15%' },
          { skill: 'Terraform', demand: 80, growth: '+30%' }
        ],
        salaryRange: '$95K - $140K',
        hotJobs: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer'],
        marketInsight: 'Container orchestration skills are in highest demand'
      });

      // Technical Mentor insights
      updateAgentInsight('technicalMentor', {
        currentLevel: 'Intermediate',
        strengths: ['CI/CD understanding', 'Cloud basics'],
        gaps: ['Container orchestration', 'Infrastructure as Code'],
        recommendedTasks: [
          'Build a multi-stage Docker application',
          'Deploy app to Kubernetes cluster',
          'Create Terraform modules for AWS'
        ],
        practiceScore: 75
      });

      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        startIcon={<Groups />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#673AB7',
          '&:hover': { backgroundColor: '#5E35B1' },
          textTransform: 'none',
          py: 1.5
        }}
      >
        Agent Collaboration
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Dashboard color="primary" />
          AI Agent Collaboration Dashboard
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Multiple AI agents working together to provide comprehensive career guidance
          </Typography>

          {!agentInsights.careerCoach ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Ready to analyze your DevOps career path?
              </Typography>
              <Button 
                variant="contained" 
                onClick={generateAgentInsights}
                disabled={isAnalyzing}
                startIcon={<Groups />}
                size="large"
              >
                {isAnalyzing ? 'Agents Analyzing...' : 'Start Agent Analysis'}
              </Button>
              {isAnalyzing && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    AI agents are collaborating to analyze your profile...
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Grid container spacing={3}>
              {/* Career Coach Agent */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', borderLeft: `4px solid ${agents[0].color}` }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {agents[0].icon}
                      <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                        Career Coach
                      </Typography>
                    </Box>
                    
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      📅 Roadmap Timeline: {agentInsights.careerCoach.timeline}
                    </Typography>
                    
                    {agentInsights.careerCoach.roadmap.map((phase, i) => (
                      <Box key={i} sx={{ mb: 2, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {phase.phase}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                          {phase.skills.map((skill, j) => (
                            <Chip key={j} label={skill} size="small" color={phase.priority === 'High' ? 'primary' : 'default'} />
                          ))}
                        </Box>
                      </Box>
                    ))}
                    
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: agents[0].color }}>
                      🎯 Next Step: {agentInsights.careerCoach.nextSteps}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Job Market Agent */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', borderLeft: `4px solid ${agents[1].color}` }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {agents[1].icon}
                      <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                        Job Market
                      </Typography>
                    </Box>
                    
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      💰 Salary Range: {agentInsights.jobMarket.salaryRange}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      📈 Skill Demand:
                    </Typography>
                    {agentInsights.jobMarket.trends.map((trend, i) => (
                      <Box key={i} sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">{trend.skill}</Typography>
                          <Chip label={trend.growth} size="small" color="success" />
                        </Box>
                        <LinearProgress variant="determinate" value={trend.demand} sx={{ mt: 0.5 }} />
                      </Box>
                    ))}
                    
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                      🔥 Hot Jobs:
                    </Typography>
                    {agentInsights.jobMarket.hotJobs.map((job, i) => (
                      <Chip key={i} label={job} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                    
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: agents[1].color, mt: 2 }}>
                      💡 {agentInsights.jobMarket.marketInsight}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Technical Mentor Agent */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', borderLeft: `4px solid ${agents[2].color}` }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {agents[2].icon}
                      <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                        Technical Mentor
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        Current Level: {agentInsights.technicalMentor.currentLevel}
                      </Typography>
                      <Chip label={`${agentInsights.technicalMentor.practiceScore}%`} color="primary" />
                    </Box>
                    
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      ✅ Strengths:
                    </Typography>
                    {agentInsights.technicalMentor.strengths.map((strength, i) => (
                      <Chip key={i} label={strength} size="small" color="success" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                    
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                      🎯 Skill Gaps:
                    </Typography>
                    {agentInsights.technicalMentor.gaps.map((gap, i) => (
                      <Chip key={i} label={gap} size="small" color="warning" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                    
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                      🛠️ Recommended Tasks:
                    </Typography>
                    {agentInsights.technicalMentor.recommendedTasks.map((task, i) => (
                      <Typography key={i} variant="body2" sx={{ mb: 0.5, fontSize: '0.85rem' }}>
                        • {task}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              {/* Unified Insights */}
              <Grid item xs={12}>
                <Card sx={{ backgroundColor: '#f8f9fa', border: '2px solid #e9ecef' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Dashboard color="primary" />
                      Unified Agent Recommendations
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          🎯 Priority Focus Areas:
                        </Typography>
                        <Typography variant="body2">
                          Based on market demand and your skill gaps, prioritize <strong>Kubernetes</strong> and <strong>Terraform</strong> learning. 
                          These skills show 25-30% growth and align with your career progression timeline.
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          📈 Expected Outcome:
                        </Typography>
                        <Typography variant="body2">
                          Following this roadmap, you can expect a <strong>$20K-30K salary increase</strong> within 18 months 
                          and qualify for senior DevOps positions at top-tier companies.
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          {agentInsights.careerCoach && (
            <Button variant="contained" onClick={generateAgentInsights}>
              Refresh Analysis
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AgentCollaborationButton;