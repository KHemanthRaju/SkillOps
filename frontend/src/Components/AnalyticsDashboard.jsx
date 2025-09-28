import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { TrendingUp, People, Timeline, Psychology } from '@mui/icons-material';
import analyticsService from '../services/analyticsService';

const MetricCard = ({ title, value, subtitle, icon, color = 'primary' }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>{title}</Typography>
      </Box>
      <Typography variant="h3" color={color}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
    </CardContent>
  </Card>
);

const HeatmapVisualization = ({ data }) => {
  const maxIntensity = Math.max(...data.map(d => d.intensity), 1);
  
  return (
    <Box sx={{ position: 'relative', width: '100%', height: 300, bgcolor: '#f5f5f5', borderRadius: 1 }}>
      <Typography variant="caption" sx={{ position: 'absolute', top: 8, left: 8 }}>
        Click Heatmap (Last 500 interactions)
      </Typography>
      {data.slice(-100).map((point, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: `${(point.x / point.viewport.width) * 100}%`,
            top: `${(point.y / point.viewport.height) * 100}%`,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: `rgba(255, 0, 0, ${point.intensity / maxIntensity})`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </Box>
  );
};

const CohortTable = ({ cohorts }) => (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>Cohort</TableCell>
        <TableCell>Size</TableCell>
        <TableCell>Week 0</TableCell>
        <TableCell>Week 1</TableCell>
        <TableCell>Week 2</TableCell>
        <TableCell>Week 3</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {cohorts.slice(-5).map((cohort, index) => (
        <TableRow key={index}>
          <TableCell>{cohort.cohort}</TableCell>
          <TableCell>{cohort.size}</TableCell>
          <TableCell>100%</TableCell>
          <TableCell>{cohort.week1 || 0}%</TableCell>
          <TableCell>{cohort.week2 || 0}%</TableCell>
          <TableCell>{cohort.week3 || 0}%</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    const updateData = () => {
      setMetrics(analyticsService.getMetrics());
      setPredictions(analyticsService.predictUserBehavior());
      setHeatmapData(analyticsService.getHeatmapData());
      setCohorts(analyticsService.getCohortAnalysis());
    };

    updateData();
    const interval = setInterval(updateData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return <Typography>Loading analytics...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        📊 Analytics Dashboard
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Events"
            value={metrics.totalEvents}
            subtitle="All time interactions"
            icon={<TrendingUp color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Sessions"
            value={metrics.sessionsLast24h}
            subtitle="Last 24 hours"
            icon={<People color="success" />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg Session"
            value={`${metrics.avgSessionDuration}s`}
            subtitle="Duration in seconds"
            icon={<Timeline color="warning" />}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Engagement"
            value={`${predictions?.engagementScore || 0}%`}
            subtitle="User engagement score"
            icon={<Psychology color="secondary" />}
            color="secondary.main"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Feature Usage */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Feature Usage</Typography>
              {metrics.featureUsage.map((feature, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{feature.name}</Typography>
                    <Typography variant="body2">{feature.count}</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(feature.count / Math.max(...metrics.featureUsage.map(f => f.count), 1)) * 100}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Top Events */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Top Events</Typography>
              {metrics.topEvents.slice(0, 5).map((event, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{event.name}</Typography>
                  <Chip label={event.count} size="small" color="primary" />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* ML Predictions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>🤖 AI Predictions</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Likely Next Action:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {predictions?.likelyNextAction || 'chat_message'}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Churn Risk:</Typography>
                <Chip 
                  label={predictions?.churnRisk || 'low'} 
                  color={predictions?.churnRisk === 'high' ? 'error' : predictions?.churnRisk === 'medium' ? 'warning' : 'success'}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Recommendations:</Typography>
              {predictions?.recommendations?.map((rec, index) => (
                <Typography key={index} variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                  • {rec}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Heatmap */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>🔥 Interaction Heatmap</Typography>
              <HeatmapVisualization data={heatmapData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Cohort Analysis */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>👥 Cohort Analysis (User Retention)</Typography>
              <CohortTable cohorts={cohorts} />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Shows percentage of users returning each week after their first visit
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}