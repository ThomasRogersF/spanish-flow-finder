
export interface QuestionnaireState {
  currentStep: number;
  answers: Record<string, string>;
  userData: {
    name: string;
    email: string;
    phone: string;
    agreedToTerms: boolean;
  };
  recommendedPlan: string;
  userPath: 'adult' | 'child' | 'family' | 'company' | '';
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  options: Array<{
    id: string;
    text: string;
    icon?: string;
  }>;
}

export const PLANS = {
  PRIVATE: 'Private Tutoring Program',
  GROUP: 'Unlimited Group Classes', 
  FLUENT_BUNDLE: 'Fluent Bundle',
  KIDS: 'Spanish for Kids Program',
  FAMILY: 'Family Classes',
  BUSINESS: 'Corporate Spanish Training'
} as const;
