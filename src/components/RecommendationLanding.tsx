
import React, { useEffect, useState } from 'react';
import { QuestionnaireState } from '../types/questionnaire';

interface RecommendationLandingProps {
  state: QuestionnaireState;
  onStartTrial: () => void;
}

const RecommendationLanding: React.FC<RecommendationLandingProps> = ({ state, onStartTrial }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Trigger webhook when recommendation loads
    const triggerWebhook = async () => {
      const webhookData = {
        timestamp: new Date().toISOString(),
        recommendedPlan: state.recommendedPlan,
        answers: state.answers,
        userData: state.userData,
        userPath: state.userPath,
        source: 'spanish-learning-funnel'
      };

      try {
        await fetch('https://hook.us2.make.com/i6e9jo06c59bi7s5vfkt371l4uxtohsr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify(webhookData),
        });
        console.log('Webhook triggered successfully', webhookData);
      } catch (error) {
        console.error('Webhook error:', error);
      }
    };

    triggerWebhook();
    setTimeout(() => setShowDetails(true), 500);
  }, [state]);

  const getUserGoal = () => {
    const goalAnswers = {
      'To travel with confidence and immerse myself in new cultures.': 'traveling with confidence',
      'For career advancement and to open professional doors.': 'career advancement',
      'To connect more deeply with my family, partner, or friends.': 'connecting with loved ones',
      'For the joy of learning and to keep my mind sharp.': 'personal growth and learning'
    };
    return goalAnswers[state.answers.q2a as keyof typeof goalAnswers] || 'achieving your Spanish goals';
  };

  const planDetails = {
    'Private Tutoring Program': {
      icon: '👨‍🏫',
      benefit: 'Based on your preference for one-on-one focus, our Private Tutoring Program is the perfect fit.',
      description: 'Get personalized 1-on-1 attention with flexible scheduling that fits your life',
      why: [
        'You value personalized attention and feedback',
        'You need a flexible schedule that works with your busy life',
        'You want to progress at your own pace'
      ],
      howItWorks: 'Weekly 60-minute sessions with certified native Spanish teachers via video call',
      included: [
        'A Personalized Learning Plan: A custom plan designed by a native-speaking teacher to help you achieve your goal of ' + getUserGoal(),
        'Your First Class Free: A free 25-minute private class to experience our method firsthand',
        'Proven Curriculum: Access to our learning materials and curriculum trusted by thousands of students'
      ]
    },
    'Unlimited Group Classes': {
      icon: '👥',
      benefit: 'You\'ll love our community! Based on your preferences, our unlimited Group Classes are the perfect fit.',
      description: 'Learn Spanish in a fun, social environment while keeping costs affordable',
      why: [
        'You enjoy learning with others and staying motivated',
        'You want an affordable option without sacrificing quality',
        'You thrive in group discussions and activities'
      ],
      howItWorks: 'Small group classes (max 6 students) with structured curriculum and regular practice',
      included: [
        'A Personalized Learning Plan: A custom plan designed by a native-speaking teacher to help you achieve your goal of ' + getUserGoal(),
        'Your First Class Free: A 7-day trial of unlimited group classes to experience our method firsthand',
        'Proven Curriculum: Access to our learning materials and curriculum trusted by thousands of students'
      ]
    },
    'Fluent Bundle': {
      icon: '🔄',
      benefit: 'Get the best of both worlds! Our Fluent Bundle combines private lessons with unlimited group classes to accelerate your journey.',
      description: 'The perfect combination of personalized coaching and group practice',
      why: [
        'You want the best of both private and group learning',
        'You value personalized attention AND community practice',
        'You\'re serious about achieving fluency quickly'
      ],
      howItWorks: 'Combine private lessons for personalized instruction with unlimited group classes for practice',
      included: [
        'A Personalized Learning Plan: A custom plan designed by a native-speaking teacher to help you achieve your goal of ' + getUserGoal(),
        'Your First Class Free: A free 25-minute private class AND 7-day trial of unlimited group classes',
        'Proven Curriculum: Access to our complete learning system trusted by thousands of students'
      ]
    }
  };

  const currentPlan = planDetails[state.recommendedPlan as keyof typeof planDetails];

  if (!currentPlan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-spanish-cream">
      {/* Logo */}
      <div className="pt-8 text-center">
        <img 
          src="https://lwfiles.mycourse.app/6409eb5798e53550d7acd5f1-public/1bfa7bb23c37499f0d5908f0a004c50e.png" 
          alt="SpanishVIP Logo"
          className="h-12 mx-auto mb-4"
        />
      </div>

      {/* Hero Section */}
      <div className="pt-4 pb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src="https://spanishvip.com/wp-content/uploads/2025/04/private-tutoring.jpg" 
                alt="Spanish Learning"
                className="w-full max-w-md mx-auto rounded-2xl card-shadow"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Okay, you're ready to learn Spanish for {getUserGoal()}! Here is your personalized plan.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {currentPlan?.benefit}
            </p>
            <button onClick={onStartTrial} className="btn-primary text-xl">
              Start My Free Trial Now →
            </button>
          </div>
        </div>
      </div>

      {/* Social Proof Strip */}
      <div className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-spanish-orange">10,000+</div>
              <div className="text-sm text-gray-600">students now speaking Spanish with confidence</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-spanish-teal">🔥 152</div>
              <div className="text-sm text-gray-600">people started a free trial this week</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">⏰ 10:00</div>
              <div className="text-sm text-gray-600">Your special offer expires in minutes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Plan Includes */}
      {showDetails && (
        <div className="py-12 animate-fade-in">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Your Plan Includes:</h2>
            <div className="bg-white rounded-2xl p-8 card-shadow">
              <ul className="space-y-6">
                {currentPlan?.included.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <span className="text-spanish-teal font-bold text-xl">✓</span>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Guarantee Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">The SpanishVIP "Perfect Match" Guarantee</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are confident we can find the right teacher for you. If you aren't 100% satisfied with your trial class, 
            we will find you a new teacher or refund your session. Your progress is our mission.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <button onClick={onStartTrial} className="btn-primary text-xl mb-4">
            Start My Free Trial Now →
          </button>
          <p className="text-sm text-gray-500">
            After your 7-day trial, your plan renews at $XX/month. Cancel anytime, hassle-free, from your account settings. 
            <a href="#" className="text-spanish-orange hover:underline ml-1">See Subscription Terms.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationLanding;
