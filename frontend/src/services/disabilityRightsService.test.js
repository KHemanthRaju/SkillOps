import DisabilityRightsService from './disabilityRightsService';
import { DISABILITY_RIGHTS_VISION } from '../utilities/constants';

describe('DisabilityRightsService', () => {
  describe('getMessage', () => {
    it('should return English message when language is EN', () => {
      const message = DisabilityRightsService.getMessage('EN');
      expect(message).toBe(DISABILITY_RIGHTS_VISION.EN);
    });

    it('should return Spanish message when language is ES', () => {
      const message = DisabilityRightsService.getMessage('ES');
      expect(message).toBe(DISABILITY_RIGHTS_VISION.ES);
    });

    it('should return English message as default when no language is specified', () => {
      const message = DisabilityRightsService.getMessage();
      expect(message).toBe(DISABILITY_RIGHTS_VISION.EN);
    });

    it('should return English message when an unsupported language is specified', () => {
      const message = DisabilityRightsService.getMessage('FR');
      expect(message).toBe(DISABILITY_RIGHTS_VISION.EN);
    });
  });
});