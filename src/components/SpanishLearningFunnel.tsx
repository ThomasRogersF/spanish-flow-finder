import React, { useState, useEffect } from 'react';
import { QuestionnaireState, Question, PLANS } from '../types/questionnaire';
import WelcomeScreen from './WelcomeScreen';
import QuestionScreen from './QuestionScreen';
import LeadCaptureScreen from './LeadCaptureScreen';
import LoadingScreen from './LoadingScreen';
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
  const [webhookSent, setWebhookSent] = useState(false);

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

  // Parent path questions
  const parentQuestions: Question[] = [
    {
      id: 'q2b',
      title: "How old is your child?",
      subtitle: 'We have specialized programs designed for every age group.',
      options: [
        { id: '3-6', text: '3-6 years old', icon: '🌟' },
        { id: '7-12', text: '7-12 years old', icon: '🎒' },
        { id: '13-17', text: '13-17 years old', icon: '🚀' }
      ]
    },
    {
      id: 'q3b',
      title: "And which of these best describes your child?",
      subtitle: 'This helps us understand your child\'s learning personality so we can ensure they have fun!',
      options: [
        { id: 'shy', text: 'A bit shy and would thrive with one-on-one encouragement.', icon: '🤗' },
        { id: 'social', text: 'Social and energetic – loves learning with others!', icon: '🎉' },
        { id: 'creative', text: 'Creative and loves fun, interactive activities and games.', icon: '🎨' }
      ]
    }
  ];

  // Family path questions
  const familyQuestions: Question[] = [
    {
      id: 'q2c',
      title: "Who in the family will be learning together? (Select all that apply)",
      subtitle: 'Let us know who will be in the class so we can prepare the fun!',
      options: [
        { id: 'parents', text: 'Parent(s) / Guardian(s)', icon: '👨‍👩' },
        { id: 'young-kids', text: 'Young kids (ages 4-11)', icon: '🧒' },
        { id: 'teens', text: 'Teens (ages 12-17)', icon: '👦' },
        { id: 'grandparents', text: 'Grandparents', icon: '👴' }
      ]
    },
    {
      id: 'q3c',
      title: "What's your family's main goal for learning Spanish together?",
      subtitle: 'This helps us design activities that everyone in the family will enjoy.',
      options: [
        { id: 'trip', text: 'To prepare for an upcoming family trip.', icon: '🏖️' },
        { id: 'heritage', text: 'To connect with our family heritage.', icon: '🏠' },
        { id: 'activity', text: 'To find a fun, new educational activity to do together.', icon: '📚' },
        { id: 'support', text: 'To support our children\'s Spanish studies in school.', icon: '🎓' }
      ]
    },
    {
      id: 'q4c',
      title: "What's the general Spanish level of the family members who will be participating?",
      subtitle: 'It\'s okay if levels are different! This helps us create a plan that works for everyone.',
      options: [
        { id: 'all-beginners', text: 'We\'re all complete beginners.', icon: '🌱' },
        { id: 'mixed-basic', text: 'There\'s a mix of beginners and some with a little experience.', icon: '📊' },
        { id: 'wide-range', text: 'We have a wide range of different levels in the group.', icon: '📈' }
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
        return parentQuestions;
      case 'family':
        return familyQuestions;
      case 'company':
        return []; // Business goes directly to results
      default:
        return [];
    }
  };

  const getTotalSteps = (): number => {
    const baseSteps = 1; // just lead capture (no results page)
    if (state.userPath === 'adult') {
      return 1 + adultQuestions.length + baseSteps;
    }
    if (state.userPath === 'child') {
      return 1 + parentQuestions.length + baseSteps;
    }
    if (state.userPath === 'family') {
      return 1 + familyQuestions.length + baseSteps;
    }
    if (state.userPath === 'company') {
      return 1 + baseSteps; // Just initial question + lead capture
    }
    return 4 + baseSteps; // Default fallback
  };

  // Function to get redirect URL based on user path and answers
  const getRedirectUrl = (): string => {
    console.log('Getting redirect URL for path:', state.userPath, 'with answers:', state.answers);

    // Adult learner path redirects
    if (state.userPath === 'adult') {
      const learningStyle = state.answers.q4a;
      
      if (learningStyle === 'A personal coach who adapts to my pace and learning style.') {
        return 'https://spanishvip.com/adults-tutoring-lp/';
      }
      
      if (learningStyle === 'A supportive classroom where I can practice with other students.') {
        return 'https://spanishvip.com/group-classes-lp/';
      }
      
      if (learningStyle === 'A combination of private coaching and group conversation practice.') {
        return 'https://spanishvip.com/bundle-tutoring-lp/';
      }
    }

    // Parent path redirects
    if (state.userPath === 'child') {
      return 'https://spanishvip.com/kids-tutoring-lp/';
    }

    // Family path redirects
    if (state.userPath === 'family') {
      return 'https://spanishvip.com/family-classes-lp/';
    }

    // Business path redirects
    if (state.userPath === 'company') {
      return 'https://spanishvip.com/enterprise-demo/';
    }
    
    // Default fallback
    return 'https://spanishvip.com/adults-tutoring-lp/';
  };

  const handleStart = () => {
    setState(prev => ({ ...prev, currentStep: 1 }));
  };

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    const answerValue = Array.isArray(answer) ? answer.join(', ') : answer;
    const newAnswers = { ...state.answers, [questionId]: answerValue };
    
    // Handle initial segmentation
    if (questionId === 'q1') {
      const userPath = answerValue === 'For myself (or another adult)' ? 'adult' :
                      answerValue === 'For my child' ? 'child' :
                      answerValue === 'For my family' ? 'family' :
                      answerValue === 'For my company or team' ? 'company' : '';
      
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

  const handleLeadCapture = async (userData: QuestionnaireState['userData']) => {
    // Prevent multiple webhook calls
    if (webhookSent) {
      console.log('Webhook already sent, skipping duplicate call');
      return;
    }

    setIsLoading(true);
    setWebhookSent(true);
    
    // Update state with user data
    setState(prev => ({
      ...prev,
      userData
    }));

    // Determine recommended plan based on user path and answers
    let recommendedPlan = '';
    if (state.userPath === 'adult') {
      const learningStyle = state.answers.q4a;
      if (learningStyle === 'A personal coach who adapts to my pace and learning style.') {
        recommendedPlan = 'Private Tutoring Program';
      } else if (learningStyle === 'A supportive classroom where I can practice with other students.') {
        recommendedPlan = 'Unlimited Group Classes';
      } else if (learningStyle === 'A combination of private coaching and group conversation practice.') {
        recommendedPlan = 'Fluent Bundle';
      }
    } else if (state.userPath === 'child') {
      recommendedPlan = 'Spanish for Kids Program';
    } else if (state.userPath === 'family') {
      recommendedPlan = 'Family Classes';
    } else if (state.userPath === 'company') {
      recommendedPlan = 'Corporate Spanish Training';
    }

    // Send data to Make webhook
    const sendDataToWebhook = async () => {
      const webhookUrl = 'https://hook.us2.make.com/pt6126oh9vfke4t7cw6hoq54wh5iafv1';
      
      if (!webhookUrl) {
        console.log("No webhook URL provided, skipping data submission");
        return true;
      }

      // Build enhanced payload with questionnaire responses
      const payload = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        userPath: state.userPath,
        recommendedPlan: recommendedPlan,
        questionnaireResponses: state.answers,
        responsesJson: JSON.stringify(state.answers),
        submissionDate: new Date().toISOString()
      };

      try {
        console.log('Sending webhook payload:', payload);
        
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify(payload),
        });
        
        console.log('Webhook sent successfully');
        return true;
      } catch (error) {
        console.error('Webhook error:', error);
        setWebhookSent(false); // Reset flag on error to allow retry
        return false;
      }
    };

    await sendDataToWebhook();
    
    // Wait then notify parent for redirect via postMessage
    setTimeout(() => {
      setIsLoading(false);
      const redirectUrl = getRedirectUrl();
      console.log('PostMessage to parent for redirect:', redirectUrl);
      window.parent.postMessage(
        { type: 'QUIZ_COMPLETED', redirectUrl },
        '*'
      );
      // Optionally: you can still use window.location.href as fallback for standalone use
      // window.location.href = redirectUrl;
    }, 2000); // 2 seconds loading before redirect
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
  const getQuestionsLength = () => {
    switch (state.userPath) {
      case 'adult':
        return 1 + adultQuestions.length;
      case 'child':
        return 1 + parentQuestions.length;
      case 'family':
        return 1 + familyQuestions.length;
      case 'company':
        return 1; // Just the initial question
      default:
        return 4;
    }
  };

  const questionsLength = getQuestionsLength();
  
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

  // Lead capture screen (final step before redirect)
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

  // This should not be reached anymore since we redirect after lead capture
  return null;
};

export default SpanishLearningFunnel;
