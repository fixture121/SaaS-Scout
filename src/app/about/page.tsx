'use client';

import React from 'react';
import { Star, Target, Scale, Users } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            About SaaS Scout
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
            Discover and evaluate new SaaS tools with confidence
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gradient">Our Mission</h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              At SaaS Scout, we're dedicated to helping you discover and evaluate the best SaaS tools for your needs. Our team of experts carefully curates and reviews each tool, providing you with detailed insights to make informed decisions.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gradient">Our Review Process</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              We evaluate each tool across six key categories:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
              <li>Design - User interface and experience</li>
              <li>Value - Pricing and ROI</li>
              <li>Features - Functionality and capabilities</li>
              <li>Originality - Innovation and uniqueness</li>
              <li>Clarity - Documentation and support</li>
              <li>Team - Company background and reputation</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gradient">Contact Us</h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Have a question or suggestion? We'd love to hear from you! Reach out to us at{' '}
              <a href="mailto:contact@saas-scout.com" className="text-pink-500 hover:text-pink-600">
                contact@saas-scout.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 