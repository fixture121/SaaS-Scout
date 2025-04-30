'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product, ProductCategory } from '@/types';
import transformedProducts from '@/data/transformed-products.json';

const categories: ProductCategory[] = [
  'Design',
  'Productivity',
  'Marketing',
  'AI',
  'Developer Tools',
  'Finance',
  'Customer Support',
  'Others',
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-32">
        <h1 className="text-6xl font-bold text-center mb-8">
          <span className="text-gradient">Amazing</span> SaaS Tools
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Find the perfect software solution for your needs
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for SaaS tools..."
            className="w-full px-6 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
          />
          <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>
      </div>
    </main>
  );
} 