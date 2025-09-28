import React from "react";
import Typography from "@mui/material/Typography";
import { useLanguage } from "../utilities/LanguageContext"; // Adjust the import path
import { useMode } from "../utilities/ModeContext";
import SparkyAvatar from "./SparkyAvatar.jsx";
import { useTheme } from '../utilities/ThemeContext';
import { TEXT, HEADER_TEXT_GRADIENT } from "../utilities/constants"; // Adjust the import path
import { Container, Box } from "@mui/material";

function ChatHeader({ selectedLanguage }) {
  const { currentLanguage } = useLanguage();
  const { currentMode } = useMode();
  const { isSparkyTheme } = useTheme();
  const language = selectedLanguage || currentLanguage || 'EN'; // Use selectedLanguage if provided, otherwise default to currentLanguage or 'EN'

  const modeText = currentMode === 'tutor' ? 'Learning & Practice' : 'Career Guidance';
  const modeIcon = currentMode === 'tutor' ? '📚' : '🎯';

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography variant="h4" className="chatHeaderText" sx={{ background: isSparkyTheme ? HEADER_TEXT_GRADIENT : '#1565C0', textAlign: 'center', fontWeight: 'bold' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isSparkyTheme ? (
            <SparkyAvatar size={32} />
          ) : (
            <Box sx={{ fontSize: '2rem' }}>⚙️</Box>
          )}
          <span style={{ color: isSparkyTheme ? '#8C1D40' : '#1565C0' }}>SkillOps - {modeText}</span>
        </Box>
      </Typography>
    </Container>
  );
}

export default ChatHeader;
