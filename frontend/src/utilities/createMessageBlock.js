/**
 * Function to create a message block with consistent structure and validation.
 *
 * @param {string} message - The content of the message.
 * @param {string} sentBy - The sender of the message ('USER' or 'BOT').
 * @param {string} [type='TEXT'] - The type of the message ('TEXT' or 'FILE').
 * @param {string} [state='PROCESSING'] - The state of the message ('PROCESSING' or 'RECEIVED' or 'SENT' or 'STREAMING').
 * @param {string} [fileName=''] - The name of the file (if type is 'FILE').
 * @param {string} [fileStatus=''] - The status of the file (if type is 'FILE').
 * @param {Array} [citations=[]] - The source citations for the message.
 * @param {string} [messageId=''] - The unique ID of the message from the API.
 * @param {string} [feedback=''] - The feedback state ('UPVOTED', 'DOWNVOTED', or '').
 * @param {string} [conversationId=''] - The conversation ID from the API.
 * @param {boolean} [isNoAnswerFound=false] - Whether this is a no-answer response.
 * @returns {Object} - A message block object.
 * @throws Will throw an error if sentBy, type, or state are invalid.
 */
const createMessageBlock = (
  message, 
  sentBy, 
  type = "TEXT", 
  state = "PROCESSING", 
  fileName = "", 
  fileStatus = "", 
  citations = [], 
  messageId = "", 
  feedback = "",
  conversationId = "",
  isNoAnswerFound = false
) => {
  // Debug logging
  console.log('Creating message block with params:', {
    sentBy,
    type,
    state,
    messageId,
    conversationId,
    feedback,
    isNoAnswerFound
  });

  // Valid sender types
  const validSenders = ["USER", "BOT"];
  // Valid message types
  const validTypes = ["TEXT", "FILE"];
  // Valid message states
  const validStates = ["PROCESSING", "RECEIVED", "SENT", "STREAMING"];
  // Valid feedback states
  const validFeedback = ["", "UPVOTED", "DOWNVOTED"];

  // Validate the 'sentBy' parameter
  if (!validSenders.includes(sentBy)) {
    throw new Error("Invalid sender. Must be 'USER' or 'BOT'.");
  }

  // Validate the 'type' parameter
  if (!validTypes.includes(type)) {
    throw new Error("Invalid message type. Must be 'TEXT' or 'FILE'.");
  }

  // Validate the 'state' parameter
  if (!validStates.includes(state)) {
    throw new Error("Invalid state. Must be 'PROCESSING', 'RECEIVED', 'SENT', or 'STREAMING'.");
  }
  
  // Validate the 'feedback' parameter
  if (!validFeedback.includes(feedback)) {
    throw new Error("Invalid feedback. Must be '', 'UPVOTED', or 'DOWNVOTED'.");
  }

  // Create the message block
  const messageBlock = {
    message,
    sentBy,
    type,
    state,
    fileName,
    fileStatus,
    citations,
    messageId,
    feedback,
    conversationId,
    isNoAnswerFound
  };

  // Debug logging
  console.log('Created message block:', {
    messageId: messageBlock.messageId,
    conversationId: messageBlock.conversationId,
    state: messageBlock.state,
    isNoAnswerFound: messageBlock.isNoAnswerFound
  });

  return messageBlock;
};

export default createMessageBlock;
