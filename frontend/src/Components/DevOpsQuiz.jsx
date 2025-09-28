import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Radio, RadioGroup, FormControlLabel, LinearProgress } from '@mui/material';

const quizQuestions = [
  {
    question: "What does CI/CD stand for?",
    options: ["Continuous Integration/Continuous Deployment", "Code Integration/Code Deployment", "Central Integration/Central Deployment", "Custom Integration/Custom Deployment"],
    correct: 0
  },
  {
    question: "Which tool is primarily used for containerization?",
    options: ["Jenkins", "Docker", "Ansible", "Terraform"],
    correct: 1
  },
  {
    question: "What is Kubernetes used for?",
    options: ["Version control", "Container orchestration", "Code compilation", "Database management"],
    correct: 1
  },
  {
    question: "Which command initializes a Terraform project?",
    options: ["terraform start", "terraform init", "terraform begin", "terraform create"],
    correct: 1
  },
  {
    question: "What is the main purpose of Infrastructure as Code (IaC)?",
    options: ["Writing application code", "Managing infrastructure through code", "Testing applications", "Monitoring systems"],
    correct: 1
  },
  {
    question: "Which tool is commonly used for configuration management?",
    options: ["Git", "Docker", "Ansible", "Prometheus"],
    correct: 2
  },
  {
    question: "What does YAML stand for?",
    options: ["Yet Another Markup Language", "YAML Ain't Markup Language", "Young Application Markup Language", "Year-based Application Markup Language"],
    correct: 1
  },
  {
    question: "Which monitoring tool is often paired with Grafana?",
    options: ["Jenkins", "Docker", "Prometheus", "Ansible"],
    correct: 2
  }
];

export default function DevOpsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (parseInt(selectedAnswer) === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const showAnswer = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return '#4caf50';
    if (percentage >= 60) return '#ff9800';
    return '#f44336';
  };

  if (quizCompleted) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 2, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2, color: getScoreColor() }}>
          Quiz Completed! 🎉
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Your Score: {score} / {quizQuestions.length}
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: getScoreColor() }}>
          {((score / quizQuestions.length) * 100).toFixed(0)}%
        </Typography>
        <Button variant="contained" onClick={restartQuiz} size="large">
          Take Quiz Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">DevOps Knowledge Quiz</Typography>
        <Typography variant="body2" color="text.secondary">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={((currentQuestion + 1) / quizQuestions.length) * 100} 
          sx={{ mt: 1 }}
        />
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {quizQuestions[currentQuestion].question}
          </Typography>
          
          <RadioGroup value={selectedAnswer} onChange={(e) => handleAnswerSelect(e.target.value)}>
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index.toString()}
                control={<Radio />}
                label={option}
                sx={{
                  mb: 1,
                  backgroundColor: showResult && index === quizQuestions[currentQuestion].correct ? '#e8f5e8' : 'transparent',
                  borderRadius: 1,
                  p: 1
                }}
              />
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          variant="outlined" 
          onClick={showAnswer}
          disabled={!selectedAnswer || showResult}
        >
          Show Answer
        </Button>
        
        <Button 
          variant="contained" 
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {currentQuestion + 1 === quizQuestions.length ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </Box>

      {showResult && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="body1">
            <strong>Correct Answer:</strong> {quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correct]}
          </Typography>
        </Box>
      )}
    </Box>
  );
}