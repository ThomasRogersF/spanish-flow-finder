import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Save, X } from 'lucide-react';
import { Question, PLANS } from '../types/questionnaire';

const AdminDashboard: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    questions: true,
    logic: false,
    webhook: false,
    results: false
  });

  const [webhookUrl, setWebhookUrl] = useState('https://hook.us2.make.com/pt6126oh9vfke4t7cw6hoq54wh5iafv1');
  const [isEditingWebhook, setIsEditingWebhook] = useState(false);

  // Mock data for demonstration
  const questions: Question[] = [
    {
      id: 'q1',
      title: "Great! Who are the Spanish learners?",
      subtitle: 'This helps us direct you to the right place.',
      options: [
        { id: 'adult', text: 'For myself (or another adult)', icon: '👩‍🎓' },
        { id: 'child', text: 'For my child', icon: '👶' },
        { id: 'family', text: 'For my family', icon: '👨‍👩‍👧‍👦' },
        { id: 'company', text: 'For my company or team', icon: '🏢' }
      ]
    },
    {
      id: 'q2',
      title: 'How do you prefer to learn?',
      subtitle: 'Q2_PLACEHOLDER',
      options: [
        { id: 'flexible', text: 'Flexible schedule', icon: '⏰' },
        { id: 'structured', text: 'Structured classes', icon: '📚' },
        { id: 'interactive', text: 'Interactive exercises', icon: '🎮' },
        { id: 'conversation', text: 'Conversation practice', icon: '💬' }
      ]
    }
  ];

  const logicRules = [
    {
      condition: 'q4a = "A personal coach who adapts to my pace and learning style."',
      result: PLANS.PRIVATE
    },
    {
      condition: 'q4a = "A supportive classroom where I can practice with other students."',
      result: PLANS.GROUP
    },
    {
      condition: 'q4a = "A combination of private coaching and group conversation practice."',
      result: PLANS.FLUENT_BUNDLE
    },
    {
      condition: 'q1 = "For my child"',
      result: PLANS.KIDS
    },
    {
      condition: 'q1 = "For my family"',
      result: PLANS.FAMILY
    },
    {
      condition: 'q1 = "For my company or team"',
      result: PLANS.BUSINESS
    }
  ];

  const mockResults = [
    {
      id: 1,
      timestamp: '2024-01-15 10:30:00',
      name: 'John Doe',
      email: 'john@example.com',
      answers: { q1: 'For myself (or another adult)', q4a: 'A personal coach who adapts to my pace and learning style.' },
      recommendation: PLANS.PRIVATE
    },
    {
      id: 2,
      timestamp: '2024-01-15 09:15:00',
      name: 'Jane Smith',
      email: 'jane@example.com',
      answers: { q1: 'For myself (or another adult)', q4a: 'A supportive classroom where I can practice with other students.' },
      recommendation: PLANS.GROUP
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleWebhookSave = () => {
    setIsEditingWebhook(false);
    console.log('Webhook URL updated:', webhookUrl);
  };

  return (
    <div className="min-h-screen bg-spanish-cream p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Spanish learning funnel</p>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-2xl card-shadow mb-6">
          <button
            onClick={() => toggleSection('questions')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900">Questions Management</h2>
            {expandedSections.questions ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSections.questions && (
            <div className="px-6 pb-6">
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">Question {index + 1}</h3>
                      <button className="text-spanish-orange hover:text-orange-600">
                        <Edit2 size={16} />
                      </button>
                    </div>
                    <p className="text-gray-700 mb-2">{question.title}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {question.options.map((option) => (
                        <div key={option.id} className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{option.icon}</span>
                          <span>{option.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Logic Rules Section */}
        <div className="bg-white rounded-2xl card-shadow mb-6">
          <button
            onClick={() => toggleSection('logic')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900">Conditional Logic</h2>
            {expandedSections.logic ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSections.logic && (
            <div className="px-6 pb-6">
              <div className="space-y-3">
                {logicRules.map((rule, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Rule {index + 1}</span>
                      <button className="text-spanish-orange hover:text-orange-600">
                        <Edit2 size={16} />
                      </button>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-700 mb-1">
                        <strong>IF:</strong> {rule.condition}
                      </p>
                      <p className="text-gray-700">
                        <strong>THEN:</strong> Recommend {rule.result}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Webhook Configuration */}
        <div className="bg-white rounded-2xl card-shadow mb-6">
          <button
            onClick={() => toggleSection('webhook')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900">Webhook Configuration</h2>
            {expandedSections.webhook ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSections.webhook && (
            <div className="px-6 pb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook URL
                  </label>
                  <div className="flex items-center gap-2">
                    {isEditingWebhook ? (
                      <>
                        <input
                          type="url"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-spanish-teal focus:ring-1 focus:ring-spanish-teal"
                        />
                        <button
                          onClick={handleWebhookSave}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <Save size={20} />
                        </button>
                        <button
                          onClick={() => setIsEditingWebhook(false)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <code className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-sm">
                          {webhookUrl}
                        </code>
                        <button
                          onClick={() => setIsEditingWebhook(true)}
                          className="p-2 text-spanish-orange hover:bg-orange-50 rounded-lg"
                        >
                          <Edit2 size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Webhook will be triggered when users reach the recommendation page.</p>
                  <p>Payload includes: user data, answers, and recommendation.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl card-shadow">
          <button
            onClick={() => toggleSection('results')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900">Recent Results</h2>
            {expandedSections.results ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSections.results && (
            <div className="px-6 pb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2">Timestamp</th>
                      <th className="text-left py-3 px-2">Name</th>
                      <th className="text-left py-3 px-2">Email</th>
                      <th className="text-left py-3 px-2">Recommendation</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockResults.map((result) => (
                      <tr key={result.id} className="border-b border-gray-100">
                        <td className="py-3 px-2">{result.timestamp}</td>
                        <td className="py-3 px-2">{result.name}</td>
                        <td className="py-3 px-2">{result.email}</td>
                        <td className="py-3 px-2">
                          <span className="bg-spanish-teal text-white px-2 py-1 rounded-full text-xs">
                            {result.recommendation}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button className="text-spanish-orange hover:text-orange-600 text-xs">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
