# TensorFlow NLP Component Generator

A modern web application that uses AI to generate React components from natural language descriptions. Built with React, NestJS, and TensorFlow.

## Overview

This application allows users to:
- Create React components using natural language descriptions
- Arrange components in a responsive grid layout
- Edit and customize generated components
- Manage component layouts in real-time

## Architecture

### Frontend
- **Framework**: React with Vite
- **State Management**: Zustand
- **Layout**: React Grid Layout
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript

### Backend
- **Framework**: NestJS
- **AI Model**: TensorFlow.js
- **API**: RESTful endpoints
- **Deployment**: Azure Container Apps

## Setup Guide

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Git

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tf-nlp-service.git
cd tf-nlp-service
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:

Backend (.env):
```env
PORT=3000
NODE_ENV=development
```

Frontend (.env.local):
```env
VITE_API_URL=http://localhost:3000
VITE_MAX_RETRIES=3
VITE_RETRY_DELAY=1000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run start:dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Development Guide

### Project Structure

```
tf-nlp-service/
├── backend/
│   ├── src/
│   │   ├── tensorflow/
│   │   │   ├── tensorflow.controller.ts
│   │   │   └── tensorflow.service.ts
│   │   └── main.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   └── package.json
└── README.md
```

### Key Features

1. **Component Generation**
   - Natural language processing for component creation
   - AI-powered component structure generation
   - Real-time component rendering

2. **Layout Management**
   - Drag-and-drop component positioning
   - Responsive grid system
   - Component resizing

3. **Error Handling**
   - Graceful fallbacks for failed generations
   - Network retry mechanisms
   - Type-safe component creation

## Deployment

The application is configured for deployment on Azure Container Apps:

1. Backend API:
   - Containerized NestJS application
   - Azure Container Apps deployment
   - GitHub Actions CI/CD pipeline

2. Frontend:
   - Static site hosting
   - Environment-based configuration
   - Production optimizations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Acknowledgments

- React Grid Layout for the responsive grid system
- TensorFlow.js team for the machine learning capabilities
- NestJS team for the backend framework
