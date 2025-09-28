import React, { useState, useEffect, useRef } from "react";
import { Grid, Avatar, Typography } from "@mui/material";
import BotAvatar from "../Assets/BotAvatar.svg";
import { WEBSOCKET_API, ALLOW_MARKDOWN_BOT } from "../utilities/constants";
import ReactMarkdown from "react-markdown";

const StreamingMessage = ({ initialMessage, setProcessing }) => {
  const [responses, setResponses] = useState([]);
  const ws = useRef(null);
  const messageBuffer = useRef(""); // Buffer to hold incomplete JSON strings

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket(WEBSOCKET_API);

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
      // Send initial message
      ws.current.send(JSON.stringify({ action: "sendMessage", prompt: initialMessage }));
    };

    ws.current.onmessage = (event) => {
      try {
        messageBuffer.current += event.data; // Append new data to buffer
        const parsedData = JSON.parse(messageBuffer.current); // Try to parse the full buffer
        
        if (parsedData.type === "end") {
          // Implement your logic here
          setProcessing(false); // Set processing to false when parsing is complete
          console.log("end of conversation");
        }
        
        if (parsedData.type === "delta") {
          setResponses((prev) => [...prev, parsedData.text]);
        }

        // Update the previous data type
        messageBuffer.current = ""; // Clear buffer on successful parse
      } catch (e) {
        if (e instanceof SyntaxError) {
          console.log("Received incomplete JSON, waiting for more data...");
        } else {
          console.error("Error processing message: ", e);
          messageBuffer.current = ""; // Clear buffer if error is not related to JSON parsing
        }
      }
    };

    ws.current.onerror = (error) => {
      console.log("WebSocket Error: ", error);
    };

    ws.current.onclose = (event) => {
      if (event.wasClean) {
        console.log(`WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.log("WebSocket Disconnected unexpectedly");
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [initialMessage, setProcessing]
); // Add setProcessing to the dependency array

return (
  <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
    <Grid item>
      <Avatar alt="Bot Avatar" src={BotAvatar} />
    </Grid>
    {ALLOW_MARKDOWN_BOT ? (
      <Grid item className="botMessage" sx={{ backgroundColor: (theme) => theme.palette.background.botMessage }}>
        <ReactMarkdown>{responses.join("")}</ReactMarkdown>
      </Grid>
    ) : (
      <Grid item className="botMessage" sx={{ backgroundColor: (theme) => theme.palette.background.botMessage }}>
        <Typography variant="body2">{responses.join("")}</Typography>  
      </Grid>
    )}
  </Grid>
  );
};

export default StreamingMessage;