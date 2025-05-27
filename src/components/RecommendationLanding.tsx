
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

  const planDetails = {
    'Private Classes': {
      icon: '👨‍🏫',
      benefit: 'Get personalized 1-on-1 attention with flexible scheduling that fits your life',
      why: [
        'You value personalized attention and feedback',
        'You need a flexible schedule that works with your busy life',
        'You want to progress at your own pace'
      ],
      howItWorks: 'Weekly 60-minute sessions with certified native Spanish teachers via video call',
      included: ['Unlimited lesson scheduling', 'Personal progress tracking', 'Custom learning materials', 'Homework assignments']
    },
    'Group Classes': {
      icon: '👥',
      benefit: 'Learn Spanish in a fun, social environment while keeping costs affordable',
      why: [
        'You enjoy learning with others and staying motivated',
        'You want an affordable option without sacrificing quality',
        'You thrive in group discussions and activities'
      ],
      howItWorks: 'Small group classes (max 6 students) with structured curriculum and regular practice',
      included: ['Unlimited group classes', 'Weekly conversation practice', 'Community access', 'Digital workbook']
    },
    'Academy': {
      icon: '📱',
      benefit: 'Master Spanish at your own pace with our comprehensive self-study platform',
      why: [
        'You prefer learning at your own pace and schedule',
        'You want access to comprehensive learning materials',
        'You\'re self-motivated and disciplined'
      ],
      howItWorks: 'Interactive lessons, quizzes, and practice exercises available 24/7 on any device',
      included: ['500+ interactive lessons', 'Progress tracking', 'Mobile & web access', 'Certificate of completion']
    },
    'Family Classes': {
      icon: '👨‍👩‍👧‍👦',
      benefit: 'Learn Spanish together as a family with age-appropriate content for everyone',
      why: [
        'You want to learn Spanish with your children',
        'You believe in family learning experiences',
        'You want age-appropriate content for different levels'
      ],
      howItWorks: 'Family-friendly lessons designed for parents and children to learn together',
      included: ['Age-appropriate content', 'Family activity guides', 'Progress tracking for each member', 'Flexible scheduling']
    }
  };

  const currentPlan = planDetails[state.recommendedPlan as keyof typeof planDetails];

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
              🎉 You're a perfect fit for {state.recommendedPlan}!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {currentPlan?.benefit}
            </p>
            <button onClick={onStartTrial} className="btn-primary text-xl">
              Start My {state.recommendedPlan} Trial →
            </button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      {showDetails && (
        <div className="py-12 animate-fade-in">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Why We Chose This */}
              <div className="bg-white rounded-2xl p-8 card-shadow">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{currentPlan?.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">Why we chose this for you</h3>
                </div>
                <ul className="space-y-3">
                  {currentPlan?.why.map((reason, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-spanish-orange font-bold">✓</span>
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How It Works */}
              <div className="bg-white rounded-2xl p-8 card-shadow">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-2xl font-bold text-gray-900">How it works</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {currentPlan?.howItWorks}
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-2xl p-8 card-shadow">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🎁</div>
                  <h3 className="text-2xl font-bold text-gray-900">What's included</h3>
                </div>
                <ul className="space-y-3">
                  {currentPlan?.included.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-spanish-teal font-bold">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Proof Strip */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted by thousands of Spanish learners</h3>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-lg font-semibold">⭐⭐⭐⭐⭐ 4.9/5</div>
            <div className="text-gray-500">|</div>
            <div className="text-lg font-semibold">50,000+ Students</div>
            <div className="text-gray-500">|</div>
            <div className="text-lg font-semibold">15+ Countries</div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to start your Spanish journey?</h3>
          <p className="text-lg text-gray-600 mb-8">Join thousands of successful students and start speaking Spanish with confidence</p>
          <button onClick={onStartTrial} className="btn-primary text-xl">
            Start My Free Trial Today →
          </button>
          <p className="text-sm text-gray-500 mt-4">✓ No credit card required ✓ Cancel anytime ✓ 7-day free trial</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationLanding;
