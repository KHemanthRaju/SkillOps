import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, FormControl, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';

function VoiceSettings({ onSettingsChange }) {
  const [voices, setVoices] = useState([]);
  const [settings, setSettings] = useState({
    voiceIndex: 0,
    rate: 0.85,
    pitch: 0.8,
    volume: 0.9,
    autoSpeak: true
  });

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      
      // Filter for male English voices
      const maleVoices = availableVoices.filter(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        
        return (
          lang.startsWith('en') && (
            name.includes('male') ||
            name.includes('david') ||
            name.includes('alex') ||
            name.includes('daniel') ||
            name.includes('tom') ||
            name.includes('mark') ||
            name.includes('guy') ||
            name.includes('google') && name.includes('male')
          )
        );
      });
      
      // If no specific male voices found, use all English voices
      const voicesToUse = maleVoices.length > 0 ? maleVoices : availableVoices.filter(v => v.lang.startsWith('en'));
      
      setVoices(voicesToUse);
      
      // Auto-select best voice
      const bestVoice = voicesToUse.find(voice => 
        voice.name.includes('Google') && voice.name.includes('Male')
      ) || voicesToUse.find(voice => 
        voice.name.includes('David') || voice.name.includes('Alex')
      ) || voicesToUse[0];
      
      if (bestVoice) {
        const bestIndex = voicesToUse.indexOf(bestVoice);
        setSettings(prev => ({ ...prev, voiceIndex: bestIndex }));
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    onSettingsChange?.(settings, voices[settings.voiceIndex]);
  }, [settings, voices, onSettingsChange]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const testVoice = () => {
    if (voices[settings.voiceIndex]) {
      const utterance = new SpeechSynthesisUtterance("Hello! I'm your DevOps assistant. How can I help you today?");
      utterance.voice = voices[settings.voiceIndex];
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.volume = settings.volume;
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        🎙️ Voice Settings
      </Typography>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>Voice:</Typography>
        <Select
          value={settings.voiceIndex}
          onChange={(e) => handleSettingChange('voiceIndex', e.target.value)}
          size="small"
        >
          {voices.map((voice, index) => (
            <MenuItem key={index} value={index}>
              {voice.name} ({voice.lang})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Speech Rate: {settings.rate.toFixed(2)}
        </Typography>
        <Slider
          value={settings.rate}
          onChange={(e, value) => handleSettingChange('rate', value)}
          min={0.5}
          max={1.5}
          step={0.05}
          size="small"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Pitch: {settings.pitch.toFixed(2)}
        </Typography>
        <Slider
          value={settings.pitch}
          onChange={(e, value) => handleSettingChange('pitch', value)}
          min={0.5}
          max={1.2}
          step={0.05}
          size="small"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Volume: {settings.volume.toFixed(2)}
        </Typography>
        <Slider
          value={settings.volume}
          onChange={(e, value) => handleSettingChange('volume', value)}
          min={0.1}
          max={1.0}
          step={0.05}
          size="small"
        />
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={settings.autoSpeak}
            onChange={(e) => handleSettingChange('autoSpeak', e.target.checked)}
          />
        }
        label="Auto-speak responses"
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 1 }}>
        <button onClick={testVoice} style={{ 
          padding: '8px 16px', 
          borderRadius: '4px', 
          border: '1px solid #ccc',
          background: '#f5f5f5',
          cursor: 'pointer'
        }}>
          Test Voice
        </button>
      </Box>
    </Box>
  );
}

export default VoiceSettings;