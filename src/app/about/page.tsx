'use client';

import React from 'react';
import { Star, Target, Scale, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pt-24 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            About SaaS Scout
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Helping you discover and evaluate the best new SaaS tools before everyone else.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <Star className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                Our Mission
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p className="flex-auto">
                  We're on a mission to help you discover and evaluate new SaaS tools before they become mainstream. Our curated approach ensures you only see the most promising and innovative solutions.
                </p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <Target className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                Our Process
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p className="flex-auto">
                  We manually curate and evaluate each tool using a consistent framework. Our team of experts analyzes design, value, features, originality, clarity, and team quality to provide comprehensive insights.
                </p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <Scale className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
                Scoring Philosophy
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p className="flex-auto">
                  Each tool is scored out of 100 points across six categories. Our verdicts (Hidden Gem, Might Blow Up, etc.) provide quick insights into a tool's potential and current state.
                </p>
              </dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Scoring Categories
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Design (0-20)</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Evaluates the user interface, user experience, and overall visual appeal of the product.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Value (0-20)</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Assesses the pricing, ROI, and overall value proposition of the tool.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Features (0-20)</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Evaluates the functionality, completeness, and innovation of the features offered.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Originality (0-20)</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Measures how unique and innovative the solution is compared to existing alternatives.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Clarity (0-10)</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Evaluates how well the product communicates its purpose and value proposition.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Team (0-10)</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Assesses the experience, track record, and credibility of the team behind the product.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Contact Us
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Have a question or suggestion? We'd love to hear from you. Reach out to us at{' '}
              <a
                href="mailto:contact@saasscout.com"
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                contact@saasscout.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 