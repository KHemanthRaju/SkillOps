import React, { useState, useEffect } from "react";
import { TextField, Grid, IconButton, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useLanguage } from "../utilities/LanguageContext";
import { TEXT } from "../utilities/constants";
import { useTranscript } from "../utilities/TranscriptContext";
import VoiceInput from "./VoiceInput";

function ChatInput({ onSendMessage, processing, onListeningChange }) {
  const [message, setMessage] = useState("");
  const [helperText, setHelperText] = useState("");
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const { currentLanguage } = useLanguage();
  const { transcript, setTranscript, isListening } = useTranscript();

  useEffect(() => {
    if (!isListening && transcript) {
      setMessage(prevMessage => prevMessage ? `${prevMessage} ${transcript}` : transcript);
      setTranscript(""); // Clear the transcript buffer
    }
  }, [isListening, transcript, setTranscript]);

  const handleTyping = (event) => {
    if (helperText) {
      setHelperText("");
    }
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    } else {
      setHelperText(TEXT[currentLanguage].HELPER_TEXT);
    }
  };

  const handleVoiceTranscript = (voiceTranscript) => {
    setMessage(prev => prev ? `${prev} ${voiceTranscript}` : voiceTranscript);
  };

  const handleVoiceListeningChange = (listening) => {
    setIsVoiceListening(listening);
    onListeningChange?.(listening);
  };

  const getMessage = (message, transcript, isListening) => {
    if (isListening) {
      if (transcript.length) {
        return message.length ? `${message} ${transcript}` : transcript;
      }
    }
    return message;
  };

  return (
    <Grid container item xs={12} alignItems="center" className="sendMessageContainer">
      <Grid item xs={11.5}>
        <TextField
          multiline
          maxRows={4}
          fullWidth
          disabled={isListening}
          placeholder={TEXT[currentLanguage].CHAT_INPUT_PLACEHOLDER}
          id="USERCHATINPUT"
          value={getMessage(message, transcript, isListening)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !processing) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          onChange={handleTyping}
          helperText={isListening ? TEXT[currentLanguage].SPEECH_RECOGNITION_HELPER_TEXT : helperText}
          sx={{ "& fieldset": { border: "none" } }}
        />
      </Grid>
      <Grid item xs={0.5}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <VoiceInput 
            onTranscript={handleVoiceTranscript}
            onListeningChange={handleVoiceListeningChange}
          />
          <IconButton
            aria-label="send"
            disabled={processing || isListening || isVoiceListening}
            onClick={handleSendMessage}
            color={message.trim() !== "" ? "primary" : "default"}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ChatInput;
