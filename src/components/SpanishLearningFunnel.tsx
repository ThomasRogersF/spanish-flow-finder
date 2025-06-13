
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
    recommendedPlan: '',
    userPath: ''
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initial segmentation question
  const initialQuestion: Question = {
    id: 'q1',
    title: "Great! Who are the Spanish learners?",
    subtitle: 'This helps us direct you to the right place.',
    options: [
      { id: 'adult', text: 'For myself (or another adult)', icon: '👩‍🎓' },
      { id: 'child', text: 'For my child', icon: '👶' },
      { id: 'family', text: 'For my family', icon: '👨‍👩‍👧‍👦' },
      { id: 'company', text: 'For my company or team', icon: '🏢' }
    ]
  };

  // Adult learner path questions
  const adultQuestions: Question[] = [
    {
      id: 'q2a',
      title: "What's the main goal inspiring you to learn Spanish?",
      subtitle: 'This helps us tailor your lessons to what matters most to you.',
      options: [
        { id: 'travel', text: 'To travel with confidence and immerse myself in new cultures.', icon: '✈️' },
        { id: 'career', text: 'For career advancement and to open professional doors.', icon: '💼' },
        { id: 'connect', text: 'To connect more deeply with my family, partner, or friends.', icon: '❤️' },
        { id: 'joy', text: 'For the joy of learning and to keep my mind sharp.', icon: '🧠' }
      ]
    },
    {
      id: 'q3a',
      title: "What's your experience with Spanish so far?",
      subtitle: "Don't worry, there are no wrong answers! This just helps us find your starting point.",
      options: [
        { id: 'beginner', text: "I'm a complete beginner.", icon: '🌱' },
        { id: 'apps', text: "I've used apps but struggle to speak.", icon: '📱' },
        { id: 'school', text: "I took it in school, but I'm very rusty.", icon: '🏫' },
        { id: 'basic', text: 'I can hold a basic conversation but want to be fluent.', icon: '💬' }
      ]
    },
    {
      id: 'q4a',
      title: "To help us find the perfect fit, what does your ideal learning environment look like?",
      subtitle: 'Select the style that best fits how you like to learn.',
      options: [
        { id: 'personal', text: 'A personal coach who adapts to my pace and learning style.', icon: '👨‍🏫' },
        { id: 'classroom', text: 'A supportive classroom where I can practice with other students.', icon: '👥' },
        { id: 'combination', text: 'A combination of private coaching and group conversation practice.', icon: '🔄' }
      ]
    }
  ];

  const getCurrentQuestions = (): Question[] => {
    if (state.currentStep === 1) {
      return [initialQuestion];
    }
    
    // Return appropriate questions based on user path
    switch (state.userPath) {
      case 'adult':
        return adultQuestions;
      case 'child':
      case 'family':
      case 'company':
        // For now, return adult questions as placeholder until other paths are implemented
        return adultQuestions;
      default:
        return [];
    }
  };

  const getTotalSteps = (): number => {
    const baseSteps = 2; // lead capture + results
    if (state.userPath === 'adult') {
      return 1 + adultQuestions.length + baseSteps; // initial + adult questions + base
    }
    return 1 + 3 + baseSteps; // initial + 3 questions + base (placeholder for other paths)
  };

  // Conditional logic for plan recommendation
  const calculateRecommendation = (answers: Record<string, string>): string => {
    console.log('Calculating recommendation with answers:', answers);

    // Adult learner path recommendations
    if (state.userPath === 'adult') {
      const learningStyle = answers.q4a;
      
      if (learningStyle === 'A personal coach who adapts to my pace and learning style.') {
        return PLANS.PRIVATE;
      }
      
      if (learningStyle === 'A supportive classroom where I can practice with other students.') {
        return PLANS.GROUP;
      }
      
      if (learningStyle === 'A combination of private coaching and group conversation practice.') {
        return PLANS.FLUENT_BUNDLE;
      }
    }
    
    // Default fallback
    return PLANS.PRIVATE;
  };

  const handleStart = () => {
    setState(prev => ({ ...prev, currentStep: 1 }));
  };

  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...state.answers, [questionId]: answer };
    
    // Handle initial segmentation
    if (questionId === 'q1') {
      const userPath = answer === 'For myself (or another adult)' ? 'adult' :
                      answer === 'For my child' ? 'child' :
                      answer === 'For my family' ? 'family' :
                      answer === 'For my company or team' ? 'company' : '';
      
      setState(prev => ({
        ...prev,
        answers: newAnswers,
        userPath: userPath as any,
        currentStep: prev.currentStep + 1
      }));
      return;
    }
    
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

  const totalSteps = getTotalSteps();
  const currentQuestions = getCurrentQuestions();

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Welcome screen
  if (state.currentStep === 0) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  // Question screens
  const questionsLength = state.userPath === 'adult' ? 1 + adultQuestions.length : 4;
  if (state.currentStep <= questionsLength) {
    const questionIndex = state.currentStep === 1 ? 0 : state.currentStep - 2;
    const currentQuestion = currentQuestions[questionIndex];
    
    if (!currentQuestion) {
      // If no question found, move to lead capture
      setState(prev => ({ ...prev, currentStep: questionsLength + 1 }));
      return null;
    }
    
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
  if (state.currentStep === questionsLength + 1) {
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
