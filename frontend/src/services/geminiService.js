const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

class GeminiService {
  constructor() {
    if (!GEMINI_API_KEY) {
      console.warn('Gemini API key not found. Please set REACT_APP_GEMINI_API_KEY environment variable.');
    }
  }

  async analyzeResume(resumeText) {
    if (!GEMINI_API_KEY) {
      return {
        success: false,
        error: 'Gemini API key not configured. Please contact administrator.'
      };
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return {
        success: false,
        error: 'Resume text is too short. Please provide a complete resume.'
      };
    }

    try {
      const prompt = `
        Analyze this resume for a DevOps position and provide:
        1. Overall score (1-10)
        2. Key strengths
        3. Areas for improvement
        4. Missing skills for DevOps roles
        5. Specific recommendations

        Resume:
        ${resumeText}
      `;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response format from Gemini API');
      }

      return {
        success: true,
        analysis: data.candidates[0].content.parts[0].text
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timed out. Please try again.'
        };
      }
      
      return {
        success: false,
        error: error.message || 'Failed to analyze resume. Please try again.'
      };
    }
  }

  async generateResumeImprovements(resumeText, targetRole = 'DevOps Engineer') {
    if (!GEMINI_API_KEY) {
      return {
        success: false,
        error: 'Gemini API key not configured. Please contact administrator.'
      };
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return {
        success: false,
        error: 'Resume text is too short. Please provide a complete resume.'
      };
    }

    try {
      const prompt = `
        Improve this resume for a ${targetRole} position. Provide:
        1. Rewritten professional summary
        2. Enhanced skill descriptions
        3. Better action verbs for experience
        4. Industry-specific keywords to add
        5. Formatting suggestions

        Current Resume:
        ${resumeText}
      `;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response format from Gemini API');
      }

      return {
        success: true,
        improvements: data.candidates[0].content.parts[0].text
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timed out. Please try again.'
        };
      }
      
      return {
        success: false,
        error: error.message || 'Failed to generate improvements. Please try again.'
      };
    }
  }
}

export default new GeminiService();