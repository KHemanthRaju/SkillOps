import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import { NavigateNext, NavigateBefore, Refresh } from '@mui/icons-material';

const flashcardsData = [
  { question: "What does CI/CD stand for?", answer: "Continuous Integration / Continuous Deployment" },
  { question: "What is Docker?", answer: "A containerization platform that packages applications with their dependencies" },
  { question: "What is Kubernetes?", answer: "An orchestration platform for managing containerized applications at scale" },
  { question: "What is Infrastructure as Code (IaC)?", answer: "Managing infrastructure through code rather than manual processes" },
  { question: "What is Jenkins?", answer: "An open-source automation server for CI/CD pipelines" },
  { question: "What is Terraform?", answer: "An IaC tool for building, changing, and versioning infrastructure" },
  { question: "What is Ansible?", answer: "An automation tool for configuration management and application deployment" },
  { question: "What is a microservice?", answer: "A small, independent service that communicates over well-defined APIs" },
  { question: "What is monitoring in DevOps?", answer: "Tracking application performance, infrastructure health, and user experience" },
  { question: "What is Git?", answer: "A distributed version control system for tracking code changes" },
  { question: "What is a container?", answer: "A lightweight, portable package containing application code and dependencies" },
  { question: "What is DevOps?", answer: "A culture combining development and operations to improve collaboration and delivery" }
];

export default function DevOpsFlashcards() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(flashcardsData);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % shuffled.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + shuffled.length) % shuffled.length);
    setIsFlipped(false);
  };

  const shuffleCards = () => {
    const newShuffled = [...flashcardsData].sort(() => Math.random() - 0.5);
    setShuffled(newShuffled);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">DevOps Flashcards</Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {currentCard + 1} / {shuffled.length}
          </Typography>
          <IconButton onClick={shuffleCards} size="small">
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <Card 
        sx={{ 
          height: 300, 
          cursor: 'pointer',
          mb: 2,
          position: 'relative'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <CardContent 
          sx={{ 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: isFlipped ? '#e3f2fd' : '#fff',
            transition: 'background-color 0.3s ease'
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {isFlipped ? 'Answer:' : 'Question:'}
            </Typography>
            <Typography variant="h5" component="div">
              {isFlipped ? shuffled[currentCard].answer : shuffled[currentCard].question}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          startIcon={<NavigateBefore />} 
          onClick={prevCard}
          disabled={shuffled.length <= 1}
        >
          Previous
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </Button>
        
        <Button 
          endIcon={<NavigateNext />} 
          onClick={nextCard}
          disabled={shuffled.length <= 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}