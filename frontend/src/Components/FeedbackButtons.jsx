import React, { useState } from 'react';
import AmazonQService from '../services/amazonQService';
import CONFIG from '../config';

/**
 * Component for upvote and downvote buttons
 */
function FeedbackButtons({ messageId, conversationId }) {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Application ID from environment or default
  const applicationId = CONFIG.api.applicationId;
  
  // Handle feedback submission
  const handleFeedback = async (type) => {
    if (isSubmitting || !messageId || !conversationId) return;
    
    // Toggle feedback if clicking the same button
    if (feedback === type) {
      setFeedback('');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await AmazonQService.sendFeedback(
        messageId,
        type,
        conversationId,
        applicationId
      );
      
      if (result.success) {
        setFeedback(type);
        console.log(`Feedback ${type} submitted successfully for message ${messageId}`);
      } else {
        console.error('Feedback submission failed:', result.error);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // For debugging
  console.log('FeedbackButtons rendering with:', { messageId, conversationId });

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
      <button 
        onClick={() => handleFeedback('UPVOTED')}
        disabled={isSubmitting}
        style={{ 
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginRight: '10px',
          opacity: feedback === 'UPVOTED' ? 1 : 0.6,
          fontSize: '16px'
        }}
        aria-label="Thumbs up"
      >
        👍
      </button>
      <button 
        onClick={() => handleFeedback('DOWNVOTED')}
        disabled={isSubmitting}
        style={{ 
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          opacity: feedback === 'DOWNVOTED' ? 1 : 0.6,
          fontSize: '16px'
        }}
        aria-label="Thumbs down"
      >
        👎
      </button>
    </div>
  );
}

export default FeedbackButtons;