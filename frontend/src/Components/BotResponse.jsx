import React, { useState } from "react";
import { Grid, Avatar, Typography, Box, Link } from "@mui/material";
import BotAvatar from "../Assets/BotAvatar.svg";
import { ALLOW_MARKDOWN_BOT } from "../utilities/constants";
import ReactMarkdown from "react-markdown";
import SparkyAvatar3D from "./SparkyAvatar3D";
import Avatar3DRealistic from "./Avatar3DRealistic";
import VoiceResponse from "./VoiceResponse";
import { useTheme } from '../utilities/ThemeContext';
import PawanKalyanAvatar from './PawanKalyanAvatar';

const BotResponse = ({ message, citations = [], state = "RECEIVED", persona = 'architect' }) => {
  // Ensure message is a string
  const safeMessage = message || "";
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { isSparkyTheme } = useTheme();
  
  // Process the message to handle line breaks
  const formattedMessage = safeMessage.replace(/\n/g, '<br>');
  
  // Filter out duplicate sources based on title
  const uniqueCitations = citations ? Array.from(
    new Map(citations.map(citation => [citation.title, citation])).values()
  ) : [];
  
  console.log('Citations processing:', {
    originalCount: citations?.length || 0,
    uniqueCount: uniqueCitations.length,
    uniqueCitations,
    titles: uniqueCitations.map(c => c.title)
  });
  
  // Check if the bot is currently thinking
  const isThinking = state === "PROCESSING";

  if (isThinking) {
    return (
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
        <Grid item>
          <Avatar alt="Bot Avatar" src={BotAvatar} />
        </Grid>
        <Grid item className="botMessage" sx={{ 
          backgroundColor: (theme) => theme.palette.background.botMessage,
          borderRadius: 2,
          p: 2,
          maxWidth: '80%',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Thinking
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              animation: 'typing 1s infinite ease-in-out',
              '&:nth-of-type(1)': { animationDelay: '0.2s' },
              '&:nth-of-type(2)': { animationDelay: '0.4s' },
              '&:nth-of-type(3)': { animationDelay: '0.6s' }
            }} />
            <Box sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              animation: 'typing 1s infinite ease-in-out',
              '&:nth-of-type(1)': { animationDelay: '0.2s' },
              '&:nth-of-type(2)': { animationDelay: '0.4s' },
              '&:nth-of-type(3)': { animationDelay: '0.6s' }
            }} />
            <Box sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              animation: 'typing 1s infinite ease-in-out',
              '&:nth-of-type(1)': { animationDelay: '0.2s' },
              '&:nth-of-type(2)': { animationDelay: '0.4s' },
              '&:nth-of-type(3)': { animationDelay: '0.6s' }
            }} />
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
      <Grid item xs={4}>
        <Box sx={{ position: 'sticky', top: 20 }}>
          {isSparkyTheme ? (
            <SparkyAvatar3D 
              persona={persona} 
              isThinking={isThinking} 
              isSpeaking={isSpeaking}
              isListening={!isThinking && !isSpeaking}
              message={safeMessage}
            />
          ) : (
            <PawanKalyanAvatar 
              persona={persona} 
              isThinking={isThinking} 
              isSpeaking={isSpeaking}
              isListening={!isThinking && !isSpeaking}
              message={safeMessage}
            />
          )}
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box className="botMessage" sx={{ 
          backgroundColor: isSparkyTheme ? '#FFC627' : (theme) => theme.palette.background.botMessage,
          borderRadius: 2,
          p: 2,
          position: 'relative'
        }}>
        {ALLOW_MARKDOWN_BOT ? (
          <ReactMarkdown>{safeMessage}</ReactMarkdown>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
        )}
        
        {/* Citations */}
        {uniqueCitations && uniqueCitations.length > 0 && (
          <Box mt={1}>
            <Typography 
              variant="caption" 
              color="textSecondary"
              sx={{ fontSize: '0.9rem' }}
            >
              Sources:
            </Typography>
            {uniqueCitations.map((citation, index) => (
              <Box key={index}>
                <Link 
                  href={citation.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    fontSize: '0.9rem',
                    color: '#0066cc',
                    textDecoration: 'underline',
                    '&:hover': {
                      color: '#004499'
                    }
                  }}
                >
                  {citation.title}
                </Link>
              </Box>
            ))}
          </Box>
        )}
        
        {/* Voice Response */}
        <VoiceResponse 
          message={safeMessage}
          onSpeakingChange={setIsSpeaking}
          autoSpeak={true}
        />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BotResponse;