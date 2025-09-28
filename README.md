# SkillOps - Hackathon Project

A web application showcasing **Best Use of AI Personas** through specialized DevOps career guidance, powered by Amazon Q Business.

## Hackathon Project: Best Use of AI Personas

This project demonstrates innovative AI persona implementation for DevOps career development. Each persona provides specialized expertise:

🏗️ **DevOps Architect** - Infrastructure design and cloud architecture guidance
⚙️ **DevOps Engineer** - CI/CD pipelines, automation, and deployment strategies
👨🏫 **Career Mentor** - DevOps career paths and skill development roadmaps
💻 **Technical Interviewer** - Interview preparation and hands-on scenarios

### Key Features:
- **4 Distinct AI Personas** with specialized knowledge domains
- **Context-Aware Responses** based on selected persona
- **Age-Appropriate Communication** (child/adult modes)
- **Bilingual Support** (English/Spanish)
- **Real-time Persona Switching** within conversations
- **Dual Theme System** (Professional Blue & ASU Sparky Maroon/Gold)
- **Fully Responsive Design** (Mobile, Tablet, Desktop)
- **AI-Powered Resume Analysis** using Google Gemini API
- **Interactive Learning Tools** (Flowcharts, Flashcards, Quizzes)
- **Career Development Features** (Job Trends, Analytics, Certification Paths)
- **3D Animated Avatars** (Professional & ASU Sparky Mascot)
- **Production-Ready Security** with environment variable management

## Repository Structure

```
/
├── frontend/               # React frontend application
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── Assets/         # Images and SVG files
│   │   ├── Components/     # React components
│   │   ├── services/       # API services
│   │   └── utilities/      # Helper functions and contexts
│   ├── .env                # Environment variables
│   └── package.json        # Dependencies
├── DEPLOYMENT.md           # Deployment instructions
└── template.json           # CloudFormation template for backend
```

## Features

### 🤖 AI-Powered Personas
- **DevOps Architect**: Infrastructure design and cloud architecture guidance
- **DevOps Engineer**: CI/CD pipelines, automation, and deployment strategies
- **Career Mentor**: DevOps career paths and skill development roadmaps
- **Technical Interviewer**: Interview preparation and hands-on scenarios

### 🎨 User Experience
- **Dual Theme System**: Switch between Professional Blue and ASU Sparky themes
- **3D Animated Avatars**: Professional human avatar and ASU Sun Devil mascot
- **Fully Responsive Design**: Optimized for mobile, tablet, and desktop
- **Bilingual Support**: English and Spanish language options
- **Age-Appropriate Communication**: Simplified mode for students

### 📚 Learning & Development Tools
- **Interactive Flowcharts**: Visual DevOps process diagrams
- **Digital Flashcards**: Key concepts and terminology
- **Knowledge Quizzes**: Test understanding of DevOps principles
- **Hands-On Challenges**: Practical skill-building exercises

### 💼 Career Development Features
- **Job Market Trends**: Real-time industry insights
- **Career Analytics**: Skill gap analysis and recommendations
- **Certification Pathways**: Guided certification roadmaps
- **Interview Trainer**: Mock interviews and preparation
- **Resume Analysis**: AI-powered resume optimization using Google Gemini
- **Career Pathing**: Personalized career progression plans
- **Community Benchmarking**: Compare skills with industry standards

### 🔧 Technical Features
- **AI-Powered Chat**: Amazon Q Business integration for intelligent responses
- **Document Knowledge Base**: S3-stored documents and web-crawled content
- **Feedback System**: User rating system for continuous improvement
- **Production Security**: Environment variables and input validation
- **Real-time State Management**: Seamless persona and theme switching
- **Accessibility Compliance**: WCAG-compliant components and keyboard navigation

## Technology Stack

- **Frontend**: React.js, Material-UI, CSS Grid/Flexbox
- **Backend**: AWS Lambda, API Gateway
- **AI Services**: Amazon Q Business, Google Gemini API
- **Data Sources**: S3 documents, Web crawler
- **Deployment**: AWS CloudFormation, AWS Amplify
- **State Management**: React Context API
- **Styling**: Material-UI theming, responsive CSS
- **Security**: Environment variables, input validation, timeout handling

## Getting Started

1. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed setup instructions
2. Configure Amazon Q Business as described in the deployment guide
3. Deploy the backend using CloudFormation
4. Set up and deploy the frontend using AWS Amplify

## Development

To run the application locally:

```bash
cd frontend
npm install
# Create .env file with required environment variables
npm start
```
