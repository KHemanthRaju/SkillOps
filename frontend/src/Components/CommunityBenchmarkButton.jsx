import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Grid, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import { BarChart, TrendingUp, People, Assessment } from '@mui/icons-material';

const CommunityBenchmarkButton = () => {
  const [open, setOpen] = useState(false);
  const [benchmarkData, setBenchmarkData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateBenchmark = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const data = {
        userSkills: {
          'Kubernetes': 75,
          'Docker': 85,
          'AWS': 70,
          'Terraform': 45,
          'Jenkins': 80,
          'Prometheus': 60,
          'Ansible': 55,
          'Git': 90
        },
        peerComparison: {
          'Kubernetes': { userScore: 75, peerAverage: 65, percentile: 72, trend: 'ahead' },
          'Docker': { userScore: 85, peerAverage: 70, percentile: 78, trend: 'ahead' },
          'AWS': { userScore: 70, peerAverage: 68, percentile: 58, trend: 'ahead' },
          'Terraform': { userScore: 45, peerAverage: 62, percentile: 25, trend: 'behind' },
          'Jenkins': { userScore: 80, peerAverage: 72, percentile: 68, trend: 'ahead' },
          'Prometheus': { userScore: 60, peerAverage: 58, percentile: 52, trend: 'ahead' },
          'Ansible': { userScore: 55, peerAverage: 64, percentile: 35, trend: 'behind' },
          'Git': { userScore: 90, peerAverage: 75, percentile: 85, trend: 'ahead' }
        },
        insights: {
          strongestSkill: 'Git',
          weakestSkill: 'Terraform',
          overallPercentile: 62,
          totalPeers: 15420
        }
      };
      
      setBenchmarkData(data);
      setIsLoading(false);
    }, 2000);
  };

  const RadarChart = ({ skills, peerData }) => {
    const skillNames = Object.keys(skills);
    const center = 150;
    const radius = 120;
    const angleStep = (2 * Math.PI) / skillNames.length;

    const getPoint = (value, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (value / 100) * radius;
      return {
        x: center + distance * Math.cos(angle),
        y: center + distance * Math.sin(angle)
      };
    };

    const userPoints = skillNames.map((skill, index) => getPoint(skills[skill], index));
    const peerPoints = skillNames.map((skill, index) => getPoint(peerData[skill].peerAverage, index));

    const createPath = (points) => {
      return points.map((point, index) => 
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ') + ' Z';
    };

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Grid circles */}
          {[20, 40, 60, 80, 100].map(value => (
            <circle
              key={value}
              cx={center}
              cy={center}
              r={(value / 100) * radius}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          ))}
          
          {/* Grid lines */}
          {skillNames.map((_, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const endX = center + radius * Math.cos(angle);
            const endY = center + radius * Math.sin(angle);
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke="#e0e0e0"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Peer average area */}
          <path
            d={createPath(peerPoints)}
            fill="rgba(255, 152, 0, 0.2)"
            stroke="#ff9800"
            strokeWidth="2"
          />
          
          {/* User skills area */}
          <path
            d={createPath(userPoints)}
            fill="rgba(33, 150, 243, 0.3)"
            stroke="#2196f3"
            strokeWidth="3"
          />
          
          {/* Skill labels */}
          {skillNames.map((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const labelX = center + (radius + 20) * Math.cos(angle);
            const labelY = center + (radius + 20) * Math.sin(angle);
            return (
              <text
                key={skill}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="#333"
              >
                {skill}
              </text>
            );
          })}
        </svg>
      </Box>
    );
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        startIcon={<BarChart />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#607D8B',
          '&:hover': { backgroundColor: '#546E7A' },
          textTransform: 'none',
          py: 1.5
        }}
      >
        Community Benchmark
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <People color="primary" />
          Community Skills Benchmarking
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Compare your DevOps skills against anonymized community data
          </Typography>

          {!benchmarkData ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Ready to benchmark your skills?
              </Typography>
              <Button 
                variant="contained" 
                onClick={generateBenchmark}
                disabled={isLoading}
                startIcon={<Assessment />}
                size="large"
              >
                {isLoading ? 'Analyzing Skills...' : 'Generate Benchmark'}
              </Button>
              {isLoading && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Comparing against {Math.floor(Math.random() * 5000) + 10000} DevOps professionals...
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Grid container spacing={3}>
              {/* Radar Chart */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                      Skills Radar Comparison
                    </Typography>
                    
                    <RadarChart 
                      skills={benchmarkData.userSkills} 
                      peerData={benchmarkData.peerComparison}
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 16, height: 16, backgroundColor: 'rgba(33, 150, 243, 0.3)', border: '2px solid #2196f3' }} />
                        <Typography variant="body2">Your Skills</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 16, height: 16, backgroundColor: 'rgba(255, 152, 0, 0.2)', border: '2px solid #ff9800' }} />
                        <Typography variant="body2">Peer Average</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Overall Stats */}
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUp color="primary" />
                      Overall Performance
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        You're ahead of <strong>{benchmarkData.insights.overallPercentile}%</strong> of peers
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={benchmarkData.insights.overallPercentile} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Strongest Skill</Typography>
                        <Typography variant="h6" color="success.main">
                          {benchmarkData.insights.strongestSkill}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Focus Area</Typography>
                        <Typography variant="h6" color="warning.main">
                          {benchmarkData.insights.weakestSkill}
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      Compared against {benchmarkData.insights.totalPeers.toLocaleString()} professionals
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Detailed Breakdown */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Detailed Skills Breakdown
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {Object.entries(benchmarkData.peerComparison).map(([skill, data]) => (
                        <Grid item xs={12} sm={6} md={3} key={skill}>
                          <Box sx={{ 
                            p: 2, 
                            border: '1px solid #e0e0e0', 
                            borderRadius: 1,
                            backgroundColor: data.trend === 'ahead' ? '#e8f5e8' : '#fff3e0'
                          }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                {skill}
                              </Typography>
                              <Chip 
                                label={data.trend === 'ahead' ? `+${data.percentile}%` : `${data.percentile}%`}
                                size="small"
                                color={data.trend === 'ahead' ? 'success' : 'warning'}
                              />
                            </Box>
                            
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              You: <strong>{data.userScore}</strong> | Peers: <strong>{data.peerAverage}</strong>
                            </Typography>
                            
                            <LinearProgress 
                              variant="determinate" 
                              value={data.percentile} 
                              sx={{ 
                                height: 6, 
                                borderRadius: 3,
                                backgroundColor: '#f0f0f0',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: data.trend === 'ahead' ? '#4caf50' : '#ff9800'
                                }
                              }}
                            />
                            
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                              {data.trend === 'ahead' 
                                ? `Ahead of ${data.percentile}% of peers`
                                : `Behind ${100 - data.percentile}% of peers`
                              }
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          {benchmarkData && (
            <Button variant="contained" onClick={generateBenchmark}>
              Refresh Benchmark
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommunityBenchmarkButton;