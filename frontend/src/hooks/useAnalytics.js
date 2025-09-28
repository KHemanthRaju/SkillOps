import { useEffect, useCallback } from 'react';
import analyticsService from '../services/analyticsService';

export const useAnalytics = () => {
  const track = useCallback((eventName, properties = {}) => {
    analyticsService.track(eventName, properties);
  }, []);

  const trackClick = useCallback((element, additionalProps = {}) => {
    const rect = element.getBoundingClientRect();
    track('click', {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      element: element.tagName,
      className: element.className,
      ...additionalProps
    });
  }, [track]);

  const trackPageView = useCallback((page) => {
    track('page_view', { page });
  }, [track]);

  const trackFeatureUsage = useCallback((feature, action, metadata = {}) => {
    track(`${feature}_${action}`, metadata);
  }, [track]);

  // Auto-track clicks
  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        trackClick(button, { 
          buttonText: button.textContent?.trim(),
          buttonType: button.type || 'button'
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [trackClick]);

  // Auto-track page views
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, [trackPageView]);

  return {
    track,
    trackClick,
    trackPageView,
    trackFeatureUsage
  };
};