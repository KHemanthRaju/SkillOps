class AnalyticsService {
  constructor() {
    this.events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    this.sessions = JSON.parse(localStorage.getItem('analytics_sessions') || '[]');
    this.heatmapData = JSON.parse(localStorage.getItem('heatmap_data') || '[]');
    this.currentSession = this.initSession();
  }

  initSession() {
    const sessionId = Date.now().toString();
    const session = {
      id: sessionId,
      startTime: Date.now(),
      events: [],
      userAgent: navigator.userAgent,
      viewport: { width: window.innerWidth, height: window.innerHeight }
    };
    this.sessions.push(session);
    this.saveData();
    return session;
  }

  track(eventName, properties = {}) {
    const event = {
      id: Date.now() + Math.random(),
      name: eventName,
      properties,
      timestamp: Date.now(),
      sessionId: this.currentSession.id,
      url: window.location.pathname
    };
    
    this.events.push(event);
    this.currentSession.events.push(event);
    this.saveData();
    
    // Track for heat mapping
    if (properties.x && properties.y) {
      this.trackHeatmap(properties.x, properties.y, eventName);
    }
  }

  trackHeatmap(x, y, eventType) {
    this.heatmapData.push({
      x: Math.round(x),
      y: Math.round(y),
      type: eventType,
      timestamp: Date.now(),
      viewport: { width: window.innerWidth, height: window.innerHeight }
    });
    this.saveData();
  }

  saveData() {
    localStorage.setItem('analytics_events', JSON.stringify(this.events.slice(-1000))); // Keep last 1000 events
    localStorage.setItem('analytics_sessions', JSON.stringify(this.sessions.slice(-50))); // Keep last 50 sessions
    localStorage.setItem('heatmap_data', JSON.stringify(this.heatmapData.slice(-500))); // Keep last 500 points
  }

  getMetrics() {
    const now = Date.now();
    const last24h = now - (24 * 60 * 60 * 1000);
    const last7d = now - (7 * 24 * 60 * 60 * 1000);

    return {
      totalEvents: this.events.length,
      totalSessions: this.sessions.length,
      eventsLast24h: this.events.filter(e => e.timestamp > last24h).length,
      sessionsLast24h: this.sessions.filter(s => s.startTime > last24h).length,
      avgSessionDuration: this.getAvgSessionDuration(),
      topEvents: this.getTopEvents(),
      userRetention: this.getUserRetention(),
      featureUsage: this.getFeatureUsage()
    };
  }

  getAvgSessionDuration() {
    const completedSessions = this.sessions.filter(s => s.events.length > 1);
    if (completedSessions.length === 0) return 0;
    
    const totalDuration = completedSessions.reduce((sum, session) => {
      const lastEvent = session.events[session.events.length - 1];
      return sum + (lastEvent.timestamp - session.startTime);
    }, 0);
    
    return Math.round(totalDuration / completedSessions.length / 1000); // seconds
  }

  getTopEvents() {
    const eventCounts = {};
    this.events.forEach(event => {
      eventCounts[event.name] = (eventCounts[event.name] || 0) + 1;
    });
    
    return Object.entries(eventCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));
  }

  getUserRetention() {
    const now = Date.now();
    const day1 = now - (24 * 60 * 60 * 1000);
    const day7 = now - (7 * 24 * 60 * 60 * 1000);
    const day30 = now - (30 * 24 * 60 * 60 * 1000);

    return {
      day1: this.sessions.filter(s => s.startTime > day1).length,
      day7: this.sessions.filter(s => s.startTime > day7).length,
      day30: this.sessions.filter(s => s.startTime > day30).length
    };
  }

  getFeatureUsage() {
    const features = {
      chat: this.events.filter(e => e.name.includes('chat')).length,
      flowcharts: this.events.filter(e => e.name.includes('flowchart')).length,
      flashcards: this.events.filter(e => e.name.includes('flashcard')).length,
      quiz: this.events.filter(e => e.name.includes('quiz')).length,
      jobTrends: this.events.filter(e => e.name.includes('job_trends')).length,
      voice: this.events.filter(e => e.name.includes('voice')).length
    };
    
    return Object.entries(features).map(([name, count]) => ({ name, count }));
  }

  predictUserBehavior() {
    // Simple ML prediction based on patterns
    const recentEvents = this.events.slice(-20);
    const patterns = this.analyzePatterns(recentEvents);
    
    return {
      likelyNextAction: patterns.mostCommon,
      engagementScore: patterns.engagementScore,
      churnRisk: patterns.churnRisk,
      recommendations: patterns.recommendations
    };
  }

  analyzePatterns(events) {
    const eventSequence = events.map(e => e.name);
    const eventCounts = {};
    
    eventSequence.forEach(event => {
      eventCounts[event] = (eventCounts[event] || 0) + 1;
    });
    
    const mostCommon = Object.entries(eventCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'chat_message';
    
    const engagementScore = Math.min(100, events.length * 5);
    const churnRisk = events.length < 5 ? 'high' : events.length < 15 ? 'medium' : 'low';
    
    const recommendations = this.generateRecommendations(eventCounts, engagementScore);
    
    return { mostCommon, engagementScore, churnRisk, recommendations };
  }

  generateRecommendations(eventCounts, engagementScore) {
    const recommendations = [];
    
    if (!eventCounts.flowchart_view) {
      recommendations.push('Try interactive flowcharts to visualize DevOps processes');
    }
    if (!eventCounts.quiz_start) {
      recommendations.push('Test your knowledge with our DevOps quiz');
    }
    if (engagementScore < 30) {
      recommendations.push('Explore different AI personas for varied learning styles');
    }
    if (!eventCounts.job_trends_view) {
      recommendations.push('Check out DevOps job market trends');
    }
    
    return recommendations.slice(0, 3);
  }

  getCohortAnalysis() {
    const cohorts = {};
    
    this.sessions.forEach(session => {
      const cohortWeek = this.getWeekStart(session.startTime);
      if (!cohorts[cohortWeek]) {
        cohorts[cohortWeek] = { users: new Set(), retention: {} };
      }
      cohorts[cohortWeek].users.add(session.id);
    });
    
    // Calculate retention for each cohort
    Object.keys(cohorts).forEach(cohortWeek => {
      const cohortStart = parseInt(cohortWeek);
      for (let week = 0; week < 4; week++) {
        const targetWeek = cohortStart + (week * 7 * 24 * 60 * 60 * 1000);
        const activeUsers = this.sessions.filter(s => 
          cohorts[cohortWeek].users.has(s.id) && 
          s.startTime >= targetWeek && 
          s.startTime < targetWeek + (7 * 24 * 60 * 60 * 1000)
        ).length;
        
        cohorts[cohortWeek].retention[`week${week}`] = 
          Math.round((activeUsers / cohorts[cohortWeek].users.size) * 100);
      }
    });
    
    return Object.entries(cohorts).map(([week, data]) => ({
      cohort: new Date(parseInt(week)).toLocaleDateString(),
      size: data.users.size,
      ...data.retention
    }));
  }

  getWeekStart(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff)).setHours(0, 0, 0, 0).toString();
  }

  getHeatmapData() {
    return this.heatmapData.map(point => ({
      ...point,
      intensity: 1 // Can be enhanced with clustering
    }));
  }
}

export default new AnalyticsService();