import CONFIG from '../config';

class TranslationService {
  static async translate(text, targetLanguage) {
    try {
      if (!CONFIG.translation.enabled || !CONFIG.translation.apiKey) {
        console.warn('Translation is disabled or API key is missing');
        return text;
      }

      const apiKey = CONFIG.translation.apiKey;
      const endpoint = 'https://translation.googleapis.com/language/translate/v2';

      const response = await fetch(`${endpoint}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage.toLowerCase() === 'es' ? 'es' : 'en',
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      // Return original text if translation fails
      return text;
    }
  }

  // Helper method to determine if text needs translation
  static needsTranslation(text, currentLanguage) {
    if (!text || typeof text !== 'string') return false;
    
    // Simple heuristic: check if the text contains common words from the opposite language
    const spanishWords = ['el', 'la', 'los', 'las', 'es', 'son', 'está', 'están', 'por', 'para'];
    const englishWords = ['the', 'is', 'are', 'was', 'were', 'for', 'to', 'in', 'on', 'at'];
    
    const words = text.toLowerCase().split(/\s+/);
    const hasSpanishWords = spanishWords.some(word => words.includes(word));
    const hasEnglishWords = englishWords.some(word => words.includes(word));
    
    return (currentLanguage === 'ES' && hasEnglishWords) || 
           (currentLanguage === 'EN' && hasSpanishWords);
  }
}

export default TranslationService;