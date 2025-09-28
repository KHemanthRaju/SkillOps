import React, { useState, useRef, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Rating, Chip, IconButton, LinearProgress } from '@mui/material';
import { Psychology, Refresh, Mic, MicOff, VolumeUp, Stop } from '@mui/icons-material';

const InterviewTrainerButton = () => {
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  const interviewQuestions = [
    "How would you troubleshoot a failing CI/CD pipeline?",
    "Describe how you would implement monitoring for a microservices architecture.",
    "Walk me through your approach to handling a production outage.",
    "How do you ensure security in your DevOps processes?",
    "Explain how you would migrate a monolithic application to containers.",
    "How do you handle secrets management in your infrastructure?",
    "Describe your strategy for implementing Infrastructure as Code.",
    "How would you optimize a slow-performing application deployment?"
  ];

  const generateFollowUpQuestion = (previousAnswer, previousQuestion) => {
    const answerLower = previousAnswer.toLowerCase();
    const questionLower = previousQuestion.toLowerCase();
    
    const followUps = {
      pipeline: [
        "What specific testing strategies do you implement in your CI/CD pipeline?",
        "How do you handle rollback scenarios when a deployment fails?",
        "Can you walk me through your branching strategy for CI/CD?"
      ],
      monitoring: [
        "What alerting thresholds would you set for this monitoring system?",
        "How do you handle alert fatigue in your monitoring setup?",
        "What's your approach to creating effective dashboards?"
      ],
      outage: [
        "How do you communicate with stakeholders during an outage?",
        "What information do you include in your post-mortem reports?",
        "How do you prevent similar outages from happening again?"
      ],
      security: [
        "How do you implement security scanning in your CI/CD pipeline?",
        "What's your approach to managing secrets rotation?",
        "How do you handle security compliance audits?"
      ],
      container: [
        "What challenges have you faced with container orchestration?",
        "How do you handle persistent storage in containerized applications?",
        "What's your strategy for container image security?"
      ]
    };
    
    let topic = 'general';
    if (questionLower.includes('pipeline') || answerLower.includes('pipeline')) topic = 'pipeline';
    else if (questionLower.includes('monitoring') || answerLower.includes('monitor')) topic = 'monitoring';
    else if (questionLower.includes('outage') || answerLower.includes('outage')) topic = 'outage';
    else if (questionLower.includes('security') || answerLower.includes('security')) topic = 'security';
    else if (questionLower.includes('container') || answerLower.includes('container')) topic = 'container';
    
    if (followUps[topic]) {
      return followUps[topic][Math.floor(Math.random() * followUps[topic].length)];
    }
    
    if (answerLower.includes('tool') || answerLower.includes('technology')) {
      return "Can you compare that tool with alternatives you've used?";
    }
    if (answerLower.includes('team') || answerLower.includes('collaborate')) {
      return "How do you handle conflicts or disagreements within your team?";
    }
    
    return "Can you give me a specific example from your experience?";
  };

  const startInterview = () => {
    const randomQuestion = interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setUserAnswer('');
    setFeedback(null);
    setConversationHistory([]);
    setQuestionCount(1);
    speakQuestion(randomQuestion);
  };

  const speakQuestion = (question) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      synthRef.current = utterance;
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setUserAnswer(prev => prev + ' ' + finalTranscript);
        }
      };
      
      recognition.onerror = () => setIsListening(false);
      
      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const evaluateAnswer = (question, answer) => {
    const answerLength = answer.trim().length;
    const words = answer.toLowerCase().split(/\s+/);
    
    // Keywords for different question types
    const keywords = {
      cicd: ['pipeline', 'jenkins', 'gitlab', 'github', 'build', 'deploy', 'test', 'automation'],
      monitoring: ['prometheus', 'grafana', 'elk', 'logs', 'metrics', 'alerts', 'dashboard'],
      troubleshooting: ['debug', 'logs', 'investigate', 'root cause', 'analyze', 'isolate'],
      security: ['secrets', 'vault', 'encryption', 'rbac', 'compliance', 'vulnerability'],
      containers: ['docker', 'kubernetes', 'pods', 'images', 'registry', 'orchestration'],
      infrastructure: ['terraform', 'cloudformation', 'ansible', 'iac', 'provisioning']
    };
    
    let score = 2; // Base score
    let strengths = [];
    let improvements = [];
    let tips = "";
    
    // Length-based scoring
    if (answerLength > 200) score += 1;
    if (answerLength > 400) score += 0.5;
    if (answerLength < 50) score -= 1;
    
    // Keyword matching
    const questionLower = question.toLowerCase();
    let keywordCount = 0;
    
    Object.entries(keywords).forEach(([category, keywordList]) => {
      const matchedKeywords = keywordList.filter(keyword => words.includes(keyword));
      keywordCount += matchedKeywords.length;
      
      if (matchedKeywords.length > 0) {
        if (questionLower.includes('pipeline') && category === 'cicd') {
          strengths.push('Mentioned CI/CD tools');
          score += 0.5;
        }
        if (questionLower.includes('monitoring') && category === 'monitoring') {
          strengths.push('Good monitoring knowledge');
          score += 0.5;
        }
        if (questionLower.includes('troubleshoot') && category === 'troubleshooting') {
          strengths.push('Systematic approach');
          score += 0.5;
        }
      }
    });
    
    // Structure analysis
    if (answer.includes('1.') || answer.includes('First') || answer.includes('Step')) {
      strengths.push('Well-structured response');
      score += 0.3;
    }
    
    if (words.includes('example') || words.includes('experience')) {
      strengths.push('Provided examples');
      score += 0.2;
    }
    
    // Generate improvements based on gaps
    if (keywordCount < 2) {
      improvements.push('Mention specific tools');
    }
    if (answerLength < 150) {
      improvements.push('Provide more detail');
    }
    if (!answer.includes('monitor') && questionLower.includes('troubleshoot')) {
      improvements.push('Include monitoring strategy');
    }
    if (!words.some(w => ['team', 'communicate', 'stakeholder'].includes(w))) {
      improvements.push('Mention communication aspects');
    }
    
    // Generate contextual tips
    if (questionLower.includes('pipeline')) {
      tips = "Consider mentioning specific CI/CD tools like Jenkins, GitLab CI, or GitHub Actions. Discuss testing strategies and rollback procedures.";
    } else if (questionLower.includes('monitoring')) {
      tips = "Elaborate on the observability stack: metrics (Prometheus), logs (ELK), and traces (Jaeger). Mention SLIs/SLOs.";
    } else if (questionLower.includes('outage')) {
      tips = "Focus on incident response: detection, communication, mitigation, and post-mortem. Mention runbooks and escalation procedures.";
    } else if (questionLower.includes('security')) {
      tips = "Discuss shift-left security, secret management (Vault/AWS Secrets), and compliance frameworks like SOC2 or PCI-DSS.";
    } else if (questionLower.includes('container')) {
      tips = "Cover containerization strategy, orchestration with Kubernetes, and migration patterns like strangler fig or blue-green.";
    } else {
      tips = "Consider adding real-world examples from your experience and mentioning specific tools or frameworks.";
    }
    
    // Ensure minimum feedback
    if (strengths.length === 0) {
      strengths.push('Attempted the question');
    }
    if (improvements.length === 0) {
      improvements.push('Add more technical depth');
    }
    
    return {
      rating: Math.min(5, Math.max(1, Math.round(score * 10) / 10)),
      strengths,
      improvements,
      tips
    };
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    
    stopListening();
    setIsLoading(true);
    
    setTimeout(() => {
      const evaluation = evaluateAnswer(currentQuestion, userAnswer);
      
      const newEntry = {
        question: currentQuestion,
        answer: userAnswer,
        feedback: evaluation,
        questionNumber: questionCount
      };
      
      setConversationHistory(prev => [...prev, newEntry]);
      setFeedback(evaluation);
      setIsLoading(false);
      
      if (evaluation.rating >= 3 && questionCount < 4) {
        setTimeout(() => {
          const followUp = generateFollowUpQuestion(userAnswer, currentQuestion);
          setCurrentQuestion(followUp);
          setUserAnswer('');
          setFeedback(null);
          setQuestionCount(prev => prev + 1);
          speakQuestion(followUp);
        }, 3000);
      }
    }, 1500);
  };

  const askFollowUp = () => {
    if (conversationHistory.length > 0) {
      const lastEntry = conversationHistory[conversationHistory.length - 1];
      const followUp = generateFollowUpQuestion(lastEntry.answer, lastEntry.question);
      setCurrentQuestion(followUp);
      setUserAnswer('');
      setFeedback(null);
      setQuestionCount(prev => prev + 1);
      speakQuestion(followUp);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        startIcon={<Psychology />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#9C27B0',
          '&:hover': { backgroundColor: '#7B1FA2' },
          textTransform: 'none',
          py: 1.5
        }}
      >
        Interview Trainer
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Psychology color="primary" />
          DevOps Interview Trainer
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Practice DevOps interviews with AI-powered feedback and follow-up questions
          </Typography>
          
          {conversationHistory.length > 0 && (
            <Box sx={{ mb: 3, p: 2, backgroundColor: '#f0f4f8', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                📊 Interview Progress: Question {questionCount} | Average Score: {(conversationHistory.reduce((sum, entry) => sum + entry.feedback.rating, 0) / conversationHistory.length).toFixed(1)}/5
              </Typography>
            </Box>
          )}

          {!currentQuestion ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Ready to start your interview practice?
              </Typography>
              <Button 
                variant="contained" 
                onClick={startInterview}
                startIcon={<Psychology />}
                size="large"
              >
                Start Interview
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Interview Question:
              </Typography>
              <Box sx={{ 
                p: 2, 
                backgroundColor: '#f5f5f5', 
                borderRadius: 1, 
                mb: 3,
                border: '1px solid #e0e0e0'
              }}>
                <Typography variant="body1">
                  {currentQuestion}
                </Typography>
              </Box>

              <Box sx={{ 
                border: '2px dashed #ccc', 
                borderRadius: 2, 
                p: 3, 
                mb: 2,
                backgroundColor: isListening ? '#f0f8ff' : '#fafafa',
                borderColor: isListening ? '#2196f3' : '#ccc'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Voice Answer:</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {isSpeaking && (
                      <IconButton onClick={stopSpeaking} color="error">
                        <Stop />
                      </IconButton>
                    )}
                    <IconButton 
                      onClick={isSpeaking ? stopSpeaking : () => speakQuestion(currentQuestion)}
                      color="primary"
                      disabled={isListening}
                    >
                      <VolumeUp />
                    </IconButton>
                    <IconButton
                      onClick={isListening ? stopListening : startListening}
                      color={isListening ? "error" : "primary"}
                      sx={{ 
                        backgroundColor: isListening ? '#ffebee' : '#e3f2fd',
                        '&:hover': {
                          backgroundColor: isListening ? '#ffcdd2' : '#bbdefb'
                        }
                      }}
                    >
                      {isListening ? <MicOff /> : <Mic />}
                    </IconButton>
                  </Box>
                </Box>
                
                {isListening && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                      🎤 Listening... Speak your answer clearly
                    </Typography>
                    <LinearProgress />
                  </Box>
                )}
                
                {isSpeaking && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                      🔊 Speaking question...
                    </Typography>
                    <LinearProgress color="secondary" />
                  </Box>
                )}
                
                <Box sx={{ 
                  minHeight: 120, 
                  p: 2, 
                  backgroundColor: 'white', 
                  borderRadius: 1,
                  border: '1px solid #e0e0e0'
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Your Answer:
                  </Typography>
                  <Typography variant="body1">
                    {userAnswer || 'Click the microphone to start speaking...'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={submitAnswer}
                  disabled={!userAnswer.trim() || isLoading || isListening}
                  startIcon={<Psychology />}
                >
                  {isLoading ? 'Evaluating...' : 'Get Feedback'}
                </Button>
                {feedback && questionCount < 4 && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={askFollowUp}
                    disabled={isListening || isSpeaking}
                  >
                    Ask Follow-up
                  </Button>
                )}
                <Button
                  variant="outlined"
                  onClick={startInterview}
                  startIcon={<Refresh />}
                  disabled={isListening || isSpeaking}
                >
                  New Interview
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setUserAnswer('')}
                  disabled={isListening}
                >
                  Clear Answer
                </Button>
              </Box>

              {feedback && (
                <Box sx={{ 
                  p: 2, 
                  backgroundColor: '#e8f5e8', 
                  borderRadius: 1,
                  border: '1px solid #4caf50'
                }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    Interview Feedback
                    <Rating value={feedback.rating} readOnly size="small" />
                    <Typography variant="body2">({feedback.rating}/5)</Typography>
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Strengths:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {feedback.strengths.map((strength, i) => (
                        <Chip key={i} label={strength} color="success" size="small" />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Areas for Improvement:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {feedback.improvements.map((improvement, i) => (
                        <Chip key={i} label={improvement} color="warning" size="small" />
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      💡 Pro Tip:
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      {feedback.tips}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InterviewTrainerButton;