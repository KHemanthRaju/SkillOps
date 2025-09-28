import AmazonQService from './amazonQService';

describe('AmazonQService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('sendMessage', () => {
    const mockResponse = {
      conversationId: 'test-conv-id',
      systemMessageId: 'sys-msg-id',
      userMessageId: 'user-msg-id',
      systemMessage: 'Test response',
      sourceAttributions: []
    };

    it('sends message with default language', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse)
      });

      const message = 'test message';
      await AmazonQService.sendMessage(message);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            language: 'EN'
          })
        })
      );
    });

    it('sends message with custom language', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse)
      });

      const message = 'mensaje de prueba';
      const language = 'ES';
      await AmazonQService.sendMessage(message, language);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            language
          })
        })
      );
    });

    it('includes conversation threading parameters when provided', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse)
      });

      const message = 'test message';
      const language = 'EN';
      const conversationId = 'test-conv';
      const parentMessageId = 'parent-msg';
      
      await AmazonQService.sendMessage(message, language, conversationId, parentMessageId);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            language,
            conversationId,
            parentMessageId
          })
        })
      );
    });

    it('handles API errors appropriately', async () => {
      const errorStatus = 500;
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: errorStatus
      });

      const message = 'test message';
      
      await expect(AmazonQService.sendMessage(message))
        .rejects
        .toThrow(`API error: ${errorStatus}`);
    });
  });
});