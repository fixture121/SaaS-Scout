'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizRole, BudgetRange, Platform, ToolDuration, QuizAnswers } from '@/types';
import { saveQuizAnswers } from '@/lib/compatibility';

const roles: QuizRole[] = [
  'founder',
  'designer',
  'developer',
  'marketer',
  'manager'
];

const budgets: BudgetRange[] = [
  'free',
  'low',
  'medium',
  'high'
];

const platforms: Platform[] = [
  'web',
  'desktop',
  'mobile',
  'api'
];

const durations: ToolDuration[] = [
  'short',
  'medium',
  'long'
];

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    roles: [],
    budget: 'free',
    platforms: [],
    duration: 'short'
  });
  const router = useRouter();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      saveQuizAnswers(answers);
      router.push('/browse');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRoleSelect = (role: QuizRole) => {
    setAnswers(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const handleBudgetSelect = (budget: BudgetRange) => {
    setAnswers(prev => ({ ...prev, budget }));
  };

  const handlePlatformSelect = (platform: Platform) => {
    setAnswers(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleDurationSelect = (duration: ToolDuration) => {
    setAnswers(prev => ({ ...prev, duration }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect SaaS Tool</h1>
          <p className="mt-2 text-lg text-gray-600">Answer a few questions to get personalized recommendations.</p>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900">What's your role?</h2>
              <p className="mt-2 text-gray-600">Select all that apply</p>
              <div className="mt-4 space-y-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      answers.roles.includes(role)
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900">What's your budget?</h2>
              <div className="mt-4 space-y-2">
                {budgets.map((budget) => (
                  <button
                    key={budget}
                    onClick={() => handleBudgetSelect(budget)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      answers.budget === budget
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {budget.charAt(0).toUpperCase() + budget.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Which platforms do you need?</h2>
              <p className="mt-2 text-gray-600">Select all that apply</p>
              <div className="mt-4 space-y-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => handlePlatformSelect(platform)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      answers.platforms.includes(platform)
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900">How long do you need this tool?</h2>
              <div className="mt-4 space-y-2">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleDurationSelect(duration)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      answers.duration === duration
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {duration.charAt(0).toUpperCase() + duration.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-4 py-2 rounded-md ${
                step === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {step === 4 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 