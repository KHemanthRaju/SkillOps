import { DISABILITY_RIGHTS_VISION } from '../utilities/constants';

/**
 * Service for handling disability rights vision messages
 */
class DisabilityRightsService {
  /**
   * Get the disability rights vision message for the current language
   * @param {string} language - The language code (EN or ES)
   * @returns {string} - The appropriate message for the language
   */
  static getMessage(language = 'EN') {
    return DISABILITY_RIGHTS_VISION[language] || DISABILITY_RIGHTS_VISION['EN'];
  }
}

export default DisabilityRightsService;