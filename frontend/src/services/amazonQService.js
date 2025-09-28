import CONFIG from '../config';

/**
 * Service for interacting with Amazon Q Business API
 */
class AmazonQService {
  constructor() {
    // Initialize static properties if not already set
    if (!AmazonQService.lastSystemMessageId) {
      AmazonQService.lastSystemMessageId = '';
    }
    if (!AmazonQService.lastConversationId) {
      AmazonQService.lastConversationId = '';
    }
    if (!AmazonQService.applicationId) {
      AmazonQService.applicationId = '';
    }
  }
  /**
   * Send a message to Amazon Q Business API
   * @param {string} message - The user's message
   * @param {string} language - The language code (EN or ES)
   * @param {string|null} conversationId - The conversation ID for threading (optional)
   * @param {string|null} parentMessageId - The parent message ID for threading (optional)
   * @param {string} ageGroup - The age group ('child' or 'adult') (optional)
   * @returns {Promise} - Promise resolving to the API response
   */
  static async sendMessage(message, language = 'EN', conversationId = null, parentMessageId = null, ageGroup = 'adult', persona = 'advocate') {
    try {
      // Construct request body with age-appropriate instructions
      const personaPrompts = {
        architect: '[Act as a senior DevOps architect. Provide guidance on infrastructure design, cloud architecture, and DevOps best practices.]',
        engineer: '[Act as an experienced DevOps engineer. Help with CI/CD pipelines, automation, containerization, and deployment strategies.]',
        mentor: '[Act as a DevOps career mentor. Provide career path guidance, skill development roadmaps, and industry insights.]',
        interviewer: '[Act as a DevOps technical interviewer. Help with interview preparation, technical questions, and hands-on scenarios.]'
      };
      
      let enhancedMessage = message;
      if (ageGroup === 'child') {
        enhancedMessage = `[Please explain this in clear and simple english terms] ${message}`;
      }
      enhancedMessage = `${personaPrompts[persona]} ${enhancedMessage}`;
      
      const requestBody = { 
        message: enhancedMessage,
        language
      };
      
      // Add conversation threading parameters if they exist
      if (conversationId) {
        requestBody.conversationId = conversationId;
      }
      
      if (parentMessageId) {
        requestBody.parentMessageId = parentMessageId;
      }
      
      // Log request details
      console.log('Amazon Q API Request:', {
        endpoint: CONFIG.api.endpoint,
        requestBody,
        timestamp: new Date().toISOString()
      });
      
      // Make API request
      const startTime = performance.now();
      const response = await fetch(CONFIG.api.endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      const responseTime = performance.now() - startTime;
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Store the message and conversation IDs for feedback
      this.lastSystemMessageId = data.systemMessageId || '';
      this.lastConversationId = data.conversationId || '';
      
      // Check if the response is "No answer is found" (case-insensitive)
      const isNoAnswerFound = data.systemMessage && 
        data.systemMessage.toLowerCase().includes("no answer is found");
      
      // If it's a no-answer response, replace with custom message
      if (isNoAnswerFound) {
        console.log('No answer found - replacing message and clearing sources');
        data.systemMessage = language === 'ES' 
          ? "Lo siento, pero no encuentro información relacionada con su solicitud. ¿Podría reformular su pregunta o darme más contexto para poder ayudarle mejor?"
          : "I'm sorry, but I'm not finding any information related to your request. Could you please rephrase your question or give me additional context so I can help you more effectively?";
        data.sourceAttributions = []; // Clear any source attributions
        data.isNoAnswerFound = true;
      } else {
        data.isNoAnswerFound = false;
      }
      
      // Log full response for debugging
      console.log('Amazon Q API Full Response:', {
        ...data,
        hasSystemMessageId: !!data.systemMessageId,
        hasConversationId: !!data.conversationId,
        isNoAnswerFound: data.isNoAnswerFound,
        originalMessage: data.systemMessage,
        hasSources: data.sourceAttributions && data.sourceAttributions.length > 0
      });
      
      // Log response details
      console.log('Amazon Q API Response:', {
        status: response.status,
        responseTime: `${responseTime.toFixed(2)}ms`,
        language: language,
        conversationId: data.conversationId || 'none',
        systemMessageId: data.systemMessageId || 'none',
        userMessageId: data.userMessageId || 'none',
        systemMessage: data.systemMessage ? `${data.systemMessage.substring(0, 50)}...` : 'none',
        hasSourceAttributions: !!data.sourceAttributions && data.sourceAttributions.length > 0,
        isNoAnswerFound: data.isNoAnswerFound,
        timestamp: new Date().toISOString()
      });
      
      return data;
    } catch (error) {
      console.error('Amazon Q API Error:', {
        message: error.message,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }

  /**
   * Send feedback to Amazon Q Business API
   * @param {string} feedback - The feedback type ('UPVOTED' or 'DOWNVOTED')
   * @param {string} messageId - The ID of the message being rated
   * @param {string} conversationId - The ID of the conversation
   * @returns {Promise} - Promise resolving to the API response
   */
  static async sendFeedback(feedback, messageId, conversationId) {
    try {
      // Use the applicationId from the window object (set in index.js)
      const applicationId = CONFIG.api.applicationId;
      console.log("Using application ID from window object:", applicationId);
      console.log("Application ID type:", typeof applicationId);
      console.log("Application ID length:", applicationId ? applicationId.length : 0);
      console.log("Feedback endpoint template:", CONFIG.api.feedbackEndpoint);
      
      if (!messageId || !conversationId) {
        console.error('Missing required IDs for feedback');
        return { success: false, error: 'Missing message or conversation ID' };
      }
      
      // Construct the feedback endpoint URL with the required parameters
      // Use string literals with explicit string replacement to avoid issues with curly braces
      let feedbackEndpoint = CONFIG.api.feedbackEndpoint;
      feedbackEndpoint = feedbackEndpoint.split("{applicationId}").join(applicationId);
      feedbackEndpoint = feedbackEndpoint.split("{conversationId}").join(conversationId);
      feedbackEndpoint = feedbackEndpoint.split("{messageId}").join(messageId);
      
      console.warn("FEEDBACK DEBUG - Original endpoint template:", CONFIG.api.feedbackEndpoint);
      console.warn("FEEDBACK DEBUG - Final constructed endpoint:", feedbackEndpoint);

      // Map UI feedback values to API values
      const usefulness = feedback === 'UPVOTED' ? 'USEFUL' : 'NOT_USEFUL';

      // Create the request body with both required fields
      const requestBody = {
        messageUsefulness: {
          usefulness,
          submittedAt: new Date().toISOString()
        },
        messageCopiedAt: new Date().toISOString() // Required field
      };

      console.log('Sending feedback to:', feedbackEndpoint);
      console.log('Feedback request body:', requestBody);

      const response = await fetch(feedbackEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `HTTP error ${response.status}` }));
        throw new Error(errorData.error || `Feedback API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Feedback recorded successfully:', result);
      return { success: true, ...result };
    } catch (error) {
      console.error('Feedback API error:', error);
      return { success: false, error: error.message };
    }
  }
}

// Initialize static properties
AmazonQService.lastSystemMessageId = '';
AmazonQService.lastConversationId = '';
AmazonQService.applicationId = '';

// Log environment variables on initialization
console.log("Environment variables check in AmazonQService:", {
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
  APPLICATION_ID: process.env.REACT_APP_APPLICATION_ID,
  CONFIG_APPLICATION_ID: CONFIG.api.applicationId
});

export default AmazonQService;