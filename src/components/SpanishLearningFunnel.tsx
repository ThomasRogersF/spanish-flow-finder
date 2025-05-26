
import React, { useState, useEffect } from 'react';
import { QuestionnaireState, Question, PLANS } from '../types/questionnaire';
import WelcomeScreen from './WelcomeScreen';
import QuestionScreen from './QuestionScreen';
import LeadCaptureScreen from './LeadCaptureScreen';
import LoadingScreen from './LoadingScreen';
import RecommendationLanding from './RecommendationLanding';
import SuccessModal from './SuccessModal';

const SpanishLearningFunnel: React.FC = () => {
  const [state, setState] = useState<QuestionnaireState>({
    currentStep: 0,
    answers: {},
    userData: {
      name: '',
      email: '',
      phone: '',
      agreedToTerms: false
    },
    recommendedPlan: ''
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Question data - content team can easily update these placeholders
  const questions: Question[] = [
    {
      id: 'q1',
      title: "What's your main goal for learning Spanish?",
      subtitle: 'Select the option that best describes your learning objective',
      options: [
        { id: 'personal', text: 'Personal 1-to-1 attention', icon: '👨‍🏫' },
        { id: 'budget', text: 'Budget / social learning', icon: '👥' },
        { id: 'selfpaced', text: 'Learn at my own pace', icon: '📱' },
        { id: 'family', text: 'My child / family needs Spanish', icon: '👨‍👩‍👧‍👦' }
      ]
    },
    {
      id: 'q2',
      title: 'How do you prefer to learn?',
      subtitle: 'Choose your preferred learning style',
      options: [
        { id: 'flexible', text: 'Flexible schedule', icon: '⏰' },
        { id: 'structured', text: 'Structured classes', icon: '📚' },
        { id: 'interactive', text: 'Interactive exercises', icon: '🎮' },
        { id: 'conversation', text: 'Conversation practice', icon: '💬' }
      ]
    },
    {
      id: 'q3',
      title: "What's your current Spanish level?",
      subtitle: 'Help us understand your starting point',
      options: [
        { id: 'beginner', text: 'Complete beginner', icon: '🌱' },
        { id: 'basic', text: 'Basic (some words/phrases)', icon: '📖' },
        { id: 'intermediate', text: 'Intermediate (simple conversations)', icon: '💭' },
        { id: 'advanced', text: 'Advanced (complex topics)', icon: '🎓' }
      ]
    },
    {
      id: 'q4',
      title: 'How much time can you dedicate per week?',
      subtitle: 'Select your available time commitment',
      options: [
        { id: 'light', text: '1-2 hours (light commitment)', icon: '⏱️' },
        { id: 'moderate', text: '3-5 hours (moderate pace)', icon: '📅' },
        { id: 'intensive', text: '6+ hours (intensive learning)', icon: '🚀' },
        { id: 'flexible', text: 'Flexible based on my schedule', icon: '🔄' }
      ]
    }
  ];

  const totalSteps = questions.length + 2; // +2 for lead capture and results

  // Conditional logic for plan recommendation
  const calculateRecommendation = (answers: Record<string, string>): string => {
    console.log('Calculating recommendation with answers:', answers);

    // Rule: Personal attention OR flexible schedule → Private Classes
    if (answers.q1 === 'Personal 1-to-1 attention' || 
        answers.q2 === 'Flexible schedule') {
      return PLANS.PRIVATE;
    }
    
    // Rule: Budget/social learning → Group Classes
    if (answers.q1 === 'Budget / social learning') {
      return PLANS.GROUP;
    }
    
    // Rule: Self-paced learning → Academy
    if (answers.q1 === 'Learn at my own pace') {
      return PLANS.ACADEMY;
    }
    
    // Rule: Family learning → Family Classes
    if (answers.q1 === 'My child / family needs Spanish') {
      return PLANS.FAMILY;
    }
    
    // Default fallback based on other preferences
    if (answers.q2 === 'Interactive exercises') {
      return PLANS.ACADEMY;
    }
    
    if (answers.q2 === 'Conversation practice') {
      return PLANS.GROUP;
    }
    
    // Final fallback
    return PLANS.PRIVATE;
  };

  const handleStart = () => {
    setState(prev => ({ ...prev, currentStep: 1 }));
  };

  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...state.answers, [questionId]: answer };
    
    setState(prev => ({
      ...prev,
      answers: newAnswers,
      currentStep: prev.currentStep + 1
    }));
  };

  const handleGoBack = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1)
    }));
  };

  const handleLeadCapture = (userData: QuestionnaireState['userData']) => {
    setIsLoading(true);
    
    // Simulate analysis time
    setTimeout(() => {
      const recommendedPlan = calculateRecommendation(state.answers);
      
      setState(prev => ({
        ...prev,
        userData,
        recommendedPlan,
        currentStep: prev.currentStep + 1
      }));
      
      setIsLoading(false);
    }, 3000); // 3 seconds loading
  };

  const handleStartTrial = () => {
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Welcome screen
  if (state.currentStep === 0) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  // Question screens
  if (state.currentStep <= questions.length) {
    const currentQuestion = questions[state.currentStep - 1];
    return (
      <QuestionScreen
        question={currentQuestion}
        currentStep={state.currentStep}
        totalSteps={totalSteps}
        onAnswer={handleAnswer}
        onGoBack={handleGoBack}
      />
    );
  }

  // Lead capture screen
  if (state.currentStep === questions.length + 1) {
    return (
      <LeadCaptureScreen
        currentStep={state.currentStep}
        totalSteps={totalSteps}
        onSubmit={handleLeadCapture}
        onGoBack={handleGoBack}
      />
    );
  }

  // Recommendation landing page
  return (
    <>
      <RecommendationLanding
        state={state}
        onStartTrial={handleStartTrial}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
      />
    </>
  );
};

export default SpanishLearningFunnel;
