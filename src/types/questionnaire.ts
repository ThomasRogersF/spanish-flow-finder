
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
  PRIVATE: 'Private Classes',
  GROUP: 'Group Classes', 
  ACADEMY: 'Academy',
  FAMILY: 'Family Classes'
} as const;
