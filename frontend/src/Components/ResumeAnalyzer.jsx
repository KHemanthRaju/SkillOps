import React, { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Typography, 
  Box, 
  TextField, 
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { Assessment, Upload, AutoFixHigh } from '@mui/icons-material';
import GeminiService from '../services/geminiService';

const ResumeAnalyzer = () => {
  const [open, setOpen] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [improvements, setImprovements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please enter your resume text');
      return;
    }

    if (resumeText.length > 10000) {
      setError('Resume text is too long. Please limit to 10,000 characters.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await GeminiService.analyzeResume(resumeText);
      
      if (result.success) {
        setAnalysis(result.analysis);
        setTabValue(1);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Resume analysis error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImprove = async () => {
    if (!resumeText.trim()) {
      setError('Please enter your resume text');
      return;
    }

    if (resumeText.length > 10000) {
      setError('Resume text is too long. Please limit to 10,000 characters.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await GeminiService.generateResumeImprovements(resumeText);
      
      if (result.success) {
        setImprovements(result.improvements);
        setTabValue(2);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Resume improvement error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;
    
    if (file.size > 1024 * 1024) { // 1MB limit
      setError('File size too large. Please upload a file smaller than 1MB.');
      return;
    }
    
    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      setError('Please upload a .txt file only.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      if (text.length > 10000) {
        setError('File content is too long. Please limit to 10,000 characters.');
        return;
      }
      setResumeText(text);
      setError(null);
    };
    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
    };
    reader.readAsText(file);
  };

  const handleClose = () => {
    setOpen(false);
    setResumeText('');
    setAnalysis(null);
    setImprovements(null);
    setError(null);
    setTabValue(0);
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        startIcon={<Assessment />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#9C27B0',
          '&:hover': { backgroundColor: '#7B1FA2' },
          textTransform: 'none',
          py: 1.5
        }}
      >
        Resume Analyzer
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Assessment color="primary" />
          AI-Powered Resume Analyzer
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label="Upload Resume" />
              <Tab label="Analysis" disabled={!analysis} />
              <Tab label="Improvements" disabled={!improvements} />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload your resume or paste the text below for AI-powered analysis (max 10,000 characters)
              </Typography>
              
              {resumeText && (
                <Typography variant="caption" color={resumeText.length > 9000 ? 'error' : 'text.secondary'} sx={{ mb: 1, display: 'block' }}>
                  Characters: {resumeText.length}/10,000
                </Typography>
              )}

              <Box sx={{ mb: 2 }}>
                <input
                  accept=".txt"
                  style={{ display: 'none' }}
                  id="resume-upload"
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="resume-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<Upload />}
                    sx={{ mb: 2 }}
                  >
                    Upload Resume (.txt)
                  </Button>
                </label>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={12}
                label="Resume Text"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                sx={{ mb: 2 }}
              />

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleAnalyze}
                  disabled={loading || !resumeText.trim()}
                  startIcon={loading ? <CircularProgress size={20} /> : <Assessment />}
                  sx={{ flex: 1 }}
                >
                  {loading ? 'Analyzing...' : 'Analyze Resume'}
                </Button>
                
                <Button
                  variant="contained"
                  onClick={handleImprove}
                  disabled={loading || !resumeText.trim()}
                  startIcon={loading ? <CircularProgress size={20} /> : <AutoFixHigh />}
                  sx={{ flex: 1, backgroundColor: '#FF9800', '&:hover': { backgroundColor: '#F57C00' } }}
                >
                  {loading ? 'Improving...' : 'Get Improvements'}
                </Button>
              </Box>
            </Box>
          )}

          {tabValue === 1 && analysis && (
            <Paper sx={{ p: 3, maxHeight: '500px', overflow: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                Resume Analysis Results
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                {analysis}
              </Typography>
            </Paper>
          )}

          {tabValue === 2 && improvements && (
            <Paper sx={{ p: 3, maxHeight: '500px', overflow: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
                Resume Improvement Suggestions
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                {improvements}
              </Typography>
            </Paper>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {(analysis || improvements) && (
            <Button 
              variant="contained" 
              onClick={() => setTabValue(0)}
            >
              Analyze Another Resume
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResumeAnalyzer;