import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, LinearProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';

const jobCategories = {
  engineering: 'Engineering Roles',
  architecture: 'Architecture & Design',
  security: 'Security & Compliance',
  management: 'Management & Leadership'
};

const jobTrendsData = {
  2020: {
    rolesByCategory: {
      engineering: [
        { title: 'DevOps Engineer', demand: 85, salary: '$95k', growth: 'up' },
        { title: 'Build Engineer', demand: 60, salary: '$85k', growth: 'flat' },
        { title: 'Release Engineer', demand: 55, salary: '$90k', growth: 'up' }
      ],
      architecture: [
        { title: 'Site Reliability Engineer', demand: 70, salary: '$110k', growth: 'up' },
        { title: 'Cloud Engineer', demand: 75, salary: '$100k', growth: 'up' },
        { title: 'Infrastructure Engineer', demand: 65, salary: '$95k', growth: 'up' }
      ],
      security: [
        { title: 'Security Engineer', demand: 50, salary: '$105k', growth: 'up' },
        { title: 'Compliance Engineer', demand: 40, salary: '$95k', growth: 'flat' }
      ],
      management: [
        { title: 'DevOps Manager', demand: 45, salary: '$130k', growth: 'up' },
        { title: 'Engineering Manager', demand: 40, salary: '$125k', growth: 'up' }
      ]
    },
    hotSkills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform', 'Git'],
    emergingTech: ['GitOps', 'Service Mesh', 'Observability'],
    avgSalary: '$97k',
    jobGrowth: '+15%'
  },
  2021: {
    topRoles: [
      { title: 'DevOps Engineer', demand: 90, salary: '$105k', growth: 'up' },
      { title: 'Site Reliability Engineer', demand: 80, salary: '$120k', growth: 'up' },
      { title: 'Cloud Architect', demand: 85, salary: '$130k', growth: 'up' },
      { title: 'Platform Engineer', demand: 65, salary: '$115k', growth: 'up' }
    ],
    hotSkills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Prometheus', 'Grafana'],
    emergingTech: ['GitOps', 'Chaos Engineering', 'FinOps'],
    avgSalary: '$117k',
    jobGrowth: '+22%'
  },
  2022: {
    topRoles: [
      { title: 'Platform Engineer', demand: 95, salary: '$125k', growth: 'up' },
      { title: 'Site Reliability Engineer', demand: 90, salary: '$135k', growth: 'up' },
      { title: 'DevOps Engineer', demand: 85, salary: '$115k', growth: 'up' },
      { title: 'Cloud Security Engineer', demand: 80, salary: '$140k', growth: 'up' }
    ],
    hotSkills: ['Kubernetes', 'Terraform', 'Python', 'Go', 'Helm', 'ArgoCD'],
    emergingTech: ['Platform Engineering', 'Developer Experience', 'WASM'],
    avgSalary: '$128k',
    jobGrowth: '+18%'
  },
  2023: {
    topRoles: [
      { title: 'Platform Engineer', demand: 100, salary: '$140k', growth: 'up' },
      { title: 'DevOps Engineer', demand: 90, salary: '$125k', growth: 'up' },
      { title: 'Site Reliability Engineer', demand: 95, salary: '$145k', growth: 'up' },
      { title: 'MLOps Engineer', demand: 75, salary: '$135k', growth: 'up' }
    ],
    hotSkills: ['Kubernetes', 'Terraform', 'Python', 'Go', 'GitOps', 'Observability'],
    emergingTech: ['AI/ML Ops', 'Developer Portals', 'Green Computing'],
    avgSalary: '$136k',
    jobGrowth: '+25%'
  },
  2024: {
    rolesByCategory: {
      engineering: [
        { title: 'Platform Engineer', demand: 100, salary: '$150k', growth: 'up' },
        { title: 'DevOps Engineer', demand: 85, salary: '$135k', growth: 'up' },
        { title: 'MLOps Engineer', demand: 90, salary: '$145k', growth: 'up' }
      ],
      architecture: [
        { title: 'Site Reliability Engineer', demand: 90, salary: '$150k', growth: 'up' },
        { title: 'Cloud Architect', demand: 85, salary: '$160k', growth: 'up' },
        { title: 'Solutions Architect', demand: 80, salary: '$155k', growth: 'up' }
      ],
      security: [
        { title: 'DevSecOps Engineer', demand: 85, salary: '$145k', growth: 'up' },
        { title: 'Cloud Security Engineer', demand: 80, salary: '$140k', growth: 'up' },
        { title: 'Security Architect', demand: 75, salary: '$165k', growth: 'up' }
      ],
      management: [
        { title: 'Platform Engineering Manager', demand: 70, salary: '$180k', growth: 'up' },
        { title: 'DevOps Director', demand: 60, salary: '$200k', growth: 'up' },
        { title: 'VP of Engineering', demand: 50, salary: '$250k', growth: 'up' }
      ]
    },
    hotSkills: ['Kubernetes', 'Python', 'AI/ML', 'Terraform', 'GitOps', 'Security'],
    emergingTech: ['AI-Powered DevOps', 'Quantum Computing', 'Edge Computing'],
    avgSalary: '$150k',
    jobGrowth: '+30%'
  }
};

