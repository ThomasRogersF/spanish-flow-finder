
import React, { useEffect, useState } from 'react';
import { QuestionnaireState } from '../types/questionnaire';

interface RecommendationLandingProps {
  state: QuestionnaireState;
  onStartTrial: () => void;
}

const RecommendationLanding: React.FC<RecommendationLandingProps> = ({ state, onStartTrial }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowDetails(true), 500);
  }, []);

  // Adult learner content
  const getAdultContent = () => {
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
        included: [
          'A Personalized Learning Plan: A custom plan designed by a native-speaking teacher to help you achieve your goal of ' + getUserGoal(),
          'Your First Class Free: A free 25-minute private class AND 7-day trial of unlimited group classes',
          'Proven Curriculum: Access to our complete learning system trusted by thousands of students'
        ]
      }
    };

    return {
      headline: `Okay, you're ready to learn Spanish for ${getUserGoal()}! Here is your personalized plan.`,
      plan: planDetails[state.recommendedPlan as keyof typeof planDetails],
      cta: 'Start My Free Trial Now →'
    };
  };

  // Parent content
  const getParentContent = () => {
    const childAge = state.answers.q2b || 'your child';
    const childPersonality = state.answers.q3b;
    
    let dynamicBenefit = 'Our Spanish for Kids program is designed specifically for your child\'s needs.';
    
    if (childPersonality === 'A bit shy and would thrive with one-on-one encouragement.') {
      dynamicBenefit = 'Our patient, one-on-one tutors are experts at building confidence in a safe and encouraging space.';
    } else if (childPersonality === 'Social and energetic – loves learning with others!') {
      dynamicBenefit = 'They\'ll love the energy and interaction of our small group classes, where they can make friends while learning.';
    } else if (childPersonality === 'Creative and loves fun, interactive activities and games.') {
      dynamicBenefit = 'Our curriculum is packed with the games, songs, and interactive activities that will capture their imagination and make learning feel like play.';
    }

    return {
      headline: `We've found the perfect class for your ${childAge}! Here is their path to Spanish fun.`,
      benefit: dynamicBenefit,
      included: [
        'A Free Age-Appropriate Trial Class: See our teachers in action with a free 25-minute class designed for your child\'s age group.',
        'A Post-Class Consultation: Chat with the teacher after the class to discuss your child\'s learning plan.',
        'Fun, Game-Based Learning: Our methodology uses interactive games and activities to keep your child engaged and excited to learn.'
      ],
      cta: 'Book Your Child\'s Free Trial Class'
    };
  };

  // Family content
  const getFamilyContent = () => {
    const familyGoal = state.answers.q3c;
    let goalText = 'learn Spanish together';
    
    if (familyGoal === 'To prepare for an upcoming family trip.') {
      goalText = 'prepare for your upcoming family trip';
    } else if (familyGoal === 'To connect with our family heritage.') {
      goalText = 'connect with your family heritage';
    } else if (familyGoal === 'To find a fun, new educational activity to do together.') {
      goalText = 'enjoy a fun, educational activity together';
    } else if (familyGoal === 'To support our children\'s Spanish studies in school.') {
      goalText = 'support your children\'s Spanish studies';
    }

    const familyLevel = state.answers.q4c || 'mixed levels';

    return {
      headline: 'Learning together is a fantastic goal! Here is your family\'s personalized plan.',
      benefit: `Our Family Classes are the perfect way to ${goalText}!`,
      included: [
        'A Free Family Consultation: A free 25-minute call with one of our family learning specialists to design your custom curriculum.',
        `A Custom-Built Curriculum: We'll create a lesson plan that is fun and engaging for all age groups and accommodates the ${familyLevel} in your family.`,
        'A Dedicated Family Teacher: You\'ll be matched with a teacher who specializes in teaching multi-age groups.'
      ],
      cta: 'Book a Free Family Consultation'
    };
  };

  // Business content
  const getBusinessContent = () => {
    return {
      headline: 'Corporate Spanish Training That Delivers Results',
      benefit: 'Empower your team with the language skills needed to succeed in today\'s global market. At SpanishVIP, we offer customized training programs tailored to your industry\'s specific needs, from one-on-one executive coaching to group classes for your entire team.',
      included: [
        'Custom curriculum for your industry',
        'Flexible scheduling for busy professionals',
        'Progress tracking and reporting',
        'Taught by certified, native-speaking teachers'
      ],
      cta: 'Book a Free Business Demo'
    };
  };

  const getContent = () => {
    switch (state.userPath) {
      case 'adult':
        return getAdultContent();
      case 'child':
        return getParentContent();
      case 'family':
        return getFamilyContent();
      case 'company':
        return getBusinessContent();
      default:
        return getAdultContent();
    }
  };

  const content = getContent();

  // Helper function to get benefit text
  const getBenefitText = () => {
    if (state.userPath === 'adult' && 'plan' in content) {
      return content.plan.benefit;
    }
    if ('benefit' in content) {
      return content.benefit;
    }
    return '';
  };

  // Helper function to get included items
  const getIncludedItems = () => {
    if (state.userPath === 'adult' && 'plan' in content) {
      return content.plan.included;
    }
    if ('included' in content) {
      return content.included;
    }
    return [];
  };

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
              {content.headline}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {getBenefitText()}
            </p>
            <button onClick={onStartTrial} className="btn-primary text-xl">
              {content.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Social Proof Strip - Show for all except business */}
      {state.userPath !== 'company' && (
        <div className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-spanish-orange">10,000+</div>
                <div className="text-sm text-gray-600">
                  {state.userPath === 'child' ? 'kids now speaking Spanish with confidence' : 
                   state.userPath === 'family' ? 'families learning Spanish together' :
                   'students now speaking Spanish with confidence'}
                </div>
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
      )}

      {/* Your Plan Includes */}
      {showDetails && (
        <div className="py-12 animate-fade-in">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              {state.userPath === 'child' ? 'Your Trial Includes:' :
               state.userPath === 'family' ? 'Your Plan Includes:' :
               state.userPath === 'company' ? 'What We Offer:' :
               'Your Plan Includes:'}
            </h2>
            <div className="bg-white rounded-2xl p-8 card-shadow">
              <ul className="space-y-6">
                {getIncludedItems()?.map((feature, index) => (
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
          {state.userPath === 'family' ? (
            <>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The SpanishVIP Family Promise</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We guarantee a learning experience that your whole family will enjoy. If you're not happy with your consultation or first class, we'll work with you to make it right.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The SpanishVIP "Perfect Match" Guarantee</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are confident we can find the right teacher for you. If you aren't 100% satisfied with your trial class, 
                we will find you a new teacher or refund your session. Your progress is our mission.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <button onClick={onStartTrial} className="btn-primary text-xl mb-4">
            {content.cta}
          </button>
          {state.userPath !== 'company' && (
            <p className="text-sm text-gray-500">
              After your 7-day trial, your plan renews at $XX/month. Cancel anytime, hassle-free, from your account settings. 
              <a href="#" className="text-spanish-orange hover:underline ml-1">See Subscription Terms.</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationLanding;
