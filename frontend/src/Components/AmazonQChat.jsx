import React, { useState, useRef, useEffect } from 'react';
import { Grid, Avatar, Box, CircularProgress, Typography } from "@mui/material";
import UserAvatar from "../Assets/UserAvatar.svg";
import createMessageBlock from "../utilities/createMessageBlock";
import ChatInput from "./ChatInput";
import AmazonQService from "../services/amazonQService";
import TranslationService from "../services/translationService";
import CONFIG from "../config";
import { useLanguage } from "../utilities/LanguageContext";
import { TEXT } from "../utilities/constants";
import Switch from "./Switch";
import BotResponse from "./BotResponse";
import PersonaSelector from "./PersonaSelector";

// Debug logging is controlled in config.js

function AmazonQChat() {
  const [messageList, setMessageList] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [lastSystemMessageId, setLastSystemMessageId] = useState(null);
  const [selectedPersona, setSelectedPersona] = useState('architect');
  const [isUserListening, setIsUserListening] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentLanguage } = useLanguage();
  
  // Reset conversation when language changes to ensure consistent language in responses
  useEffect(() => {
    // Only reset if there's an existing conversation
    if (conversationId) {
      console.log('Language changed, resetting conversation');
      setConversationId(null);
      setLastSystemMessageId(null);
    }
  }, [currentLanguage, conversationId]);

  useEffect(() => {
    scrollToBottom();
    // Log conversation state on mount and updates
    console.log('AmazonQChat state:', { 
      conversationId, 
      lastSystemMessageId,
      messageCount: messageList.length,
      currentLanguage: currentLanguage
    });
  }, [messageList, conversationId, lastSystemMessageId, currentLanguage]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async (inputText) => {
    console.log(`Sending message in ${currentLanguage}:`, inputText);
    setProcessing(true);
    
    // Add user message to UI
    const userMessageBlock = createMessageBlock(inputText, "USER", "TEXT", "SENT");
    setMessageList(prevList => [...prevList, userMessageBlock]);
    
    try {
      // Modify input text for Spanish language
      const modifiedInput = currentLanguage === 'EN' ?  inputText : `${inputText} in spanish`;
      console.log("Current Language", currentLanguage);
      console.log("Modified Input ",modifiedInput);
      
      // Call Amazon Q Business API with persona
      const data = await AmazonQService.sendMessage(modifiedInput, currentLanguage, conversationId, lastSystemMessageId, 'adult', selectedPersona);
      
      // Log the raw API response
      console.log('Raw API Response in handleSendMessage:', JSON.stringify(data, null, 2));
      
      // Store conversation IDs
      if (data.conversationId) {
        console.log('New conversation ID:', data.conversationId);
        setConversationId(data.conversationId);
      }
      
      if (data.systemMessageId) {
        console.log('New system message ID:', data.systemMessageId);
        setLastSystemMessageId(data.systemMessageId);
      }
      
      // Get response message
      let messageToDisplay = data.systemMessage || "No response received";
      
      // Check if translation is needed and translate
      if (TranslationService.needsTranslation(messageToDisplay, currentLanguage)) {
        console.log(`Translating response to ${currentLanguage}`);
        try {
          messageToDisplay = await TranslationService.translate(messageToDisplay, currentLanguage);
          // Add translation indicator
          messageToDisplay = `${messageToDisplay}\n\n[${currentLanguage === 'ES' ? 'Traducción automática' : 'Automatic translation'}]`;
        } catch (error) {
          console.error('Translation failed:', error);
        }
      }
      
      // Create bot response message block
      const botMessageBlock = createMessageBlock(
        messageToDisplay, 
        "BOT", 
        "TEXT", 
        "RECEIVED", 
        "", 
        "", 
        data.isNoAnswerFound ? [] : data.sourceAttributions || [], // Don't show citations for no-answer
        data.systemMessageId || "",
        "",
        data.conversationId,
        data.isNoAnswerFound // Pass the no-answer flag to the message block
      );
      
      // Debug log the message block
      console.log('Created message block:', {
        messageId: botMessageBlock.messageId,
        conversationId: botMessageBlock.conversationId,
        state: botMessageBlock.state,
        isNoAnswerFound: botMessageBlock.isNoAnswerFound,
        hasCitations: botMessageBlock.citations && botMessageBlock.citations.length > 0,
        fullBlock: botMessageBlock
      });
      
      setMessageList(prevList => {
        const newList = [...prevList, botMessageBlock];
        console.log('Updated message list:', newList.map(msg => ({
          sentBy: msg.sentBy,
          messageId: msg.messageId,
          conversationId: msg.conversationId,
          state: msg.state,
          isNoAnswerFound: msg.isNoAnswerFound
        })));
        return newList;
      });
      
    } catch (error) {
      console.error("Error in chat interaction:", error);
      const errorMessage = createMessageBlock(
        CONFIG.ui.errorMessage[currentLanguage],
        "BOT",
        "TEXT",
        "RECEIVED"
      );
      setMessageList(prevList => [...prevList, errorMessage]);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" className="appHeight100 appWidth100">
      <Box p={2} borderBottom="1px solid #e0e0e0">
        <PersonaSelector selectedPersona={selectedPersona} onPersonaChange={setSelectedPersona} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" mr={1} sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Age Group:</Typography>
            <Switch />
          </div>
        </Box>
      </Box>
      
      <Box flex={1} overflow="auto" className="chatScrollContainer">
        {messageList.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <div>{CONFIG.ui.emptyStateMessage[currentLanguage]}</div>
          </Box>
        ) : (
          (() => { console.log('Rendering messageList:', messageList); return null; })(),
          messageList.map((msg, index) => {
            console.log('Rendering msg:', msg);
            return (
              <Box key={index} mb={2}>
                {msg.sentBy === "USER" ? (
                  <UserMessage message={msg.message} />
                ) : (
                  <BotResponse 
                    message={msg.message} 
                    citations={msg.citations}
                    state={msg.state}
                    persona={selectedPersona}
                  />
                )}
              </Box>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Box>
      
      <Box sx={{ width: "100%" }}>
        {processing && (
          <Box display="flex" justifyContent="center" my={1}>
            <CircularProgress size={24} />
          </Box>
        )}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          processing={processing} 
          onListeningChange={setIsUserListening}
          placeholder={TEXT[currentLanguage].CHAT_INPUT_PLACEHOLDER}
        />
      </Box>
    </Box>
  );
}

function UserMessage({ message }) {
  return (
    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
      <Grid item className="userMessage" sx={{ backgroundColor: (theme) => theme.palette.background.userMessage }}>
        <div>{message}</div>
      </Grid>
      <Grid item>
        <Avatar alt={"User Profile Pic"} src={UserAvatar} />
      </Grid>
    </Grid>
  );
}

export default AmazonQChat;