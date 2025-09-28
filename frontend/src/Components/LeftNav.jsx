import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useLanguage } from "../utilities/LanguageContext"; // Adjust the import path
import { useMode } from "../utilities/ModeContext";
import { ABOUT_US_HEADER_BACKGROUND, ABOUT_US_TEXT, FAQ_HEADER_BACKGROUND, FAQ_TEXT, TEXT } from "../utilities/constants"; // Adjust the import path
import closeIcon from "../Assets/close.svg"; // Assuming close.svg is an image
import arrowRightIcon from "../Assets/arrow_right.svg"; // Assuming arrow_right.svg is an image
import Box from "@mui/material/Box";
import FlowchartButton from "./FlowchartButton";
import FlashcardButton from "./FlashcardButton";
import QuizButton from "./QuizButton";
import JobTrendsButton from "./JobTrendsButton";
import AnalyticsButton from "./AnalyticsButton";
import CertPathButton from "./CertPathButton";
import InterviewTrainerButton from "./InterviewTrainerButton";
import HandsOnChallengeButton from "./HandsOnChallengeButton";
import AgentCollaborationButton from "./AgentCollaborationButton";
import CareerPathingButton from "./CareerPathingButton";
import ResumeBoosterButton from "./ResumeBoosterButton";
import CommunityBenchmarkButton from "./CommunityBenchmarkButton";
import ResumeAnalyzer from "./ResumeAnalyzer";

function LeftNav({ showLeftNav = true, setLeftNav }) {
  const { currentLanguage } = useLanguage();
  const { currentMode } = useMode();

  useEffect(() => {
    // Dispatch event when left nav state changes
    const event = new CustomEvent('leftNavChange', { detail: showLeftNav });
    window.dispatchEvent(event);
  }, [showLeftNav]);

  return (
    <Grid className="appHeight100">
      <Grid container direction="column" justifyContent="space-between" alignItems="stretch" padding={4} spacing={2} sx={{ height: '100%' }}>
        {showLeftNav ? (
          <>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-end">
                  <img
                    src={closeIcon}
                    alt="Close Panel"
                    onClick={() => setLeftNav(false)}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6" sx={{fontWeight:"bold"}} color={ABOUT_US_HEADER_BACKGROUND}>{TEXT[currentLanguage].ABOUT_US_TITLE}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" color={ABOUT_US_TEXT}>
                    {currentMode === 'tutor' ? TEXT[currentLanguage].ABOUT_US_TUTOR : TEXT[currentLanguage].ABOUT_US_MENTOR}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" sx={{fontWeight:"bold"}} color={FAQ_HEADER_BACKGROUND}>{TEXT[currentLanguage].FAQ_TITLE}</Typography>
                </Grid>
                <Grid item>
                  <ul>
                    {(currentMode === 'tutor' ? TEXT[currentLanguage].FAQS_TUTOR : TEXT[currentLanguage].FAQS_MENTOR).map((question, index) => (
                      <li key={index}>
                        <Typography variant="subtitle1" color={FAQ_TEXT}>{question}</Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
                <Grid item sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mx: 2 }}>
                  {currentMode === 'tutor' && <FlowchartButton />}
                  {currentMode === 'tutor' && <FlashcardButton />}
                  {currentMode === 'tutor' && <QuizButton />}
                  {currentMode === 'tutor' && <HandsOnChallengeButton />}
                  {currentMode === 'mentor' && <JobTrendsButton />}
                  {currentMode === 'mentor' && <AnalyticsButton />}
                  {currentMode === 'mentor' && <CertPathButton />}
                  {currentMode === 'mentor' && <InterviewTrainerButton />}
                  {currentMode === 'mentor' && <AgentCollaborationButton />}
                  {currentMode === 'mentor' && <CareerPathingButton />}
                  {currentMode === 'mentor' && <ResumeBoosterButton />}
                  {currentMode === 'mentor' && <CommunityBenchmarkButton />}
                  {currentMode === 'mentor' && <ResumeAnalyzer />}
                </Grid>
              </Grid>
            </Grid>

            {/* Simplify Toggle Explanation - Compact version */}
            <Grid item sx={{ mt: 'auto' }}>
              <Box sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                padding: 1.5, 
                borderRadius: 1,
                mt: 1,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Typography variant="body2" sx={{fontWeight:"bold", fontSize: '0.85rem'}} color={ABOUT_US_HEADER_BACKGROUND}>
                  💡 {currentLanguage === 'ES' ? 'Modo Simplificado' : 'Simplify Mode'}
                </Typography>
                <Typography variant="caption" color={ABOUT_US_TEXT} sx={{ mt: 0.5, display: 'block', fontSize: '0.75rem', lineHeight: 1.3 }}>
                  {currentLanguage === 'ES' 
                    ? 'Activa para respuestas más simples y directas'
                    : 'Toggle for simpler, easier-to-understand responses'}
                </Typography>
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-end">
              <img
                src={arrowRightIcon}
                alt="Open Panel"
                onClick={() => setLeftNav(true)}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default LeftNav;
