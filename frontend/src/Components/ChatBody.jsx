import React, { useState, useRef, useEffect } from "react";
import { Grid, Avatar, Typography, Box } from "@mui/material";
import Attachment from "./Attachment";
import ChatInput from "./ChatInput";
import UserAvatar from "../Assets/UserAvatar.svg";
import BotResponse from "./BotResponse";
import createMessageBlock from "../utilities/createMessageBlock";
import { ALLOW_FILE_UPLOAD, ALLOW_VOICE_RECOGNITION, ALLOW_FAQ, TEXT } from "../utilities/constants";
import BotFileCheckReply from "./BotFileCheckReply";
import SpeechRecognitionComponent from "./SpeechRecognition";
import {FAQExamples} from "./index";
import SimplifyToggle from "./SimplifyToggle";
import { useLanguage } from "../utilities/LanguageContext";
import { useAnalytics } from "../hooks/useAnalytics";
import { useTheme } from '../utilities/ThemeContext';

function ChatBody() {
  const [messageList, setMessageList] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [questionAsked, setQuestionAsked] = useState(false);
  const [isSimplified, setIsSimplified] = useState(false);
  const [showLeftNav, setShowLeftNav] = useState(true);
  const messagesEndRef = useRef(null);
  const { currentLanguage } = useLanguage();
  const { trackFeatureUsage } = useAnalytics();
  const { isSparkyTheme } = useTheme();

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  // Listen for left nav state changes
  useEffect(() => {
    const handleLeftNavChange = (event) => {
      setShowLeftNav(event.detail);
    };
    window.addEventListener('leftNavChange', handleLeftNavChange);
    return () => window.removeEventListener('leftNavChange', handleLeftNavChange);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = (message) => {
    setProcessing(true);
    const newMessageBlock = createMessageBlock(message, "USER", "TEXT", "SENT");
    setMessageList([...messageList, newMessageBlock]);
    getBotResponse(setMessageList, setProcessing, message, currentLanguage, isSimplified ? 'child' : 'adult');
    setQuestionAsked(true);
    trackFeatureUsage('chat', 'message_sent', { messageLength: message.length, language: currentLanguage });
  };

  const handleFileUploadComplete = (file, fileStatus) => {
    const newMessageBlock = createMessageBlock(`File uploaded: ${file.name}`, "USER", "FILE", "SENT", file.name, fileStatus);
    setMessageList((prevList) => [...prevList, newMessageBlock]);
    setQuestionAsked(true);

    setTimeout(() => {
      const botMessageBlock = createMessageBlock(fileStatus === "File page limit check succeeded." ? "Checking file size." : fileStatus === "File size limit exceeded." ? "File size limit exceeded. Please upload a smaller file." : "Network Error. Please try again later.", "BOT", "FILE", "RECEIVED", file.name, fileStatus);
      setMessageList((prevList) => [...prevList, botMessageBlock]);
    }, 1000);
  };

  const handlePromptClick = (prompt) => {
    handleSendMessage(prompt);
    trackFeatureUsage('chat', 'faq_clicked', { prompt });
  };
  
  // Feedback handler commented out for now
  /*
  const handleFeedbackChange = async (messageId, feedback) => {
    try {
      // Import the service dynamically
      const AmazonQService = (await import('../services/amazonQService')).default;
      
      // Send feedback to localStorage
      const result = await AmazonQService.sendFeedback(messageId, feedback);
      
      // Update the message list with the new feedback state
      setMessageList(prevList => {
        return prevList.map(msg => {
          if (msg.messageId === messageId) {
            return { ...msg, feedback };
          }
          return msg;
        });
      });
      
      if (!result.success) {
        console.warn("Feedback error:", result.error);
      }
    } catch (error) {
      console.error("Error handling feedback:", error);
    }
  };
  */

  const getMessage = () => message;

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="space-between" className="appHeight100 appWidth100">
        <Box flex={1} overflow="auto" className="chatScrollContainer">
          <Box sx={{ display: ALLOW_FAQ ? "flex" : "none" }}>
            {!questionAsked && <FAQExamples onPromptClick={handlePromptClick} showLeftNav={showLeftNav} />}
          </Box>
          {messageList.map((msg, index) => (
            <Box key={index} mb={2}>
              {msg.sentBy === "USER" ? 
                <UserReply message={msg.message} /> : 
                msg.type === "FILE" ? 
                  <BotFileCheckReply 
                    message={msg.message} 
                    fileName={msg.fileName} 
                    fileStatus={msg.fileStatus} 
                    messageType={msg.sentBy === "USER" ? "user_doc_upload" : "bot_response"} 
                  /> : 
                  <BotResponse 
                    message={msg.message} 
                    citations={msg.citations} 
                    messageId={msg.messageId}
                    conversationId={msg.conversationId}
                    state={msg.state}
                  />
              }
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="flex-end" sx={{ flexShrink: 0 }}>
          <Box sx={{ display: ALLOW_VOICE_RECOGNITION ? "flex" : "none" }}>
            <SpeechRecognitionComponent setMessage={setMessage} getMessage={getMessage} />
          </Box>
          <Box sx={{ display: ALLOW_FILE_UPLOAD ? "flex" : "none" }}>
            <Attachment onFileUploadComplete={handleFileUploadComplete} />
          </Box>
          <Box sx={{ width: "100%" }} ml={2}>
            <SimplifyToggle 
              isSimplified={isSimplified}
              onToggle={setIsSimplified}
            />
            <ChatInput onSendMessage={handleSendMessage} processing={processing} message={message} setMessage={setMessage} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ChatBody;

function UserReply({ message }) {
  const { isSparkyTheme } = useTheme();
  
  return (
    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
      <Grid item className="userMessage" sx={{ backgroundColor: isSparkyTheme ? '#8C1D40' : (theme) => theme.palette.background.userMessage }}>
        <Typography variant="body2" sx={{ fontSize: '1rem', color: isSparkyTheme ? '#FFFFFF' : 'text.primary' }}>{message}</Typography>
      </Grid>
      <Grid item>
        <Avatar alt={"User Profile Pic"} src={UserAvatar} />
      </Grid>
    </Grid>
  );
}

const getBotResponse = async (setMessageList, setProcessing, message, currentLanguage, ageGroup) => {
  // Show loading message with thinking animation
  const loadingMessage = createMessageBlock("Thinking...", "BOT", "TEXT", "PROCESSING");
  setMessageList(prevList => [...prevList, loadingMessage]);
  
  try {
    // Import the services dynamically to avoid circular dependencies
    const AmazonQService = (await import('../services/amazonQService')).default;
    const TranslationService = (await import('../services/translationService')).default;
    const { BOT_RESPONSE_DELAY } = await import('../utilities/constants');
    
    // Call Amazon Q Business API with language and age group
    const data = await AmazonQService.sendMessage(message, currentLanguage, null, null, ageGroup);
    
    // Get the response from systemMessage field
    let responseText = data.systemMessage || TEXT[currentLanguage].NO_RESPONSE || "No response received";
    
    // Translate the response if needed (when language is Spanish)
    if (currentLanguage === 'ES') {
      responseText = await TranslationService.translate(responseText, 'es');
    }
    
    console.log("API response systemMessage:", responseText);
    
    // Add delay before showing the response to simulate thinking time
    await new Promise(resolve => setTimeout(resolve, BOT_RESPONSE_DELAY || 1500));
    
    // Get message ID and conversation ID from the response
    const messageId = data.systemMessageId || `msg_${Date.now()}`;
    const conversationId = data.conversationId || '';
    
    // Store conversation ID in sessionStorage for feedback
    if (conversationId) {
      sessionStorage.setItem('amazonq_conversation_id', conversationId);
    }
    
    // Update the message list with the bot's response
    setMessageList(prevList => {
      const newList = [...prevList];
      // Find and replace the loading message
      const loadingIndex = newList.findIndex(
        msg => msg.sentBy === "BOT" && msg.state === "PROCESSING"
      );
      
      const botResponseMessage = createMessageBlock(
        responseText, 
        "BOT", 
        "TEXT", 
        "RECEIVED", 
        "", 
        "", 
        data.sourceAttributions || [],
        messageId,
        "", // No feedback initially
        conversationId // Store conversation ID with the message
      );
      
      if (loadingIndex !== -1) {
        newList[loadingIndex] = botResponseMessage;
      } else {
        newList.push(botResponseMessage);
      }
      
      return newList;
    });
  } catch (error) {
    console.error("Error calling Amazon Q Business API:", error);
    
    // Show error message
    setMessageList(prevList => {
      const newList = [...prevList];
      const loadingIndex = newList.findIndex(
        msg => msg.sentBy === "BOT" && msg.state === "PROCESSING"
      );
      
      const errorMessage = createMessageBlock(
        TEXT[currentLanguage].ERROR_MESSAGE || "Sorry, I encountered an error. Please try again later.",
        "BOT", 
        "TEXT", 
        "RECEIVED"
      );
      
      if (loadingIndex !== -1) {
        newList[loadingIndex] = errorMessage;
      } else {
        newList.push(errorMessage);
      }
      
      return newList;
    });
  } finally {
    setProcessing(false);
  }
};
