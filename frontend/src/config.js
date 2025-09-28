// Configuration for API endpoints
const CONFIG = {
  api: {
    baseEndpoint: process.env.REACT_APP_BASE_API_ENDPOINT ? process.env.REACT_APP_BASE_API_ENDPOINT.trim() : undefined,
    endpoint: process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT.trim() : undefined,
    feedbackEndpoint: process.env.REACT_APP_FEEDBACK_ENDPOINT ? process.env.REACT_APP_FEEDBACK_ENDPOINT.trim() : undefined,
    region: process.env.REACT_APP_AWS_REGION ? process.env.REACT_APP_AWS_REGION.trim() : undefined,
    lambdaFunction: process.env.REACT_APP_LAMBDA_FUNCTION ? process.env.REACT_APP_LAMBDA_FUNCTION.trim() : undefined,
    applicationId: process.env.REACT_APP_APPLICATION_ID ? process.env.REACT_APP_APPLICATION_ID.trim() : undefined
  },        

  ui: {
    noAnswerMessage: {
      EN: "I don't have enough information to answer that question.",
      ES: "No tengo suficiente información para responder a esa pregunta."
    },
    loadingMessage: {
      EN: "Thinking...",
      ES: "Pensando..."
    },
    errorMessage: {
      EN: "Sorry, I encountered an error. Please try again later.",
      ES: "Lo siento, encontré un error. Por favor, inténtalo de nuevo más tarde."
    },
    emptyStateMessage: {
      EN: "Welcome! Choose a persona above and ask about your career goals, job search, or professional development.",
      ES: "¡Bienvenido! Elige una persona arriba y pregunta sobre tus objetivos profesionales, búsqueda de empleo o desarrollo profesional."
    },
    translationIndicator: {
      EN: "Automatic translation",
      ES: "Traducción automática"
    }
  },
  translation: {
    defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || 'EN'
  },
  supportedLanguages: ['EN', 'ES'],
  defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || 'EN',
  debug: {
    logApiCalls: true,
    logConversationState: true,
    logTranslations: true
  }
};

console.log('Amazon Q Business API Configuration:', {
  endpoint: CONFIG.api.endpoint,
  region: CONFIG.api.region,
  supportedLanguages: CONFIG.supportedLanguages
});

export default CONFIG;