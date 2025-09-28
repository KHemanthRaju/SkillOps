import AmazonQService from './services/amazonQService';

/**
 * Simple test script for the Amazon Q Business feedback API
 */
async function testFeedbackApi() {
  console.log('Starting Amazon Q Business feedback API test...');
  
  try {
    // Sample test data
    const testData = {
      messageId: 'test-message-id-123',
      conversationId: 'test-conversation-id-456',
      applicationId: 'test-application-id-789',
      feedback: 'UPVOTED' // Test with upvote
    };
    
    console.log('Testing Amazon Q Feedback API with:', testData);
    
    // Call the feedback method
    const result = await AmazonQService.sendFeedback(
      testData.messageId,
      testData.feedback,
      testData.conversationId,
      testData.applicationId
    );
    
    console.log('Feedback API Test Result:', result);
    return result;
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Export the test function
export { testFeedbackApi };

// To run this test:
// 1. Import this function: import { testFeedbackApi } from './test-feedback';
// 2. Call the function: testFeedbackApi();