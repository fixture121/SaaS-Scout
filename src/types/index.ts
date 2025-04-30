export type ProductCategory = 
  | 'Design'
  | 'Productivity'
  | 'Marketing'
  | 'AI'
  | 'Developer Tools'
  | 'Finance'
  | 'Customer Support'
  | 'Others';

export type PricingModel = 'Free' | 'Freemium' | 'Paid';

export type Verdict = 
  | 'Hidden Gem'
  | 'Might Blow Up'
  | 'Overhyped'
  | 'Worth Watching'
  | 'Cash Grab';

export type QuizRole = 'developer' | 'designer' | 'manager' | 'marketer' | 'founder';

export type BudgetRange = 'free' | 'low' | 'medium' | 'high';

export type Platform = 'web' | 'desktop' | 'mobile' | 'api';

export type ToolDuration = 'short' | 'medium' | 'long';

export interface ProductScores {
  design: number;
  value: number;
  features: number;
  originality: number;
  clarity: number;
  team: number;
}

export interface Product {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  website: string;
  image: string;
  launchDate: string;
  pricing: string;
  source: string;
  category: string;
  tags: string[];
  overallScore: number;
  scores: {
    design: number;
    value: number;
    features: number;
    originality: number;
    clarity: number;
    team: number;
  };
  pros: string[];
  cons: string[];
  verdict: string;
  userCount: number;
  productHuntRating: number;
  productHuntVotes: number;
  productHuntComments: number;
  pricingTier: 'Free' | 'Freemium' | 'Paid' | 'Enterprise';
  integrations: string[];
  targetAudience: ('Founders' | 'IT Managers' | 'Developers')[];
  useCases: string[];
}

export type QuizAnswers = {
  roles: QuizRole[];
  budget: BudgetRange;
  platforms: Platform[];
  duration: ToolDuration;
};

export interface CompatibilityWeights {
  role: number;
  problem: number;
  budget: number;
  platforms: number;
  duration: number;
}

export interface ProductsData {
  products: Product[];
} 