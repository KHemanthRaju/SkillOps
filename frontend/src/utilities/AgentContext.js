import React, { createContext, useContext, useState } from 'react';

const AgentContext = createContext();

export const AgentProvider = ({ children }) => {
  const [agentInsights, setAgentInsights] = useState({
    careerCoach: null,
    jobMarket: null,
    technicalMentor: null
  });

  const updateAgentInsight = (agentType, insight) => {
    setAgentInsights(prev => ({
      ...prev,
      [agentType]: insight
    }));
  };

  return (
    <AgentContext.Provider value={{ agentInsights, updateAgentInsight }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
};