const getTrendIcon = (trend) => {
  switch (trend) {
    case 'up': return <TrendingUp sx={{ color: '#4caf50', fontSize: '1rem' }} />;
    case 'down': return <TrendingDown sx={{ color: '#f44336', fontSize: '1rem' }} />;
    default: return <TrendingFlat sx={{ color: '#ff9800', fontSize: '1rem' }} />;
  }
};

export default function DevOpsJobTrends() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const currentData = jobTrendsData[selectedYear];
  
  const getFilteredRoles = () => {
    if (selectedCategory === 'all') {
      return currentData.rolesByCategory ? Object.values(currentData.rolesByCategory).flat() : currentData.topRoles || [];
    }
    return currentData.rolesByCategory?.[selectedCategory] || [];
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
          DevOps Job Market Trends
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {Object.keys(jobTrendsData).map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Market Overview */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Market Overview - {selectedYear}</Typography>
          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">{currentData.avgSalary}</Typography>
              <Typography variant="body2" color="text.secondary">Avg Salary</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">{currentData.jobGrowth}</Typography>
              <Typography variant="body2" color="text.secondary">Job Growth</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Job Category Filter */}
      {currentData.rolesByCategory && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <FormControl sx={{ minWidth: 200, mb: 2 }}>
              <InputLabel>Job Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Job Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {Object.entries(jobCategories).map(([key, name]) => (
                  <MenuItem key={key} value={key}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {selectedCategory === 'all' ? 'All DevOps Roles' : jobCategories[selectedCategory]}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
              {getFilteredRoles().map((role, index) => (
                <Box key={index} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {role.title}
                    </Typography>
                    {getTrendIcon(role.growth)}
                  </Box>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {role.salary}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={role.demand} 
                    sx={{ height: 6, borderRadius: 3, mb: 0.5 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Demand: {role.demand}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
      
      {/* Legacy Top Roles for older years */}
      {!currentData.rolesByCategory && currentData.topRoles && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Top DevOps Roles</Typography>
            {currentData.topRoles.map((role, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {role.title}
                    </Typography>
                    {getTrendIcon(role.growth)}
                  </Box>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                    {role.salary}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={role.demand} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  Demand: {role.demand}%
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Hot Skills */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Most In-Demand Skills</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {currentData.hotSkills.map((skill, index) => (
              <Chip 
                key={index} 
                label={skill} 
                color="primary" 
                variant="outlined"
                sx={{ fontWeight: 'bold' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Emerging Technologies */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Emerging Technologies</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {currentData.emergingTech.map((tech, index) => (
              <Chip 
                key={index} 
                label={tech} 
                color="secondary" 
                sx={{ fontWeight: 'bold' }}
              />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            💡 These technologies are gaining traction and may become mainstream in the coming years.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}