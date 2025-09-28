import React, { useState } from 'react';
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import AppHeader from './AppHeader';
import ChatHeader from './ChatHeader'; // Import ChatHeader
import { useLanguage } from '../utilities/LanguageContext';
import { useCookies } from 'react-cookie';
import Grid from "@mui/material/Grid";
import { LANDING_PAGE_TEXT } from '../utilities/constants'; // Adjust the import path

const LandingPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const { setLanguage } = useLanguage();
  const [, setCookie] = useCookies(['language']);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSaveLanguage = () => {
    setLanguage(selectedLanguage);
    setCookie('language', selectedLanguage, { path: '/' });
    window.location.reload(); // Reload the page to apply the new language setting
  };

  const texts = LANDING_PAGE_TEXT[selectedLanguage];

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <AppHeader showSwitch={false} />
      <Grid container direction="column" justifyContent="flex-start" alignItems="center" flex={1} p={2}>
        <Box mt={0} mb={4}> {/* Add some margin-top and margin-bottom for spacing */}
          <ChatHeader selectedLanguage={selectedLanguage} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={8} sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 3, color: 'white', minHeight: '60vh' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
            ⚙️ Welcome to DevOps Career AI
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 4, opacity: 0.9 }}>
            Get expert DevOps career guidance from specialized AI personas
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
              <Typography variant="h4">🏗️</Typography>
              <Typography variant="body2">DevOps Architect</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
              <Typography variant="h4">⚙️</Typography>
              <Typography variant="body2">DevOps Engineer</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
              <Typography variant="h4">👨🏫</Typography>
              <Typography variant="body2">Career Mentor</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
              <Typography variant="h4">💻</Typography>
              <Typography variant="body2">Technical Interviewer</Typography>
            </Box>
          </Box>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            {texts.CHOOSE_LANGUAGE}
          </Typography>
          <RadioGroup value={selectedLanguage} onChange={handleLanguageChange} sx={{ mb: 3 }}>
            <FormControlLabel value="EN" control={<Radio sx={{ color: 'white' }} />} label={texts.ENGLISH} sx={{ color: 'white' }} />
            <FormControlLabel value="ES" control={<Radio sx={{ color: 'white' }} />} label={texts.SPANISH} sx={{ color: 'white' }} />
          </RadioGroup>
          <Button variant="contained" onClick={handleSaveLanguage} sx={{ mt: 2, bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' }, px: 4, py: 1.5, fontSize: '1.1rem' }}>
            {texts.SAVE_CONTINUE}
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default LandingPage;
